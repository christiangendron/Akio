<?php

namespace Tests\Feature\Communities;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use Illuminate\Support\Facades\Queue;

class CommunityGenerateTest extends TestCase
{
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user
        $this->user = User::factory()->create();

        // Create a fake queue for openAI request
        Queue::fake('openai');
    }

    public function testGenerateWithoutAuth()
    {
        // Generate a community without auth
        $response = $this->json('post', '/api/community/generate', $data = [
            'inspiration' => '',
            'has_image' => false,
        ]);

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    public function testGenerateWithAuth()
    {
        // Generate a community with auth
        $response = $this->actingAs($this->user)->json('post', '/api/community/generate', [
            'inspiration' => '',
            'has_image' => false,
        ]);

        // Expect a 201 (Created) response and validate the response JSON data
        $response->assertStatus(201);
        $response->assertJsonPath('message', 'Community is generating...');
        $response->assertJsonStructure(['id']);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
