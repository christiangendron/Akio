<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class AuthLoginTest extends TestCase
{
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user
        $this->user = User::factory()->create([
            'id' => 1, 
            'username' => 'testuser', 
            'email' => 'test@test.test', 
            'password' => 'testpassword'
        ]);
    }

    public function testLogin()
    {
        // Login as user
        $response = $this->json('post', '/api/auth/login', [
            'email' => 'test@test.test',
            'password' => 'testpassword',
        ]);

        // Expect a 200 response
        $response->assertStatus(200);
        $response->assertJsonPath('data.user.username', $this->user->username);
        $response->assertJsonPath('data.user.email', $this->user->email);
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

    public function testLoginWithBadAuth()
    {
        // Login with bad credentials
        $response = $this->json('post', '/api/auth/login', [
            'email' => 'test@test.test',
            'password' => 'testpassword2',
        ]);

        // Expect a 401 Unauthorized
        $response->assertStatus(401);
    }

    public function testWithMissingData()
    {
        // Login with missing password
        $response = $this->json('post', '/api/auth/login', [
            'email' => 'test@test.test',
        ]);

        // Expect a 422 unprocessable entity
        $response->assertStatus(422);

        // Login with missing email
        $response = $this->json('post', '/api/auth/login', [
            'password' => 'testpassword2',
        ]);

        // Expect a 422 unprocessable entity
        $response->assertStatus(422);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
