<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request): \Inertia\Response
    {
        return Inertia::render('Home');
    }

    public function home2(Request $request): \Inertia\Response
    {
        return Inertia::render('Home2');
    }
}
