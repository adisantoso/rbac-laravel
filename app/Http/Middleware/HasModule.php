<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class HasModule
{
    public function handle(Request $request, Closure $next, string $module)
    {
        $user = $request->user();

        if (!$user || !$user->hasModule($module)) {
            abort(403, 'No access module');
        }

        return $next($request);
    }
}

