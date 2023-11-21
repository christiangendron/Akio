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

        // Assert the response structure
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'description',
                'media_url',
                'user_id',
            ],
        ]);
    }

    public function testGenerateWithAuthAndKeyword()
    {
        // Generate a community with auth and a keyword
        $response = $this->actingAs($this->user)->json('post', '/api/community/generate', [
            'inspiration' => 'cats',
            'has_image' => false,
        ]);

        // Expect a 201 (Created) response and validate the response JSON data
        $response->assertStatus(201);
        
        // Assert the response structure
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'description',
                'media_url',
                'user_id',
            ],
        ]);
    }

    public function testGenerateWithAuthAndKeywordAndImage()
    {
        // Generate a community with auth, a keyword and an image
        $response = $this->actingAs($this->user)->json('post', '/api/community/generate', [
            'inspiration' => 'cats',
            'has_image' => true,
        ]);

        // Expect a 201 (Created) response and validate the response JSON data
        $response->assertStatus(201);
        
        // Assert the response structure
        $response->assertJsonStructure([
            'data' => [
                'id',
                'name',
                'description',
                'media_url',
                'user_id',
            ],
        ]);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
