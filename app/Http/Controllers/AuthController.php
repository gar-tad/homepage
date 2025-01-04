<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\LoginUserRequest;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(StoreUserRequest $request): JsonResponse|array
    {
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'is_admin' => $request->has('is_admin')
        ]);

        $token = $user->createToken($user->email)->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function login(LoginUserRequest $request): JsonResponse|array
    {
        $user = User::where('email', $request->email)->first();

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'errors' => ['credentials' => ['Invalid credentials']]
            ], 401);
        }

        $token = $user->createToken($user->email)->plainTextToken;

        return [
            'user' => $user,
            'token' => $token
        ];
    }

    public function logout(Request $request): void
    {
        $request->user()->tokens()->delete();
    }

    public function getUser(Request $request): User
    {
        return $request->user();
    }
}
