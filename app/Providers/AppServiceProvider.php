<?php

namespace App\Providers;

use App\Models\Module;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
            Inertia::share([
            'auth' => function () {
                return [
                    'user' => Auth::user() ? [
                        'id' => Auth::user()->id,
                        'name' => Auth::user()->name,
                        'email' => Auth::user()->email,
                        'pin' => Auth::user()->pin,
                        'last_activity' => Auth::user()->last_activity,
                    ] : null,
                ];
            },

            'modules_acc' => fn () => 
            Module::with('menus')
                ->orderBy('name')
                ->whereHas('roles', function ($query) {
                    $query->whereIn('name', Auth::user() ? Auth::user()->roles->pluck('name') : []);
                })
                ->get(),
        ]);
    }
}
