<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class MenuModul extends Model
{
    protected $fillable = [
        'module_id',
        'menu',
        'url',
        'menu_description',
    ];

    public function module()
    {
        return $this->belongsTo(Module::class, 'module_id');
    }
}
