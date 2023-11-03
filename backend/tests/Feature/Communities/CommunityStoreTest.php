<?php

namespace Tests\Feature\Communities;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class CommunityStoreTest extends TestCase
{
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user
        $this->user = User::factory()->create();
    }

    public function testStoreWithoutAuth()
    {
        // Create a community
        $response = $this->json('post', '/api/community', [
            'name' => 'Test Community',
            'description' => 'This is a test community'
        ]);

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    public function testSimpleStore()
    {
        // Create a community
        $response = $this->actingAs($this->user)->json('post', '/api/community', [
            'name' => 'Test Community',
            'description' => 'This is a test community'
        ]);

        // Expect a 200 (Created) response and validate the response JSON data
        $response->assertStatus(201);
        $response->assertJsonPath('data.name', 'Test Community');
        $response->assertJsonPath('data.description', 'This is a test community');
        $response->assertJsonPath('data.user_id', $this->user->id);
    }

    public function testStoreWithSameName()
    {
        // Create a community
        $response = $this->actingAs($this->user)->json('post', '/api/community', [
            'name' => 'Name 1',
            'description' => 'This is a test community'
        ]);

        $response->assertStatus(201);

        // Create another community with the same name
        $response = $this->actingAs($this->user)->json('post', '/api/community', [
            'name' => 'Name 1',
            'description' => 'This is a test community'
        ]);

        // Expect a 409 (Conflict) response
        $response->assertStatus(409);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
