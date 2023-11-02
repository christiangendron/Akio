<?php

namespace Tests\Feature\Comments;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Community;
use App\Models\Post;

class CommentStoreTest extends TestCase
{
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user, community and a post
        $this->user = User::factory()->create();
        Community::factory()->create(['id' => 1, 'user_id' => $this->user->id]);
        Post::factory()->create(['id' => 1, 'user_id' => $this->user->id, 'community_id' => 1]);
    }

    // Test comment creation without authentication
    public function testCommentStoreNoAuth()
    {
        $response = $this->json('post', '/api/comment/post/1/', [
            'text_content' => 'This is a comment'
        ]);

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    // Test comment creation with authentication
    public function testCommentStoreWithAuth()
    {
        $response = $this->actingAs($this->user)->json('post', '/api/comment/post/1/', [
            'text_content' => 'This is a comment'
        ]);

        // Expect a 201 (Created) response and validate the response JSON data
        $response->assertStatus(201);
        $response->assertJsonPath('data.text_content', 'This is a comment');
        $response->assertJsonPath('data.username', $this->user->username);
    }

    // Test comment creation with authentication and missing text_content
    public function testCommentStoreWithAuthMissingTextContent()
    {
        $response = $this->actingAs($this->user)->json('post', '/api/comment/post/1/');

        // Expect a 422 (Unprocessable Entity) response due to missing text_content
        $response->assertStatus(422);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}