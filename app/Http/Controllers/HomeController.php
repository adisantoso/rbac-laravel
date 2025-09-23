<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        // Render the home page view
        return Inertia::render('Dashboard/Home');
    }
}
