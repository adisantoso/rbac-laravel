<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function showLogin()
    {
        return Inertia::render('Auth/Login');
    }

    public function login(Request $request)
    {
        try {
            // Validasi input
            $credentials = $request->validate([
                'email' => ['required', 'email'],
                'password' => ['required'],
            ]);

            if (Auth::attempt($credentials)) {
            $request->session()->regenerate(); // keamanan session
            // untuk inertia
            return Inertia::location('/home'); 
        }
        } catch (\Exception $e) {
            return back()->withErrors(['message' => $e->getMessage()])->withInput();
        }

        // Kalau gagal
        return back()
            ->withErrors(['message' => 'Login Failed, Check your Credentials!'])
            ->withInput();
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Inertia::location('/');
    }
}
