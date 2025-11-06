<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class HomeController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        // Ambil todos milik user yang sedang login, urutkan dari yang terbaru.
        $todos = $user->todos()->latest()->get();

        return Inertia::render('Dashboard/Home', [
            'todos' => $todos,
        ]);
    }
}
