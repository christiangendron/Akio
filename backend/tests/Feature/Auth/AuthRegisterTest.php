<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class AuthRegisterTest extends TestCase
{
    public function testSimpleRegisterWithoutData(): void
    {
        // Trying to register without data
        $response = $this->json('post', '/api/auth/register');

        // Expect a 422 (Unprocessable Entity) response
        $response->assertStatus(422);
    }

    public function testSimpleRegister(): void
    {
        // Registering a new user
        $response = $this->json('post', '/api/auth/register', [
            'username' => 'testuser',
            'email' => 'test@test.test',
            'password' => 'testpassword',
        ]);

        // Expect a 201 (Created) response
        $response->assertStatus(201);
        $response->assertJsonPath('data.user.username', 'testuser');
        $response->assertJsonPath('data.user.email', 'test@test.test');
        $response->assertJsonPath('data.user.is_admin', 0);

        // Check the structure of the response
        $response->assertJsonStructure([
            'data' => [
                'user' => [
                    'id',
                    'username',
                    'email',
                    'is_admin',
                    'created_at',
                ],
                'token',
            ],
        ]);
    }

    public function testSimpleRegisterWithoutEmail(): void
    {
        // Registering a new user without email
        $response = $this->json('post', '/api/auth/register', [
            'username' => 'testuser',
            'password' => 'testpassword',
        ]);

        // Expect a 422 (Unprocessable Entity) response
        $response->assertStatus(422);
    }

    public function testSimpleRegisterWithoutUsername(): void
    {
        // Registering a new user without username
        $response = $this->json('post', '/api/auth/register', [
            'email' => 'test@test.test',
            'password' => 'testpassword',
        ]);

        // Expect a 422 (Unprocessable Entity) response
        $response->assertStatus(422);
    }

    public function testSimpleRegisterWithoutPassword(): void
    {
        // Registering a new user without password
        $response = $this->json('post', '/api/auth/register', [
            'username' => 'testuser',
            'email' => 'test@test.test',
        ]);

        // Expect a 422 (Unprocessable Entity) response
        $response->assertStatus(422);
    }

    public function testRegisterWithExistingEmail(): void
    {
        // Registering a new user
        $response = $this->json('post', '/api/auth/register', [
            'username' => 'testuser',
            'email' => 'test@test.test',
            'password' => 'testpassword',
        ]);

        // Expect a 201 (Created) response
        $response->assertStatus(201);

        // Register a user with same email
        $response = $this->json('post', '/api/auth/register', [
            'username' => 'testuser',
            'email' => 'test@test.test',
            'password' => 'testpassword',
        ]);

        // Expect a 422 (Unprocessable Entity) response
        $response->assertStatus(422);
    }

    public function testRegisterWithExistingUsername(): void
    {
        // Registering a new user
        $response = $this->json('post', '/api/auth/register', [
            'username' => 'testuser',
            'email' => 'test@test.test',
            'password' => 'testpassword',
        ]);

        // Expect a 201 (Created) response
        $response->assertStatus(201);

        // Register a user with same username
        $response = $this->json('post', '/api/auth/register', [
            'username' => 'testuser',
            'email' => 'test2@test2.test2',
            'password' => 'testpassword',
        ]);

        // Expect a 422 (Unprocessable Entity) response
        $response->assertStatus(422);
    }

    public function tearDown(): void
    {
        $user = User::where('username', 'testuser')->first();

        if ($user) {
            $user->delete();
        }
    }
}
