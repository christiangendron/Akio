<?php

namespace Tests\Feature\Jobs;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Jobs\OpenAiCommunityJob;
use App\Models\User;
use App\Models\Community;

class OpenAiCommunityJobTest extends TestCase
{
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user
        $this->user = User::factory()->create();

        // Create a community
        Community::factory()->create(['id' => 1, 'name' => 'Initial title', 'user_id' => $this->user->id, 'description' => 'Initial description']);
    }

    public function testCommunityJob(): void
    {
        $prompt = "Generate a community about dogs";
        $community_id = 1;
        $with_image = true;

        OpenAiCommunityJob::dispatchSync($community_id, $with_image, $prompt);
        
        $community = Community::find($community_id);

        // Assert that the community was updated
        $this->assertNotEquals('Initial title', $community->name, 'Community name was not updated as expected');
        $this->assertNotEquals('Initial description', $community->description, 'Community description was not updated as expected');

        // Assert that it has not failed
        $this->assertNotEquals('Generation failed', $community->name, 'Community name failed to generate');
    }

    public function testCommunityJobFail(): void
    {
        $prompt = "return me an error please";
        $community_id = 1;
        $with_image = false;

        OpenAiCommunityJob::dispatchSync($community_id, $with_image, $prompt);
        
        $community = Community::find($community_id);

        // Assert that the community was updated
        $this->assertNotEquals('Initial title', $community->name, 'Community name was not updated as expected');
        $this->assertNotEquals('Initial description', $community->description, 'Community description was not updated as expected');
                
        // Assert that it has failed
        $this->assertEquals('Generation failed', $community->name, 'Community name failed to generate');
    }

    public function tearDown(): void
    {
        parent::tearDown();

        $this->user->forceDelete();
    }
}
