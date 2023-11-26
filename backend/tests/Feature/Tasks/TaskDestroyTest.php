<?php

namespace Tests\Feature\Tasks;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Task;

class TaskDestroyTest extends TestCase
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

    public function testDeleteTaskNotauth(): void
    {
        $response = $this->json('delete', '/api/task/1');

        $response->assertStatus(401);
    }

    public function testDeleteTask(): void
    {
        // Delete a task
        $response = $this->actingAs($this->user)->json('delete', '/api/task/1');

        // Assert that the ressource was deleted
        $response->assertStatus(200);
    }

    public function testDeleteTaskNotOwner(): void
    {
        // Deleting a task that does not belong to the user
        $response = $this->actingAs($this->user2)->json('delete', '/api/task/1');

        // Assert status 403 (Forbidden)
        $response->assertStatus(403);
    }

    public function testDeleteTaskNotFound(): void
    {
        // Deleting a task that does not exist
        $response = $this->actingAs($this->user)->json('delete', '/api/task/3');

        // Assert status 404 (Not found)
        $response->assertStatus(404);
    }

    public function testDeleteTaskAlreadyDeleted(): void
    {
        // Deleting a task that does not exist
        $response = $this->actingAs($this->user)->json('delete', '/api/task/1');

        // Assert that the ressource was deleted
        $response->assertStatus(200);

        // Try to delete it again
        $response = $this->actingAs($this->user)->json('delete', '/api/task/1');

        // Assert that the ressource was deleted
        $response->assertStatus(404);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
        $this->user2->forceDelete();
    }
}
