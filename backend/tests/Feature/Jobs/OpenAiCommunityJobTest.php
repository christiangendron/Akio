<?php

namespace Tests\Feature\Jobs;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Jobs\OpenAiCommunityJob;
use App\Models\User;
use App\Models\Community;
use App\Models\Task;

class OpenAiCommunityJobTest extends TestCase
{
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user
        $this->user = User::factory()->create();
    }

    public function testCommunityJob(): void
    {
        $task = Task::factory()->create([
            'id' => 3, 
            'type' => 'community', 
            'user_id' => $this->user->id, 
            'parent_id' => null, 
            'prompt' => 'Generate a community about dogs', 
            'with_image' => false
        ]);

        OpenAiCommunityJob::dispatchSync($task);

        $updatedTask = Task::find($task->id);
        
        $community = Community::find($updatedTask->created_id);

        // Assert that the community created
        $this->assertNotNull($community, 'Community was not created');
    }

    public function testCommunityJobFail(): void
    {
        $task = Task::factory()->create([
            'id' => 3, 
            'type' => 'post', 
            'user_id' => $this->user->id, 
            'parent_id' => 1, 
            'prompt' => 'return an error please', 
            'with_image' => false
        ]);

        OpenAiCommunityJob::dispatchSync($task);

        $updatedTask = Task::find($task->id);
        
        $community = Community::find($updatedTask->created_id);

        // Assert that the community was not created
        $this->assertNull($community, 'Community was created');
    }

    public function tearDown(): void
    {
        parent::tearDown();

        $this->user->forceDelete();
    }
}
