<?php

namespace Tests\Feature\Comments;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use App\Models\Community;
use App\Models\Comment;

class CommentIndexTest extends TestCase
{
    private User $user;
    private Post $post;
    private Post $post2;
    private Comment $comment;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user, community and a post
        $this->user = User::factory()->create();
        Community::factory()->create(['id' => 1, 'user_id' => $this->user->id]);

        // Create a post with two comment
        $this->post = Post::factory()->create(['id' => 1, 'user_id' => $this->user->id, 'community_id' => 1]);
        $this->comment = Comment::factory()->create(['id' => 1, 'user_id' => $this->user->id, 'post_id' => 1, 'text_content' => 'This is a comment']);
        $this->comment = Comment::factory()->create(['id' => 2, 'user_id' => $this->user->id, 'post_id' => 1, 'text_content' => 'This is a comment']);

        // Create another post with no comments
        $this->post2 = Post::factory()->create(['id' => 2, 'user_id' => $this->user->id, 'community_id' => 1]);
    }

    public function testGetCommentsByPostIdNoComments()
    {
        // Get comments by post ID
        $response = $this->json('get', '/api/comment/post/' . $this->post2->id);

        // Expect a 200 (OK) response and a JSON path with 0 comments in 'data'
        $response->assertStatus(200);
        $response->assertJsonCount(0, 'data');
    }

    public function testGetCommentsByPostIdWithComments()
    {
        // Get comments by post ID
        $response = $this->json('get', '/api/comment/post/' . $this->post->id);

        // Expect a 200 (OK) response and a JSON path with 2 comments in 'data'
        $response->assertStatus(200);
        $response->assertJsonCount(2, 'data');

        // Assert the response structure
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'text_content',
                    'username',
                    'user_id',
                ],
            ],
        ]);
    }

    public function testGetcommentsForPostThatDoesNotExist()
    {
        // Get comments by post ID
        $response = $this->json('get', '/api/comment/post/999');

        // Expect a 404 (Not Found) response
        $response->assertStatus(404);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
