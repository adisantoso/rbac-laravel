<?php

namespace App\Http\Controllers;

use App\Models\Todo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class TodoController extends Controller
{
    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'text' => 'required|string|max:255',
        ]);

        $request->user()->todos()->create([
            'text' => $request->text,
            'done' => false,
        ]);

        return Redirect::route('home')->with('success', 'Tugas berhasil ditambahkan.');
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request,  $id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            abort(404, 'Todo tidak ditemukan.');
        }

        // Pastikan user hanya bisa mengubah todo miliknya sendiri
        if ($request->user()->id !== $todo->user_id) {
            abort(403, 'Anda tidak memiliki akses untuk mengubah todo ini.');
        }

        $todo->update([
            'done' => !$todo->done,
        ]);

        return Redirect::route('home')->with('success', 'Tugas berhasil diperbarui.');
    }

    
    public function destroy(Request $request,$id)
    {
        $todo = Todo::find($id);

        if (!$todo) {
            abort(404, 'Todo tidak ditemukan.');
        }

        // Pastikan user hanya bisa menghapus todo miliknya sendiri
        if ($request->user()->id !== $todo->user_id) {
            abort(403, 'Anda tidak memiliki akses untuk menghapus todo ini.');
        }

        $todo->delete();

        return Redirect::route('home')->with('success', 'Tugas berhasil dihapus.');
    }
}
