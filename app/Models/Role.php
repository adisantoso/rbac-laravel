<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    protected $fillable = ['name', 'desc'];

    public function users()
    {
        return $this->belongsToMany(User::class);
    }

    public function modules()
    {
        return $this->belongsToMany(Module::class, 'module_role');
    }
    
    
}
