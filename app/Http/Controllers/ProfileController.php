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
                'password' => 'required|string',
            ]);
            
            // Verify password
            if (!Hash::check($request->password, Auth::user()->password)) {
                return redirect()->back()->with('error', 'Password is incorrect.');
            }
            // Update PIN
            $user = Auth::user();
            $user->pin = Hash::make($request->pin);
            $user->save();
        return redirect()->back()->with('success', 'PIN updated successfully.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'PIN Update Failed: ' . $e->getMessage());
        }   
    }

    public function updatePassword(Request $request)
    {
        try {
            $request->validate([
                'new_password' => 'required|string|min:8|confirmed',
                'current_password' => 'required|string',
            ]);

            // Verify current password
            if (!Hash::check($request->current_password, Auth::user()->password)) {
                return redirect()->back()->with('error', 'Current password is incorrect.');
            }

            // Update Password
            $user = Auth::user();
            $user->password = Hash::make($request->new_password);
            $user->save();
            return redirect()->back()->with('success', 'Password updated successfully.');

        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Password Update Failed: ' . $e->getMessage());
        }
    }

    public function updateLockScreen(Request $request)
    {
        try {
            $request->validate([
                'lock_screen_enabled' => 'required|boolean',
            ]);

            $user = Auth::user();
            $user->lock_screen_enabled = $request->lock_screen_enabled;
            $user->save();

            if ($request->lock_screen_enabled) {
                $user->last_activity = now();
                $user->save();
            } else {
                $user->last_activity = null; // Hapus timestamp jika fitur dinonaktifkan
                $user->save();
            }
            return redirect()->back()->with('success', 'Lock screen setting updated.');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Failed to update setting: ' . $e->getMessage());
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
