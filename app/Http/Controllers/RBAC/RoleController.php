<?php

namespace App\Http\Controllers\RBAC;

use App\Http\Controllers\Controller;
use App\Models\Module;
use App\Models\Role;
use Illuminate\Http\Request;
use Inertia\Inertia;

class RoleController extends Controller
{
    public function index()
    {
        $roles = Role::with('modules')->get();
        $modules = Module::with('menus')->get();
        return Inertia::render('RBAC/role', [
            'roles' => $roles,
            'modules' => $modules,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:roles,name',
            'desc' => 'required',
        ]);

        Role::create($request->only('name'));

        return redirect()->route('role.index')->with('success', 'Role created');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'desc' => 'required|string|max:255',
        ]);

        $role = Role::findOrFail($id);
        $role->update(['name' => $request->name, 'desc' => $request->desc]);

        return redirect()->route('role.index')->with('success', 'Role berhasil diperbarui!');
    }

    public function destroy($id)
    {
        $role = Role::findOrFail($id);
        $role->delete();

        return redirect()->route('role.index')->with('success', 'Role berhasil dihapus!');
    }

    public function addModule(Request $request, Role $role)
    {
        try {
            //dd($request->all());
            $request->validate([
                'role_id' => 'required|exists:roles,id',
                'module_id.*' => 'exists:modules,id', // setiap item valid
            ]);

            $role = Role::findOrFail($request->role_id);

            // Simpan relasi many-to-many
            $role->modules()->sync($request->module_id);
            return redirect()->back()->with('success', 'Module access berhasil ditambahkan.');
        } catch (\Exception $e) {
            return redirect()->back()->with(['error' =>  $e->getMessage()]);
        }
        
    }
}
