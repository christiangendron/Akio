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
    private User $user2;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user, community and a few posts
        $this->user = User::factory()->create();
        $this->user2 = User::factory()->create();

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

        // Expect a 200 (OK) response
        $response->assertStatus(200);

        // Assert that the response has no posts
        $response->assertJsonCount(0, 'data');
    }

    public function testSaveOneAndReturnIt(): void
    {
        // Save a post
        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/1');
        $response->assertStatus(201);

        // Get the post
        $response = $this->actingAs($this->user)->json('get', '/api/saved/post/');

        // Assert that it's 200 OK
        $response->assertStatus(200);

        // Assert that the response has two posts
        $response->assertJsonCount(1, 'data');

        // Assert that responses has the saved posts
        $response->assertJsonPath('data.0.id', 1);

        // Assert that the response has the correct structure
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'text_content',
                    'media_url',
                    'user_id',
                    'username',
                    'community_id',
                    'community_name'
                ],
            ],
        ]);
    }

    public function testSaveWithMultipleUsers()
    {
        // Save a post as user one
        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/1');
        $response->assertStatus(201);

        // Save a post as user 2
        $response = $this->actingAs($this->user2)->json('post', '/api/saved/post/1');
        $response->assertStatus(201);

        // Get the post from user one
        $response = $this->actingAs($this->user)->json('get', '/api/saved/post/');
        $response->assertStatus(200);

        // Assert that there's only one post
        $response->assertJsonCount(1, 'data');
    }

    public function testSavedWithKeyword(): void
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

        // Assert that the response has the correct structure
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'text_content',
                    'media_url',
                    'user_id',
                    'username',
                    'community_id',
                    'community_name'
                ],
            ],
        ]);
    }

    public function testSavedWithOrderBy()
    {
        // Save the posts
        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/1');
        $response->assertStatus(201);

        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/2');
        $response->assertStatus(201);

        $response = $this->actingAs($this->user)->json('post', '/api/saved/post/3');
        $response->assertStatus(201);

        // Get the post without order by
        $response = $this->actingAs($this->user)->json('get', '/api/saved/post/');

        $response->assertJsonCount(3, 'data');
        $response->assertJsonPath('data.0.id', 3);
        $response->assertJsonPath('data.1.id', 2);
        $response->assertJsonPath('data.2.id', 1);

        // Get the posts with order by : old
        $response = $this->actingAs($this->user)->json('get', '/api/saved/post/?order_by=old');

        // Assert the count and order
        $response->assertJsonCount(3, 'data');
        $response->assertJsonPath('data.0.id', 1);
        $response->assertJsonPath('data.1.id', 2);
        $response->assertJsonPath('data.2.id', 3);

        // Get the posts with order by : new
        $response = $this->actingAs($this->user)->json('get', '/api/saved/post/?order_by=new');

        // Assert the count and order
        $response->assertJsonCount(3, 'data');
        $response->assertJsonPath('data.0.id', 3);
        $response->assertJsonPath('data.1.id', 2);
        $response->assertJsonPath('data.2.id', 1);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
        $this->user2->forceDelete();
    }
}
