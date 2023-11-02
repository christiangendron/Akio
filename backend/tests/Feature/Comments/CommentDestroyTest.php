<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use Database\Factories\CommentFactory;
use App\Models\Comment;
use App\Models\User;
use App\Models\Post;
use App\Models\Event;
use App\Models\Community;

class CommentDestroyTest extends TestCase
{
    private User $user1;
    private User $user2;
    private User $user3;

    public function setUp(): void
    {
        parent::setUp();

        // Create three user
        $this->user1 = User::factory()->create();
        $this->user2 = User::factory()->create();
        $this->user3 = User::factory()->create(['is_admin' => 1]);

        // Create a community, post, and four comments
        $community = Community::factory()->create(['id' => 1, 'user_id' => $this->user1->id]);
        $post = Post::factory()->create(['id' => 1, 'user_id' => $this->user1->id, 'community_id' => $community->id]);
        Comment::factory()->create(['id' => 101, 'user_id' => $this->user1->id, 'post_id' => $post->id]);
        Comment::factory()->create(['id' => 102, 'user_id' => $this->user2->id, 'post_id' => $post->id]);
        Comment::factory()->create(['id' => 103, 'user_id' => $this->user3->id, 'post_id' => $post->id]);
        Comment::factory()->create(['id' => 104, 'user_id' => $this->user1->id, 'post_id' => $post->id]);
    }

    // Test unauthorized comment destruction
    public function testCommentDestroyedNotAuth(): void
    {
        // Try to delete comment 101 without being authenticated
        $response = $this->json('delete', '/api/comment/101');

        // Expect a 401 (Unauthorized) response
        $response->assertStatus(401);
    }

    // Test comment destruction by non-owners
    public function testCommentDestroyedNotHis(): void
    {
        // Try to delete comment 102 as user1 (not the owner) and expect a 403 (Forbidden) response
        $response = $this->actingAs($this->user1)->json('delete', '/api/comment/102');
        $response->assertStatus(403);

        // Try to delete comment 101 as user2 (not the owner) and expect a 403 (Forbidden) response
        $response = $this->actingAs($this->user2)->json('delete', '/api/comment/101');
        $response->assertStatus(403);
    }

    // Test successful comment destruction by owners
    public function testCommentDestroyedHis(): void
    {
        // Delete comment 102 as user2 (the owner) and expect a 200 (OK) response
        $response = $this->actingAs($this->user2)->json('delete', '/api/comment/102');
        $response->assertStatus(200);

        // Delete comment 101 as user1 (the owner) and expect a 200 (OK) response
        $response = $this->actingAs($this->user1)->json('delete', '/api/comment/101');
        $response->assertStatus(200);
    }

    // Test comment destruction by an admin
    public function testCommentDestroyedAsAdmin(): void
    {
        // Delete comment 104 as an admin (user3) and expect a 200 (OK) response
        $response = $this->actingAs($this->user3)->json('delete', '/api/comment/104');
        $response->assertStatus(200);
    }

    public function tearDown(): void
    {
        $this->user1->forceDelete();
        $this->user2->forceDelete();
        $this->user3->forceDelete();
    }
}
