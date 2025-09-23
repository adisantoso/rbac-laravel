<?php

namespace App\Http\Controllers\RBAC;

use App\Models\MenuModul;
use App\Models\Module;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Http\Controllers\Controller;

class MenuModulController extends Controller
{
    // Tampilkan list MenuModul + data module untuk dropdown
    public function index()
    {
        $modules = Module::all();
        $menuModules = MenuModul::with('module')->get();
        return Inertia::render('RBAC/module', [
            'modules' => $modules,
            'menuModules' => $menuModules,
        ]);
    }

    // Simpan menu_modul baru
    public function store(Request $request)
    {
        try {
            $request->validate([
                'module_id' => 'required|exists:modules,id',
                'menu' => 'required|string|max:255',
                'url' => 'required|string|unique:menu_moduls,url',
                'description' => 'nullable|string|max:255',
            ]);

            MenuModul::create([
                'module_id' => $request->module_id,
                'menu' => $request->menu,
                'url' => $request->url,
                'description' => $request->description,
            ]);

            return redirect()->back()->with('success', 'Menu modul berhasil ditambahkan');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }

    // Update menu_modul
    public function update(Request $request, $id)
    {
        $request->validate([
            'module_id' => 'required|exists:modules,id',
            'menu' => 'required|string|max:255',
            'url' => 'nullable|string|max:255',
            'icon' => 'nullable|string|max:255',
        ]);

        $menu_modul = MenuModul::findOrFail($id);
        $menu_modul->update([
            'module_id' => $request->module_id,
            'menu' => $request->menu,
            'url' => $request->url,
            'icon' => $request->icon,
        ]);

        return redirect()->back()->with('success', 'Menu modul berhasil diperbarui');
    }

    // Hapus menu_modul
    public function destroy($id)
    {
        try {
            $menu_modul = MenuModul::findOrFail($id);
            $menu_modul->delete();
            return redirect()->back()->with('success', 'Menu modul berhasil dihapus');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', 'Terjadi kesalahan: ' . $e->getMessage());
        }
    }
}
