<?php

namespace Tests\Feature\Communities;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Community;

class CommunityIndexTest extends TestCase
{
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user and 2 community
        $this->user = User::factory()->create();
        Community::factory()->create([
            'id' => 1, 'user_id' => $this->user->id, 
            'name' => 'Test Community', 
            'description' => 'This is a test community'
        ]);

        Community::factory()->create([
            'id' => 2, 'user_id' => $this->user->id, 
            'name' => 'Test Community 2', 
            'description' => 'This is a test community 2'
        ]);
    }

    public function testGetCommunityById()
    {
        // Get that community by ID
        $response = $this->json('get', '/api/community/1');

        // Expect a 200 (Created) response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonPath('data.name', 'Test Community');
        $response->assertJsonPath('data.description', 'This is a test community');
        $response->assertJsonPath('data.user_id', $this->user->id);
    }

    public function testGetAllCommunities()
    {
        // Get all communities
        $response = $this->json('get', '/api/community');

        // Expect a 200 (Created) response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(2, 'data');
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
