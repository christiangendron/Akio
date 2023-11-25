<?php

namespace Tests\Feature\Posts;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Community;
use Illuminate\Support\Facades\Queue;

class PostsGenerateTest extends TestCase
{
    private User $user;
    private Community $community;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user
        $this->user = User::factory()->create();

        // Create a community
        $this->community = Community::factory()->create(['id' => 1, 'name' => 'dogs', 'user_id' => $this->user->id]);

        // Create a fake queue for openAI request
        Queue::fake('openai');
    }

    public function testGeneratePostWithoutAuth()
    {
        // Create a post without auth
        $response = $this->json('post', '/api/post/community/' . $this->community->id . '/generate', [
            'inspiration' => '',
            'has_image' => false,
        ]);

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    public function testGeneratePost()
    {
        // Create a post with long timeout (open ai request with images takes a long time)
        $response = $this->actingAs($this->user)->withHeaders(['timeout' => 60])->json('post', '/api/post/community/' . $this->community->id . '/generate', [
            'inspiration' => '',
            'has_image' => false,
        ]);

        // Expect a 201 (Created) response and validate the response JSON data
        $response->assertStatus(201);
        $response->assertJsonPath('message', 'Post is generating...');
        $response->assertJsonStructure(['id']);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
