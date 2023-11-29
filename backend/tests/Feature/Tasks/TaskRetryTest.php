<?php

namespace Tests\Feature\Tasks;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Task;

class TaskRetryTest extends TestCase
{
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();

        $task1 = Task::factory()->create(['id' => 1, 'user_id' => $this->user->id, 'prompt' => 'some text prompt', 'message' => 'Task failed', 'type' => 'post', 'status' => 'failed']);
        $task2 = Task::factory()->create(['id' => 2, 'user_id' => $this->user->id, 'prompt' => 'some text prompt', 'message' => 'Task was a success', 'type' => 'comment', 'status' => 'success']);
    }

    public function testTryToRetryWithoutAuth(): void
    {
        $response = $this->json('post', '/api/task/1/retry');

        $response->assertStatus(401);
    }

    public function testRetryOnSuccessTask(): void
    {
        $response = $this->actingAs($this->user)->json('post', '/api/task/2/retry');

        $response->assertStatus(400);

        $response->assertJsonStructure([
            'message',
            'data' => [
                'id',
                'type',
                'parent_id',
                'prompt',
                'with_image',
                'user_id',
                'message',
                'model',
                'created_id',
                'status',
            ]
        ]);
    }

    public function testRetryTasks(): void
    {
        $response = $this->actingAs($this->user)->json('get', '/api/task/1');

        $response->assertJsonFragment([
            'status' => 'failed'
        ]);

        $response = $this->actingAs($this->user)->json('post', '/api/task/1/retry');

        $response->assertStatus(200);

        $response->assertJsonStructure([
            'message',
            'data' => [
                'id',
                'type',
                'parent_id',
                'prompt',
                'with_image',
                'user_id',
                'message',
                'model',
                'created_id',
                'status',
            ]
        ]);

        $response->assertJsonFragment([
            'status' => 'pending'
        ]);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
