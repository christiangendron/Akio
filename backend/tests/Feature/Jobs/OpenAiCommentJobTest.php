<?php

namespace Tests\Feature\Jobs;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Jobs\OpenAiCommentJob;
use App\Models\User;
use App\Models\Community;
use App\Models\Post;
use App\Models\Comment;

class OpenAiCommentJobTest extends TestCase
{
    private User $user;
    
    public function setUp(): void
    {
        parent::setUp();

        // Create a user
        $this->user = User::factory()->create();

        // Create a community
        Community::factory()->create(['id' => 1, 'name' => 'Initial title', 'user_id' => $this->user->id, 'description' => 'Initial description']);

        // Create a post
        Post::factory()->create(['id' => 1, 'title' => 'Initial title', 'user_id' => $this->user->id, 'community_id' => 1]);

        // Create a comment
        Comment::factory()->create(['id' => 1, 'text_content' => 'Initial text content', 'user_id' => $this->user->id, 'post_id' => 1]);
    }

    public function testCommentJob(): void
    {
        $prompt = "Generate a comment about dogs";
        $comment_id = 1;

        OpenAiCommentJob::dispatchSync($comment_id, $prompt);
        
        $comment = Comment::find($comment_id);

        // Assert that the Comment was updated
        $this->assertNotEquals('Initial text content', $comment->text_content, 'Comment text content was not updated as expected');

        // Assert that it has not failed
        $this->assertNotEquals('Generation failed', $comment->name, 'Comment failed to generate');
    }

    public function testCommentJobFail(): void
    {
        $prompt = "return me an error please";
        $comment_id = 1;

        OpenAiCommentJob::dispatchSync($comment_id, $prompt);
        
        $comment = Comment::find($comment_id);

        // Assert that the comment was updated
        $this->assertNotEquals('Initial text content', $comment->text_content, 'Comment text content was not updated as expected');

        // Assert that it has not failed
        $this->assertStringStartsWith('Generation failed', $comment->text_content, 'Comment generation failed as expected');
    }

    public function tearDown(): void
    {
        parent::tearDown();

        $this->user->forceDelete();
    }
}
