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
        $this->user = User::factory()->create(['id' => 1, 'username' => 'testuser', 'email' => 'test@test.test', 'password' => 'testpassword']);
    }

    public function testLogin()
    {
        // Login as user
        $response = $this->json('post', '/api/auth/login', [
            'username' => 'testuser',
            'email' => 'test@test.test',
            'password' => 'testpassword',
        ]);

        // Expect a 200 response
        $response->assertStatus(200);
        $response->assertJsonPath('data.user.username', 'testuser');
        $response->assertJsonPath('data.user.email', 'test@test.test');
    }

    public function testLoginWithBadAuth()
    {
        // Login with bad credentials
        $response = $this->json('post', '/api/auth/login', [
            'username' => 'testuser',
            'email' => 'test@test.test',
            'password' => 'testpassword2',
        ]);

        // Expect a 401 response
        $response->assertStatus(401);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
