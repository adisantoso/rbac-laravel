<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Module extends Model
{
    protected $fillable = ['name', 'icon', 'style','desc'];

    public function roles()
    {
        return $this->belongsToMany(Role::class, 'module_role');
    }
    public function menus()
    {
        return $this->hasMany(MenuModul::class);
    }
}
