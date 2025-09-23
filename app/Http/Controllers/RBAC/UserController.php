<?php

namespace App\Http\Controllers\RBAC;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd($request->all());
        // Validate and create user
        try {
            $request['password'] = Hash::make('passdeff'); // Default password
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8',
            ]);
            User::create($validated);
            return redirect()->back()->with('success', 'User created successfully.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'User Creation Failed: ' . $e->getMessage());
        }
    }
 
}
