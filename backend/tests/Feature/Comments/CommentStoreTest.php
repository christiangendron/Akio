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

    public function testCommentStoreNoAuth()
    {
        // Try to create a comment without being authenticated
        $response = $this->json('post', '/api/comment/post/1/', [
            'text_content' => 'This is a comment'
        ]);

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    public function testCommentStoreWithAuth()
    {   
        // Create a comment with authentication
        $response = $this->actingAs($this->user)->json('post', '/api/comment/post/1/', [
            'text_content' => 'This is a comment'
        ]);

        // Expect a 201 (Created) response
        $response->assertStatus(201);
        
        // Get the comments for post
        $response = $this->actingAs($this->user)->json('get', '/api/comment/post/1');

        // Expect a 200 (OK) response
        $response->assertStatus(200);

        // Assert response data
        $response->assertJsonPath('data.0.username', $this->user->username);
        $response->assertJsonPath('data.0.text_content', 'This is a comment');

        // Assert the response structure
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'text_content',
                    'username',
                    'user_id',
                ],
            ],
        ]);
    }

    public function testCommentStoreWithAuthMissingTextContent()
    {
        // Create a comment with authentication without text_content
        $response = $this->actingAs($this->user)->json('post', '/api/comment/post/1/');

        // Expect a 422 (Unprocessable Entity) response
        $response->assertStatus(422);
    }

    public function testCommentStoreOnPostThatDoesNotExist()
    {
        // Create a comment with authentication on a post that does not exist
        $response = $this->actingAs($this->user)->json('post', '/api/comment/post/999/', [
            'text_content' => 'This is a comment'
        ]);

        // Expect a 404 (Not Found) response
        $response->assertStatus(404);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}