<?php

namespace Tests\Feature\Jobs;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Jobs\OpenAiPostJob;
use App\Models\User;
use App\Models\Community;
use App\Models\Post;
use App\Models\Task;

class OpenAiPostJobTest extends TestCase
{
    private User $user;
    private Community $community;
    
    public function setUp(): void
    {
        parent::setUp();

        // Create a user
        $this->user = User::factory()->create();

        // Create a community
        $this->community = Community::factory()->create(['id' => 1, 'name' => 'Initial title', 'user_id' => $this->user->id, 'description' => 'Initial description']);
    }

    public function testPostJob(): void
    {
        $task = Task::factory()->create([
            'id' => 3, 
            'type' => 'post', 
            'user_id' => $this->user->id, 
            'parent_id' => $this->community->id, 
            'prompt' => 'Create a post about dogs', 
            'with_image' => false
        ]);

        OpenAiPostJob::dispatchSync($task);

        $updatedTask = Task::find($task->id);
        
        $post = Post::find($updatedTask->created_id);

        // Assert that the post is not null
        $this->assertNotNull($post, 'Post was not created');
    }

    public function testPostJobFail(): void
    {
        $task = Task::factory()->create([
            'id' => 3, 
            'type' => 'post', 
            'user_id' => $this->user->id, 
            'parent_id' => $this->community->id, 
            'prompt' => 'return me an error please', 
            'with_image' => false
        ]);

        OpenAiPostJob::dispatchSync($task);

        $updatedTask = Task::find($task->id);
        
        $post = Post::find($updatedTask->created_id);

        // Assert that the post is null
        $this->assertNull($post, 'Post was created');
    }

    public function tearDown(): void
    {
        parent::tearDown();

        $this->user->forceDelete();
    }
}
