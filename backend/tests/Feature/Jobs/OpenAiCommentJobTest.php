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
use App\Models\Task;

class OpenAiCommentJobTest extends TestCase
{
    private User $user;
    private Post $post;
    
    public function setUp(): void
    {
        parent::setUp();

        // Create a user
        $this->user = User::factory()->create();

        // Create a community
        Community::factory()->create(['id' => 1, 'name' => 'Initial title', 'user_id' => $this->user->id, 'description' => 'Initial description']);

        // Create a post
        $this->post = Post::factory()->create(['id' => 1, 'title' => 'Initial title', 'user_id' => $this->user->id, 'community_id' => 1]);
    }

    public function testCommentJob(): void
    {
        $task = Task::factory()->create([
            'id' => 3, 
            'type' => 'comment', 
            'user_id' => $this->user->id, 
            'parent_id' => $this->post->id, 
            'prompt' => 'create a simple comment about dogs', 
            'with_image' => false
        ]);

        OpenAiCommentJob::dispatchSync($task);
        
        $updatedTask = Task::find($task->id);

        $comment = Comment::find($updatedTask->created_id);

        // Assert comment is not null
        $this->assertNotNull($comment, 'Comment was not created');
    }

    public function testCommentJobFail(): void
    {
        $task = Task::factory()->create([
            'id' => 3, 
            'type' => 'comment', 
            'user_id' => $this->user->id, 
            'parent_id' => $this->post->id, 
            'prompt' => 'return an error please', 
            'with_image' => false
        ]);

        OpenAiCommentJob::dispatchSync($task);
        
        $updatedTask = Task::find($task->id);

        $comment = Comment::find($updatedTask->created_id);

        // Assert that the job failed
        $this->assertNull($comment, 'Comment was created');
    }

    public function tearDown(): void
    {
        parent::tearDown();

        $this->user->forceDelete();
    }
}
