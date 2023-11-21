<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Comment;
use App\Models\User;
use App\Models\Post;
use App\Models\Community;

class CommentGenerateTest extends TestCase
{
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user, a community and a post
        $this->user = User::factory()->create();
        Community::factory()->create(['id' => 1, 'user_id' => $this->user->id]);
        Post::factory()->create(['id' => 1, 'user_id' => $this->user->id, 'community_id' => 1]);
    }

    public function testCommentGenerationNotAuth()
    {
        // Try to generate a comment without being authenticated
        $response = $this->json('post', '/api/comment/post/1/generate');

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    public function testCommentGenerationWithAuth()
    {
        // Generate a comment with authentication
        $response = $this->actingAs($this->user)->json('post', '/api/comment/post/1/generate');

        // Expect a 201 (Created) response
        $response->assertStatus(201);

        // Get the comments for post 
        $response = $this->actingAs($this->user)->json('get', '/api/comment/post/1');

        // Expect a 200 (OK) response
        $response->assertStatus(200);
        
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

    public function testCommentGenerationWithAuthAndKeyword()
    {
        // Generate a comment with authentication and a keyword
        $response = $this->actingAs($this->user)->json('post', '/api/comment/post/1/generate/', [
            'inspiration' => 'cute',
        ]);

        // Expect a 201 (Created) response
        $response->assertStatus(201);

        // Get the comments for post
        $response = $this->actingAs($this->user)->json('get', '/api/comment/post/1');

        // Expect a 200 (OK) response
        $response->assertStatus(200);

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

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
