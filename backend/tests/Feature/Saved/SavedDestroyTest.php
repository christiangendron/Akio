<?php

namespace Tests\Feature\Saved;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use App\Models\Community;

class SavedDestroyTest extends TestCase
{
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user, community and a few posts
        $this->user = User::factory()->create();

        $community = Community::factory()->create(['id' => 1, 'user_id' => $this->user->id]);

        $post = Post::factory()->create(['id' => 1, 'user_id' => $this->user->id, 'title' => 'Cute dogs', 'community_id' => $community->id, 'created_at' => '2020-01-01 00:00:00']);
        $post = Post::factory()->create(['id' => 2, 'user_id' => $this->user->id, 'title' => 'Cute cats', 'community_id' => $community->id, 'created_at' => '2021-01-01 00:00:00']);
        $post = Post::factory()->create(['id' => 3, 'user_id' => $this->user->id, 'title' => 'Cute dogs and cats', 'community_id' => $community->id, 'created_at' => '2022-01-01 00:00:00']);
    }

    public function testDestroyWithoutAuth(): void
    {
        // Try to save a post without auth
        $response = $this->json('delete', '/api/saved/post/1');

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    public function testDestroyWithAuth(): void
    {
        // Save a post
        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/1');

        // Assert that the ressource was created
        $response->assertStatus(201);

        // Get the posts
        $response = $this->actingAs($this->user)->json('get', '/api/saved/post/');

        // Assert that the response has one post
        $response->assertJsonCount(1, 'data');

        // Try to destroy the post
        $response = $this->actingAs($this->user)->json('delete', '/api/saved/post/1');

        // Assert that the ressource deleted
        $response->assertStatus(200);

        // Get the posts again
        $response = $this->actingAs($this->user)->json('get', '/api/saved/post/');

        // Assert that the response has no posts
        $response->assertJsonCount(0, 'data');
    }

    public function testDestroyTheSameRessourceTwice(): void
    {
        // Save a post
        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/1');

        // Assert that the ressource was created
        $response->assertStatus(201);

        // Try to destroy the post
        $response = $this->actingAs($this->user)->json('delete', '/api/saved/post/1');

        // Assert that the ressource deleted
        $response->assertStatus(200);

        // Try to destroy the post again
        $response = $this->actingAs($this->user)->json('delete', '/api/saved/post/1');

        // Assert that the ressource was not found
        $response->assertStatus(404);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
