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

        // Create a user instance, community and a post
        $this->user = User::factory()->create();
        Community::factory()->create(['id' => 1, 'user_id' => $this->user->id]);
        Post::factory()->create(['id' => 1, 'user_id' => $this->user->id, 'community_id' => 1]);
    }

    // Test comment generation without authentication
    public function testCommentGenerationNotAuth()
    {
        $data = [
            'inspiration' => '',
            'has_image' => false,
        ];
    
        $response = $this->json('post', '/api/comment/post/1/generate', $data);

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    // Test comment generation with authentication
    public function testCommentGenerationWithAuth()
    {
        $data = [
            'inspiration' => '',
            'has_image' => false,
        ];

        $response = $this->actingAs($this->user)->json('post', '/api/comment/post/1/generate', $data);

        // Expect a 201 (Created) response
        $response->assertStatus(201);

        // Get the comments for post 
        $response = $this->actingAs($this->user)->json('get', '/api/comment/post/1');

        // Expect a 200 (OK) response
        $response->assertStatus(200);

        // Assert the username
        $response->assertJsonPath('data.0.username', $this->user->username);
    }

    // Test comment generation with authentication and a keyword
    public function testCommentGenerationWithAuthAndKeyword()
    {
        $data = [
            'inspiration' => '',
            'has_image' => false,
        ];

        $response = $this->actingAs($this->user)->json('post', '/api/comment/post/1/generate/', $data);

        // Expect a 201 (Created) response
        $response->assertStatus(201);

        // Get the comments for post
        $response = $this->actingAs($this->user)->json('get', '/api/comment/post/1');

        // Expect a 200 (OK) response
        $response->assertStatus(200);

        // Assert the username
        $response->assertJsonPath('data.0.username', $this->user->username);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
