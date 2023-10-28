<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\AuthRequest;
use App\Http\Resources\AuthResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Http\Requests\RegisterRequest;
use App\Models\User;

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

    public function register(RegisterRequest $registerRequest)
    {
        $request = $registerRequest->validated();

        $user = new User;
        $user->username = $request['username'];
        $user->email = $request['email'];
        $user->password = Hash::make($request['password']);
        $user->save();

        return response()->json(['data' => AuthResource::make($user)])->setStatusCode(201);
    }
}
