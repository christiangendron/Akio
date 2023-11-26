<?php

namespace Tests\Feature\Tasks;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class TaskStoreTest extends TestCase
{
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
    }

    public function testCreateTaskNotauth(): void
    {
        $response = $this->json('post', '/api/task');

        $response->assertStatus(401);
    }

    public function testCreateTask(): void
    {
        $response = $this->actingAs($this->user)->json('post', '/api/task', [
            'type' => 'post',
            'parent_id' => 1,
            'inspiration' => 'This is a test',
            'with_image' => false,
            'model' => 'davinci',
        ]);

        $response->assertStatus(201);
        $response->assertJsonStructure([
            'message',
            'data' => [
                'id',
                'type',
                'parent_id',
                'inspiration',
                'with_image',
                'user_id',
                'model',
                'status',
            ]
        ]);
    }

    public function testStoreWithMissingField(): void
    {
        $response = $this->actingAs($this->user)->json('post', '/api/task', [
            'type' => 'post',
        ]);

        $response->assertStatus(201);
    }

    public function testStoreWithRequiredMissingField(): void
    {
        $response = $this->actingAs($this->user)->json('post', '/api/task', [
            'parent_id' => 1,
            'inspiration' => 'This is a test',
            'with_image' => false,
            'model' => 'davinci',
        ]);

        $response->assertStatus(422);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
