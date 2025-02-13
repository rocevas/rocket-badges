@extends('shopify-app::layouts.default')

@section('styles')
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    @viteReactRefresh
    @vite('resources/js/app.tsx')
    <ui-nav-menu>
        <a href="/" rel="home">Home</a>
        <a href="/analytics">Analytics</a>
    </ui-nav-menu>
    @routes
    @inertiaHead
@endsection

@section('content')
    @inertia
@endsection

@section('scripts')
    @parent
@endsection
