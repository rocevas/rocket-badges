import React from "react";
import {Link, router} from '@inertiajs/react'
import useRoute from '@/Hooks/useRoute';
import useTypedPage from '@/Hooks/useTypedPage';
import {
    EmptyState,
    LegacyCard,
    Page,
    Text,
    IndexTable,
    useBreakpoints,
    Button,
    Card,
    BlockStack
} from "@shopify/polaris";

interface Props {
    bundles:object;
}
export default function Dashboard({
    bundles,
    }: Props) {
    const page = useTypedPage();
    const route = useRoute();

    const goTo = (routeName, params = {}) => {
        router.visit(route(routeName, params));
    };

    // const rowMarkup = bundles.map((bundle) => (
    //     <IndexTable.Row id={bundle.uid} key={bundle.uid} onClick={() => goTo('bundle.show', { uid: bundle.uid })}>
    //         <IndexTable.Cell>{bundle.name}</IndexTable.Cell>
    //         <IndexTable.Cell>{bundle.status}</IndexTable.Cell>
    //         <IndexTable.Cell>
    //             <Text alignment="end">
    //                 <Button>Edit</Button>
    //             </Text>
    //         </IndexTable.Cell>
    //     </IndexTable.Row>
    // ));

    return (
        <Page
            title="Your Badges 2"
            // secondaryActions={[{ content: "Discount", url: route('discount') }]}
            primaryAction={{ content: "Home", url: route('home') }}
            // primaryAction={{ content: "Save data", url: route('metafield') }}
        >
            <BlockStack gap="500">

                <LegacyCard sectioned>
                    <EmptyState
                        heading="Manage your inventory transfers"
                        // action={{ content: "Create bundle", url: route('bundle.create') }}
                        image="https://cdn.shopify.com/s/files/1/0262/4071/2726/files/emptystate-files.png"
                    >
                        <p>Track and receive your incoming inventory from suppliers.</p>
                        {page.props.auth.user?.name}
                    </EmptyState>
                </LegacyCard>


                {/*<Card padding="0">*/}
                {/*    <IndexTable*/}
                {/*        condensed={useBreakpoints().smDown}*/}
                {/*        resourceName={{ singular: 'bundle', plural: 'bundles' }}*/}
                {/*        itemCount={bundles.length}*/}
                {/*        headings={[*/}
                {/*            { title: 'Name' },*/}
                {/*            { title: 'Stats' },*/}
                {/*            { title: '' },*/}
                {/*        ]}*/}
                {/*        selectable={false}*/}
                {/*        // pagination={{*/}
                {/*        //     hasNext: true,*/}
                {/*        //     onNext: () => {},*/}
                {/*        // }}*/}
                {/*    >*/}
                {/*        {rowMarkup}*/}
                {/*    </IndexTable>*/}
                {/*</Card>*/}
            </BlockStack>
        </Page>
    );
};
