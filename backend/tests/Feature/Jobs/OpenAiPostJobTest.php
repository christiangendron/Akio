<?php

namespace Tests\Feature\Jobs;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Jobs\OpenAiPostJob;
use App\Models\User;
use App\Models\Community;
use App\Models\Post;

class OpenAiPostJobTest extends TestCase
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
        Post::factory()->create(['id' => 1, 'title' => 'Initial title', 'text_content' => 'Initial text content',  'user_id' => $this->user->id, 'community_id' => 1]);
    }

    public function testPostJob(): void
    {
        $prompt = "Generate a post about dogs";
        $comment_id = 1;
        $with_image = true;

        OpenAiPostJob::dispatchSync($comment_id, $with_image, $prompt);
        
        $post = Post::find($comment_id);

        // Assert that the community was updated
        $this->assertNotEquals('Initial title', $post->title, 'Post title was not updated as expected');
        $this->assertNotEquals('Initial text content', $post->text_content, 'Post text content was not updated as expected');

        // Assert that it has not failed
        $this->assertNotEquals('Generation failed', $post->name, 'Post failed to generate');
    }

    public function testPostJobFail(): void
    {
        $prompt = "return me an error please";
        $comment_id = 1;
        $with_image = false;

        OpenAiPostJob::dispatchSync($comment_id, $with_image, $prompt);
        
        $post = Post::find($comment_id);

        // Assert that the community was updated
        $this->assertNotEquals('Initial title', $post->title, 'Post title was not updated as expected');
        $this->assertNotEquals('Initial text content', $post->text_content, 'Post text content was not updated as expected');

        // Assert that it has not failed
        $this->assertStringStartsWith('Generation failed', $post->title, 'Post title generation failed as expected');
    }

    public function tearDown(): void
    {
        parent::tearDown();

        $this->user->forceDelete();
    }
}
