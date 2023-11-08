<?php

namespace Tests\Feature\Posts;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Community;

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
    }

    public function testGeneratePostWithoutAuth()
    {
        $data = [
            'inspiration' => '',
            'has_image' => false,
        ];

        // Create a post without auth
        $response = $this->json('post', '/api/post/community/' . $this->community->id . '/generate', $data);

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    public function testGeneratePost()
    {
        $data = [
            'inspiration' => '',
            'has_image' => false,
        ];

        // Create a post with long timeout (open ai request with images takes a long time)
        $response = $this->actingAs($this->user)->withHeaders(['timeout' => 60])->json('post', '/api/post/community/' . $this->community->id . '/generate', $data);

        // Expect a 201 (Created) response and validate the response JSON data
        $response->assertStatus(201);
        $response->assertJsonPath('data.user_id', $this->user->id);
        $response->assertJsonPath('data.community_id', $this->community->id);
    }

    public function testGeneratePostWithKeyword()
    {
        $data = [
            'inspiration' => 'dogs',
            'has_image' => false,
        ];

        // Create a post with long timeout (open ai request with images takes a long time)
        $response = $this->actingAs($this->user)->withHeaders(['timeout' => 60])->json('post', '/api/post/community/' . $this->community->id . '/generate', $data);

        // Expect a 201 (Created) response and validate the response JSON data
        $response->assertStatus(201);
        $response->assertJsonPath('data.user_id', $this->user->id);
        $response->assertJsonPath('data.community_id', $this->community->id);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
