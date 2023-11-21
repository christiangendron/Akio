<?php

namespace Tests\Feature\Posts;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Community;

class PostsStoreTest extends TestCase
{
    private User $user;
    private Community $community;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user
        $this->user = User::factory()->create();

        // Create a community
        $this->community = Community::factory()->create(['id' => 1, 'user_id' => $this->user->id]);
    }

    public function testStoreWithoutAuth()
    {
        // Create a post without auth
        $response = $this->json('post', '/api/post/community/' . $this->community->id , [
            'title' => 'Test Post',
            'text_content' => 'This is a test post',
            'media_url' => null
        ]);

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    public function testSimpleStore()
    {
        // Create a post with auth
        $response = $this->actingAs($this->user)->json('post', '/api/post/community/' . $this->community->id , [
            'title' => 'Test Post',
            'text_content' => 'This is a test post',
            'media_url' => null
        ]);

        // Expect a 201 (Created) response and validate the response JSON data
        $response->assertStatus(201);
        $response->assertJsonPath('data.title', 'Test Post');
        $response->assertJsonPath('data.text_content', 'This is a test post');
        $response->assertJsonPath('data.media_url', null);
        $response->assertJsonPath('data.user_id', $this->user->id);
        $response->assertJsonPath('data.community_id', $this->community->id);

        // Assert the json structure
        $response->assertJsonStructure([
            'data' => [
                'id',
                'title',
                'text_content',
                'media_url',
                'user_id',
                'username',
                'community_id',
                'community_name',
            ]
        ]);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
