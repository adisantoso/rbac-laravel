<?php

namespace App\Http\Controllers\RBAC;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserRoleController extends Controller
{
    public function index()
    {
        $user = User::with('roles')->get();
        $roles = Role::all();
        return Inertia::render('RBAC/user', [
            'users' => $user,
            'roles' => $roles,
        ]);
    }
    

    public function update(Request $request, $id)
    {
        try {
        
            $request->validate([
            'role_id' => 'required|integer|exists:roles,id'
            ]);

        $user = User::findOrFail($id);

        $user->roles()->sync([$request->role_id]);

        return redirect()->back()->with('success', 'Role Assignment Successful');
        }
        catch (\Exception $e) {
        return redirect()->back()->with('error', 'Role Assignment Failed: ' . $e->getMessage());
        }

    }
}