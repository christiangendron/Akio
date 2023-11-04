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
        $response = $this->json('post', '/api/comment/post/1/generate');

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    // Test comment generation with authentication
    public function testCommentGenerationWithAuth()
    {
        $response = $this->actingAs($this->user)->json('post', '/api/comment/post/1/generate');

        // Expect a 201 (Created) response
        $response->assertStatus(201);
        $response->assertJsonPath('data.username', $this->user->username);
    }

    // Test comment generation with authentication and a keyword
    public function testCommentGenerationWithAuthAndKeyword()
    {
        $response = $this->actingAs($this->user)->json('post', '/api/comment/post/1/generate/dogs');

        // Expect a 201 (Created) response
        $response->assertStatus(201);
        $response->assertJsonPath('data.username', $this->user->username);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
