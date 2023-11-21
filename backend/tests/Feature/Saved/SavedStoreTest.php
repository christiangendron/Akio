<?php

namespace Tests\Feature\Saved;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use App\Models\Community;

class SavedStoreTest extends TestCase
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

    public function testStorePostWithoutAuth(): void
    {
        // Try to save a post without auth
        $response = $this->json('post', '/api/saved/post/1');

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    public function testStorePostWithAuth(): void
    {
        // Save a post with auth
        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/1');

        // Assert that the ressource was created
        $response->assertStatus(201);

        // Save another one
        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/2');

        // Assert that the ressource was created
        $response->assertStatus(201);

        // Get the posts
        $response = $this->actingAs($this->user)->json('get', '/api/saved/post/');

        // Assert that the response has two posts
        $response->assertJsonCount(2, 'data');
    }

    public function testTryToSaveTheSamePostTwice(): void
    {
        // Save a post
        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/1');

        // Assert that the ressource was created
        $response->assertStatus(201);

        // Try to save it again
        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/1');

        // Assert that the ressource was not created
        $response->assertStatus(422);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
