<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProfileController extends Controller
{
    public function show(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'success' => true,
            'message' => 'User profile retrieved successfully',
            'data' => [
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->roles->pluck('name'), // Assuming a user can have multiple roles
            ],
        ]);
    }
}
