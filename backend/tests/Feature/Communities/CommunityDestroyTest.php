<?php

namespace Tests\Feature\Communities;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Community;

class CommunityDestroyTest extends TestCase
{
    private User $user1;
    private User $user2;
    private User $user3;

    public function setUp(): void
    {
        parent::setUp();

        // Create three user
        $this->user1 = User::factory()->create();
        $this->user2 = User::factory()->create();
        $this->user3 = User::factory()->create(['is_admin' => 1]);

        // Create 3 community
        $community = Community::factory()->create(['id' => 1, 'user_id' => $this->user1->id]);
        $community = Community::factory()->create(['id' => 2, 'user_id' => $this->user2->id]);
        $community = Community::factory()->create(['id' => 3, 'user_id' => $this->user1->id]);
        $community = Community::factory()->create(['id' => 4, 'user_id' => $this->user2->id]);
    }

    public function testCommunityDestroyedNotAuth(): void
    {
        // Try to delete community 1 without being authenticated
        $response = $this->json('delete', '/api/community/1');

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    public function testCommunityDestroyedNotHis(): void
    {
        // Try to delete community 2 as user1 (not the owner) and expect a 403 (Forbidden) response
        $response = $this->actingAs($this->user1)->json('delete', '/api/community/2');
        $response->assertStatus(403);

        // Try to delete community 1 as user2 (not the owner) and expect a 403 (Forbidden) response
        $response = $this->actingAs($this->user2)->json('delete', '/api/community/1');
        $response->assertStatus(403);
    }

    public function testCommunityDestroyedHis(): void
    {
        // Try to delete community 1 as user1 (the owner) and expect a 200 (OK) response
        $response = $this->actingAs($this->user1)->json('delete', '/api/community/1');
        $response->assertStatus(200);

        // Try to delete community 2 as user2 (the owner) and expect a 200 (OK) response
        $response = $this->actingAs($this->user2)->json('delete', '/api/community/2');
        $response->assertStatus(200);
    }

    public function testCommunityDestroyedAdmin(): void
    {
        // Try to delete community 1 as user3 (the admin) and expect a 200 (OK) response
        $response = $this->actingAs($this->user3)->json('delete', '/api/community/3');
        $response->assertStatus(200);

        // Try to delete community 2 as user3 (the admin) and expect a 200 (OK) response
        $response = $this->actingAs($this->user3)->json('delete', '/api/community/4');
        $response->assertStatus(200);
    }

    public function tearDown(): void
    {
        $this->user1->forceDelete();
        $this->user2->forceDelete();
        $this->user3->forceDelete();
    }
}
