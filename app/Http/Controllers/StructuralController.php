<?php

namespace App\Http\Controllers;

use App\Models\Structural;
use Illuminate\Http\Request;
use Inertia\Inertia;

class StructuralController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $structurals = Structural::all();
        return Inertia::render('Structural', [
            'structurals' => $structurals
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        Structural::create($request->all());
        return redirect()->back()->with('success', 'Structure created successfully.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);
        $structural = Structural::findOrFail($id);
        $structural->update($request->all());
        return redirect()->back()->with('success', 'Structure updated successfully.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $structural = Structural::findOrFail($id);
        $structural->delete();
        return redirect()->back()->with('success', 'Structure deleted successfully.');
    }
}
