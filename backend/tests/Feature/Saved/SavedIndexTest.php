<?php

namespace Tests\Feature\Saved;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use App\Models\Community;

class SavedIndexTest extends TestCase
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

    public function testGetSavedNotauth(): void
    {
        // Try to get saved post
        $response = $this->json('get', '/api/saved/post');

        // Assert that it's unauthorized, you need auth for this route
        $response->assertStatus(401);
    }

    public function testGetSavedWithAuth(): void
    {
        // Try to get saved post as an auth user
        $response = $this->actingAs($this->user)->json('get', '/api/saved/post');

        // We get 200 OK, but there's no saved posts
        $response->assertStatus(200);
        $response->assertJsonCount(0, 'data');
    }

    public function testSaveOneAndReturnIt(): void
    {
        // Save a two post
        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/1');
        $response->assertStatus(201);

        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/2');
        $response->assertStatus(201);

        // Get the posts again
        $response = $this->actingAs($this->user)->json('get', '/api/saved/post/');

        // Assert that it's 200 OK
        $response->assertStatus(200);

        // Assert that the response has two posts
        $response->assertJsonCount(2, 'data');

        // Assert that responses has the saved posts
        $response->assertJsonPath('data.0.id', 1);
        $response->assertJsonPath('data.1.id', 2);
    }

    public function testSavedWithKeywordAndOrderBy(): void
    {
        // Save the posts
        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/1');
        $response->assertStatus(201);

        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/2');
        $response->assertStatus(201);

        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/3');
        $response->assertStatus(201);

        // Get the posts again with keyword
        $response = $this->actingAs($this->user)->json('get', '/api/saved/post?keyword=dogs');

        // Assert that the response has only two post
        $response->assertJsonCount(2, 'data');
        $response->assertJsonPath('data.0.id', 1);
        $response->assertJsonPath('data.1.id', 3);

        // Get the posts again with keyword
        $response = $this->actingAs($this->user)->json('get', '/api/saved/post/?order_by=created_at&direction=desc&keyword=dogs');

        // Assert that the response has only two post (order should be reversed)
        $response->assertJsonCount(2, 'data');
        $response->assertJsonPath('data.0.id', 3);
        $response->assertJsonPath('data.1.id', 1);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
