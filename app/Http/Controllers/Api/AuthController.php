<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

/**
 * @OA\Info(
 *     title="Gimme API",
 *     version="1.0.0",
 *     description="REST API for the Gimme e-commerce platform. Use POST /api/auth/login to get a Bearer token, then click Authorize above."
 * )
 * @OA\SecurityScheme(
 *     securityScheme="bearerAuth",
 *     type="http",
 *     scheme="bearer",
 *     bearerFormat="JWT"
 * )
 * @OA\Server(url="http://localhost:8000")
 * @OA\PathItem(path="/api")
 */
class AuthController extends Controller
{
    /**
     * @OA\Post(
     *     path="/api/auth/login",
     *     summary="Login and get a Bearer token",
     *     tags={"Auth"},
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(
     *             required={"email","password"},
     *             @OA\Property(property="email", type="string", example="admin@gmail.com"),
     *             @OA\Property(property="password", type="string", example="admin123")
     *         )
     *     ),
     *     @OA\Response(response=200, description="Returns token and user info"),
     *     @OA\Response(response=422, description="Invalid credentials")
     * )
     */
    public function login(Request $request): JsonResponse
    {
        $request->validate([
            'email'    => 'required|email',
            'password' => 'required|string',
        ]);

        $user = User::with('role')->where('email', $request->email)->first();

        if (! $user || ! Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.'],
            ]);
        }

        $token = $user->createToken('api-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user'  => [
                'id'      => $user->id,
                'name'    => $user->name,
                'email'   => $user->email,
                'role'    => $user->role?->name ?? 'customer',
                'isAdmin' => $user->isAdmin(),
            ],
        ]);
    }

    /**
     * @OA\Post(
     *     path="/api/auth/logout",
     *     summary="Revoke current token",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="Logged out"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function logout(Request $request): JsonResponse
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully.']);
    }

    /**
     * @OA\Get(
     *     path="/api/auth/me",
     *     summary="Get current authenticated user",
     *     tags={"Auth"},
     *     security={{"bearerAuth":{}}},
     *     @OA\Response(response=200, description="User info"),
     *     @OA\Response(response=401, description="Unauthenticated")
     * )
     */
    public function me(Request $request): JsonResponse
    {
        $user = $request->user()->load('role');

        return response()->json([
            'id'      => $user->id,
            'name'    => $user->name,
            'email'   => $user->email,
            'role'    => $user->role?->name ?? 'customer',
            'isAdmin' => $user->isAdmin(),
        ]);
    }
}
