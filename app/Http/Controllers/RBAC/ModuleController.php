<?php

namespace App\Http\Controllers\RBAC;

use App\Http\Controllers\Controller;
use App\Models\MenuModul;
use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ModuleController extends Controller
{
    public function index()
    {
        $modules = Module::with('menus')->get();
        $menuModules = MenuModul::with('module')->get();
        return Inertia::render('RBAC/module', [
            'modules' => $modules,
            'menuModules' => $menuModules,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:100',
            'style' => 'nullable|string|max:255',
            'desc' => 'nullable|string',
        ]);

        Module::create($request->only('name', 'icon', 'style', 'desc'));

        return redirect()->back()->with('success', 'Module berhasil ditambahkan');
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'icon' => 'nullable|string|max:100',
            'style' => 'nullable|string|max:255',
            'desc' => 'nullable|string',
        ]);
        $module = Module::findOrFail($id);
        $module->update($request->only('name', 'icon', 'style', 'desc'));

        return redirect()->back()->with('success', 'Module berhasil diperbarui');
    }

    public function destroy($id)
    {
        $module = Module::findOrFail($id);
        $module->delete();
        return redirect()->back()->with('success', 'Module berhasil dihapus');
    }
}
