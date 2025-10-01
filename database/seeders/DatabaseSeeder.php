<?php

namespace Database\Seeders;

use App\Models\MenuModul;
use App\Models\Module;
use App\Models\User;
use App\Models\Role;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // pastikan role admin ada
        $role = Role::firstOrCreate(
            ['name' => 'Admin'],
            ['created_at' => now(), 'updated_at' => now()]
        );

        // buat user admin
        $admin = User::firstOrCreate(
            ['email' => 'admin@mail.com'],
            [
                'name' => 'Administrator',
                'password' => Hash::make('sys@admin'),
            ]
        );

        // assign role ke user
        $admin->roles()->sync([$role->id]);

        // Buat Module RBAC Management
        $module = Module::firstOrCreate(
            ['name' => 'RBAC Management'],
            ['desc' => 'RBAC Management', 'created_at' => now(), 'updated_at' => now()]
        );

        // assign module ke role
        $role->modules()->sync([$module->id]);

        // Buat Menu Module
        $menus = [
            ['module_id' => $module->id, 'menu' => 'Role & Permission', 'url' => 'role'],
            ['module_id' => $module->id, 'menu' => 'Module Management', 'url' => 'module'],
            ['module_id' => $module->id, 'menu' => 'User Management', 'url' => 'user-role'],
        ];

        foreach ($menus as $menu) {
            MenuModul::firstOrCreate(
                ['module_id' => $menu['module_id'], 'menu' => $menu['menu']],
                ['url' => $menu['url'], 'created_at' => now(), 'updated_at' => now()]
            );
        }
    }
}
