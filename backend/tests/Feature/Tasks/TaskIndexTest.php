<?php

namespace Tests\Feature\Tasks;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Task;

class TaskIndexTest extends TestCase
{
    private User $user;
    private User $user2;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->user2 = User::factory()->create();

        $task1 = Task::factory()->create(['id' => 1, 'user_id' => $this->user->id, 'type' => 'post', 'status' => 'pending']);
        $task2 = Task::factory()->create(['id' => 2, 'user_id' => $this->user->id, 'type' => 'comment', 'status' => 'pending']);
    }

    public function testGetTasksNotauth(): void
    {
        $response = $this->json('get', '/api/task');

        $response->assertStatus(401);
    }

    public function testGetTasks(): void
    {
        $response = $this->actingAs($this->user)->json('get', '/api/task');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'type',
                    'parent_id',
                    'inspiration',
                    'with_image',
                    'user_id',
                    'model',
                    'status',
                ]
            ]
        ]);
    }

    public function testGetTasksNotOwner(): void
    {
        $response = $this->actingAs($this->user2)->json('get', '/api/task');

        $response->assertStatus(200);
        $response->assertJsonStructure([
            'data' => []
        ]);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
        $this->user2->forceDelete();
    }
}
