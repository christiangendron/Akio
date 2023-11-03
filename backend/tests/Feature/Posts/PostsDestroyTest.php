<?php

namespace Tests\Feature\Posts;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use App\Models\Community;
use App\Http\Controllers\OpenAIController;

class PostsDestroyTest extends TestCase
{
    private User $user1;
    private User $user2;
    private User $user3;

    public function setUp(): void
    {
        parent::setUp();

        // Create 3 users
        $this->user1 = User::factory()->create();
        $this->user2 = User::factory()->create();
        $this->user3 = User::factory()->create(['is_admin' => true]);

        // Create a community
        Community::factory()->create(['id' => 1, 'user_id' => $this->user1->id, ]);

        // Create 4 posts for the different users
        Post::factory()->create(['id' => 1, 'user_id' => $this->user1->id, 'community_id' => 1]);
        Post::factory()->create(['id' => 2, 'user_id' => $this->user2->id, 'community_id' => 1]);
        Post::factory()->create(['id' => 3, 'user_id' => $this->user1->id, 'community_id' => 1]);
        Post::factory()->create(['id' => 4, 'user_id' => $this->user2->id, 'community_id' => 1]);
    }

    public function testDestroyPostWithoutAuth()
    {
        // Attempt to delete a post without authentication
        $response = $this->json('delete', '/api/post/1');

        // Expect a 401 Unauthorized response
        $response->assertStatus(401);
    }

    public function testDestroyPostNotHis()
    {
        // Attempt to delete a post that does not belong to the authenticated user
        $response = $this->actingAs($this->user1)->json('delete', '/api/post/2');
        $response->assertStatus(403);

        // Attempt to delete a post that does not belong to the authenticated user
        $response = $this->actingAs($this->user2)->json('delete', '/api/post/1');
        $response->assertStatus(403);
    }

    public function testDestroyPostHis()
    {
        // Attempt to delete a post that belongs to the authenticated user
        $response = $this->actingAs($this->user1)->json('delete', '/api/post/1');
        $response->assertStatus(200);

        // Attempt to delete a post that belongs to the authenticated user
        $response = $this->actingAs($this->user2)->json('delete', '/api/post/2');
        $response->assertStatus(200);
    }

    public function testDestroyPostAdmin()
    {
        // Attempt to delete a post as an admin user
        $response = $this->actingAs($this->user3)->json('delete', '/api/post/3');
        $response->assertStatus(200);

        // Attempt to delete a post as an admin user
        $response = $this->actingAs($this->user3)->json('delete', '/api/post/4');
        $response->assertStatus(200);
    }

    public function testDestroyWithImage()
    {
        $imageName = OpenAIController::downloadImage('https://en.wikipedia.org/static/images/project-logos/enwiki.png');

        // Create a post with an image
        Post::factory()->create(['id' => 5, 'user_id' => $this->user1->id, 'community_id' => 1, 'media_url' => $imageName]);

        // Attempt to delete the post with an image
        $response = $this->actingAs($this->user1)->json('delete', '/api/post/5');
        $response->assertStatus(200);

        // Ensure that the image file is removed
        $this->assertFileDoesNotExist(public_path('images/posts/' . $imageName));
    }

    public function tearDown(): void
    {
        // Delete the user objects created during setup
        $this->user1->forceDelete();
        $this->user2->forceDelete();
        $this->user3->forceDelete();
    }
}
