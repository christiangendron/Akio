<?php

namespace Tests\Feature\Auth;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Laravel\Sanctum\PersonalAccessToken;
use Illuminate\Support\Facades\Hash;

class AuthLogoutTest extends TestCase
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
            'password' => Hash::make('testpassword')
        ]);
    }

    public function testLogoutWithoutAuth()
    {
        // Log out without auth
        $response = $this->postJson('/api/auth/logout');

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    public function testLoginAndLogout()
    {
        // Log as the user
        $loginResponse = $this->postJson('/api/auth/login', [
            "email" => 'test@test.test',
            "password" => 'testpassword'
        ]);

        // Check if the user have a token.
        $this->assertDatabaseHas('personal_access_tokens', [
            'tokenable_id' => $this->user->id
        ]);

        // Log out
        $response = $this->postJson('/api/auth/logout', [], [
            "Authorization" => 'Bearer ' . $loginResponse['data']['token']
        ]);

        // Expect a 200 response success
        $response->assertStatus(200);

        // Check if the token was deleted
        $this->assertDatabaseMissing('personal_access_tokens', [
            'tokenable_id' => $this->user->id
        ]);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
