<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ForceHttps
{
    /**
     * Handle an incoming request.
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Only apply in production
        if (app()->environment('production')) {
            // Force HTTPS if not already
            if (!$request->isSecure() && !app()->runningInConsole()) {
                return redirect()->secure($request->getRequestUri(), 301);
            }
            
            // Ensure all internal URLs use HTTPS
            $request->server->set('HTTPS', 'on');
            $request->server->set('SERVER_PORT', 443);
            $request->server->set('REQUEST_SCHEME', 'https');
        }

        return $next($request);
    }
}