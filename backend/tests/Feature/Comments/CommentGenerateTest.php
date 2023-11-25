<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\Comment;
use App\Models\User;
use App\Models\Post;
use App\Models\Community;
use Illuminate\Support\Facades\Queue;

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

        // Create a fake queue for openAI request
        Queue::fake('openai');
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
        $response->assertJsonPath('message', 'Comment is generating...');
        $response->assertJsonStructure(['id']);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
