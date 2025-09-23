<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ProfileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $user = User::with('roles')->find(Auth::id());
        //dd($user);
        return inertia('Profile', [
            'user' => $user
        ]);
    }

    /**
     * Update the specified pin in storage.
     */
    public function updatePin(Request $request)
    {
        //dd($request->all());
        try {
            $request->validate([
                'pin' => 'required|numeric|digits:6',
            ]);
                
            $user = Auth::user();
            $user->pin = Hash::make($request->pin);
            $user->save();
        return redirect()->back()->with('success', 'PIN updated successfully.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'PIN Update Failed: ' . $e->getMessage());
        }   
    }

        /**
     * Update the last activity timestamp.
     */
    public function unlock(Request $request)
    {
        $request->validate([
            'pin' => 'required|numeric|digits:6',
        ]);

        $user = Auth::user();

        if (Hash::check($request->pin, $user->pin)) {
            // PIN benar → reset last_activity
            $user->last_activity = null;
            $user->save();

            return back();
        }

        return back()->withErrors(['pin' => 'Incorrect PIN. Please try again.']);
    }

    public function updateActivity()
    {
        $user = Auth::user();
        $user->last_activity = now();
        $user->save();

        return back();
    }

}
