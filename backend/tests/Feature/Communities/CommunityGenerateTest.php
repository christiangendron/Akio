<?php

namespace Tests\Feature\Communities;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class CommunityGenerateTest extends TestCase
{
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user
        $this->user = User::factory()->create();
    }

    public function testGenerateWithoutAuth()
    {
        $data = [
            'inspiration' => '',
            'has_image' => false,
        ];

        // Generate a community
        $response = $this->json('post', '/api/community/generate', $data);

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    public function testGenerateWithAuth()
    {
        $data = [
            'inspiration' => '',
            'has_image' => false,
        ];

        // Generate a community
        $response = $this->actingAs($this->user)->json('post', '/api/community/generate', $data);

        // Expect a 201 (Created) response and validate the response JSON data
        $response->assertStatus(201);
        $response->assertJsonPath('data.user_id', $this->user->id);
    }

    public function testGenerateWithAuthAndKeyword()
    {
        $data = [
            'inspiration' => '',
            'has_image' => false,
        ];

        // Generate a community
        $response = $this->actingAs($this->user)->json('post', '/api/community/generate', $data);

        // Expect a 201 (Created) response and validate the response JSON data
        $response->assertStatus(201);
        $response->assertJsonPath('data.user_id', $this->user->id);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
