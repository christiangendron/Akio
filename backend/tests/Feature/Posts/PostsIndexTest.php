<?php

namespace Tests\Feature\Posts;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;
use App\Models\Post;
use App\Models\Community;

class PostsIndexTest extends TestCase
{
    private User $user;

    public function setUp(): void
    {
        parent::setUp();

        // Create a user
        $this->user = User::factory()->create();

        // Create a few communities
        Community::factory()->create([
            'id' => 1, 
            'user_id' => $this->user->id, 
            'name' => 'Test community', 
            'description' => 'This is a test community'
        ]);

        Community::factory()->create([
            'id' => 2, 
            'user_id' => $this->user->id, 
            'name' => 'Community for dogs', 
            'description' => 'This is a test community'
        ]);

        Community::factory()->create([
            'id' => 3, 
            'user_id' => $this->user->id, 
            'name' => 'Community for cats', 
            'description' => 'This is a test community'
        ]);

        // Create 3 posts
        Post::factory()->create([
            'id' => 1, 
            'user_id' => $this->user->id, 
            'title' => 'Test Post', 
            'text_content' => 'This is a test post',
            'community_id' => 1
        ]);

        Post::factory()->create([
            'id' => 2, 
            'user_id' => $this->user->id, 
            'title' => 'Test Post', 
            'text_content' => 'I love dogs',
            'community_id' => 2
        ]);

        Post::factory()->create([
            'id' => 3, 
            'user_id' => $this->user->id, 
            'title' => 'Test Post', 
            'text_content' => 'I love cats',
            'community_id' => 3
        ]);
    }

    public function testGetAllPosts()
    {
        // Get all posts
        $response = $this->json('get', '/api/post/');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
    }

    public function testGetAllPostsWithKeyword()
    {
        // Get all posts with keyword dogs
        $response = $this->json('get', '/api/post/?keyword=dog');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');

        // Get all posts with keyword cats
        $response = $this->json('get', '/api/post/?keyword=cats');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
    }

    public function testGetPostsFromCommunity()
    {
        // Get all posts from community 1
        $response = $this->json('get', '/api/post/community/1');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');

        // Get all posts from community 2
        $response = $this->json('get', '/api/post/community/2');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');

        // Get all posts from community 3
        $response = $this->json('get', '/api/post/community/3');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
    }

    public function testGetPostsFromCommunityWithKeyword()
    {
        // Get all posts from community 1
        $response = $this->json('get', '/api/post/community/1/?keyword=dog');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(0, 'data');

        // Get all posts from community 2
        $response = $this->json('get', '/api/post/community/2/?keyword=dog');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');

        // Get all posts from community 3
        $response = $this->json('get', '/api/post/community/3/?keyword=dog');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(0, 'data');
    }

    public function testGetPostsFromUser()
    {
        // Get all posts from user
        $response = $this->json('get', '/api/post/user/' . $this->user->id);

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
    }

    public function testGetPostsFromUserWithKeyword()
    {
        // Get all posts from user
        $response = $this->json('get', '/api/post/user/' . $this->user->id . '/?keyword=dog');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');

        // Get all posts from user
        $response = $this->json('get', '/api/post/user/' . $this->user->id . '/?keyword=cats');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(1, 'data');
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
