<?php

namespace Tests\Feature\Tasks;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Community;
use App\Models\Post;

class TaskStoreTest extends TestCase
{
    private User $user;
    private Community $community;
    private Post $post;

    public function setUp(): void
    {
        parent::setUp();

        $this->user = User::factory()->create();
        $this->community = Community::factory(['user_id' => $this->user->id])->create();
        $this->post = Post::factory()->create(['user_id' => $this->user->id, 'community_id' => $this->community->id]);
    }

    public function testCreateTaskNotauth(): void
    {
        $response = $this->json('post', '/api/task');

        $response->assertStatus(401);
    }

    public function testStoreTaskCommunity(): void
    {
        $response = $this->actingAs($this->user)->json('post', '/api/task', [
            'type' => 'community',
        ]);

        $response->assertStatus(201);
    }

    public function testStoreTaskPost(): void
    {
        $response = $this->actingAs($this->user)->json('post', '/api/task', [
            'type' => 'post',
            'parent_id' => $this->community->id,
        ]);

        $response->assertStatus(201);
    }

    public function testStoreTaskComment(): void
    {
        $response = $this->actingAs($this->user)->json('post', '/api/task', [
            'type' => 'comment',
            'parent_id' => $this->post->id,
        ]);

        $response->assertStatus(201);
    }

    public function testStoreTaskPostNoParentId(): void
    {
        $response = $this->actingAs($this->user)->json('post', '/api/task', [
            'type' => 'post',
        ]);

        $response->assertStatus(422);
    }

    public function testStoreTaskCommentNoParentId(): void
    {
        $response = $this->actingAs($this->user)->json('post', '/api/task', [
            'type' => 'comment',
        ]);

        $response->assertStatus(422);
    }

    public function testStoreWithoutType(): void
    {
        $response = $this->actingAs($this->user)->json('post', '/api/task');

        $response->assertStatus(422);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
