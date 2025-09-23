<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class HasModule
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $module): Response
    {
        $user = $request->user();

        // contoh: asumsi user punya relasi modules atau field roles
        if (!$user || !$user->hasModule($module)) {
            // kalau tidak punya module, bisa abort atau redirect
            abort(403, 'Anda tidak memiliki akses ke modul ini.');
        }

        return $next($request);
    }
}
