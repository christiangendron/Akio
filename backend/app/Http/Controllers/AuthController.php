<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use App\Http\Resources\AuthResource;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(AuthRequest $authRequest)
    {   
        $credentials = $authRequest->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json(['message' => 'The provided credentials do not match our records.'])->setStatusCode(401);
        }

        $user = auth()->user();
        $user->tokens()->delete();
        $user->save();

        return response()->json(['data' => AuthResource::make($user)])->setStatusCode(200);
    }
}
