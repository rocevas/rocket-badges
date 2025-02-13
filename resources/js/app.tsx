import './bootstrap';
import { RouteContext } from '@/Hooks/useRoute';
import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import translations from '@shopify/polaris/locales/en.json';
import { createInertiaApp, router } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import createApp, { AppConfigV2 } from '@shopify/app-bridge';
import { authenticatedFetch, getSessionToken } from '@shopify/app-bridge/utilities';
import { Redirect } from "@shopify/app-bridge/actions";

// App Bridge inicializacija
const host = new URLSearchParams(location.search).get('host')!;
const app = createApp({
    apiKey: import.meta.env.VITE_SHOPIFY_API_KEY,
    host,
    forceRedirect: true,
} as AppConfigV2);
if (!host) throw new Error('Missing host parameter');

// Globalus fetch handleris
function createShopifyFetch() {
    const fetch = authenticatedFetch(app);

    return async (input: RequestInfo, init?: RequestInit) => {
        const response = await fetch(input, init);

        // Reauthorization check
        if (response.headers.get('X-Shopify-API-Request-Failure-Reauthorize') === '1') {
            const authUrl = response.headers.get('X-Shopify-API-Request-Failure-Reauthorize-Url') || '/auth';
            Redirect.create(app).dispatch(Redirect.Action.REMOTE, authUrl);
        }

        return response;
    };
}

// Linkų apdorojimas
function enableInertiaForLinks() {
    document.addEventListener('click', async (e) => {
        const link = (e.target as Element).closest('a');
        if (!link) return;

        if (link.host === window.location.host && !link.dataset.noInertia) {
            e.preventDefault();
            const token = await getSessionToken(app);
            router.visit(link.href, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
        }
    });
}

// Pagrindinis app render
createInertiaApp({
    resolve: (name) =>
        resolvePageComponent(`./Pages/${name}.tsx`, import.meta.glob('./Pages/**/*.tsx')),
    setup({ el, App, props }) {
        createRoot(el).render(
            <RouteContext.Provider value={(window as any).route}>
                <AppProvider
                    i18n={translations}
                    linkComponent={({ children, url, ...rest }) => (
                        <a
                            href={url}
                            onClick={(e) => {
                                e.preventDefault();
                                router.visit(url, {
                                    headers: {
                                        Authorization: `Bearer ${getSessionToken(app)}`
                                    }
                                });
                            }}
                            {...rest}
                        >
                            {children}
                        </a>
                    )}
                >
                    <App {...props} />
                </AppProvider>
            </RouteContext.Provider>
        );
    },
    progress: false,
});

// Inicijuojame
enableInertiaForLinks();
(window as any).shopifyFetch = createShopifyFetch();
