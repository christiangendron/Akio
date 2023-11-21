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
            'community_id' => 1,
            'created_at' => '2021-01-01 00:00:00',
        ]);

        Post::factory()->create([
            'id' => 2, 
            'user_id' => $this->user->id, 
            'title' => 'Test Post', 
            'text_content' => 'I love dogs',
            'community_id' => 2,
            'created_at' => '2022-01-01 00:00:00',
        ]);

        Post::factory()->create([
            'id' => 3, 
            'user_id' => $this->user->id, 
            'title' => 'Test Post', 
            'text_content' => 'I love cats',
            'community_id' => 3,
            'created_at' => '2023-01-01 00:00:00',
        ]);
    }

    public function testGetAllPosts()
    {
        // Get all posts
        $response = $this->json('get', '/api/post/');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');

        // Assert the json structure
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'text_content',
                    'media_url',
                    'user_id',
                    'username',
                    'community_id',
                    'community_name',
                ]
            ]
        ]);
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

        // Get all posts with keyword giraffe
        $response = $this->json('get', '/api/post/?keyword=giraffe');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(0, 'data');
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

    public function testGetPostsWithOrderBy()
    {
        // Get all posts by old
        $response = $this->json('get', '/api/post/?order_by=old');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
        $response->assertJsonPath('data.0.id', 1);
        $response->assertJsonPath('data.1.id', 2);
        $response->assertJsonPath('data.2.id', 3);

        // Get all posts by new
        $response = $this->json('get', '/api/post/?order_by=created_at&direction=desc');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
        $response->assertJsonPath('data.0.id', 3);
        $response->assertJsonPath('data.1.id', 2);
        $response->assertJsonPath('data.2.id', 1);
    }

    public function testGetPostsFromUser()
    {
        // Get all posts from user
        $response = $this->json('get', '/api/post/user/' . $this->user->id);

        // Expect a 200 response
        $response->assertStatus(200);

        // Expect 3 posts
        $response->assertJsonCount(3, 'data');

        // Assert the json structure
        $response->assertJsonStructure([
            'data' => [
                '*' => [
                    'id',
                    'title',
                    'text_content',
                    'media_url',
                    'user_id',
                    'username',
                    'community_id',
                    'community_name',
                ]
            ]
        ]);
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

    public function testGetPostsOrderBy()
    {
        // Get all posts from user
        $response = $this->json('get', '/api/post/?order_by=old');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
        $response->assertJsonPath('data.0.id', 1);
        $response->assertJsonPath('data.1.id', 2);
        $response->assertJsonPath('data.2.id', 3);

        // Get all posts from user
        $response = $this->json('get', '/api/post/?order_by=new');

        // Expect a 200 response and validate the response JSON data
        $response->assertStatus(200);
        $response->assertJsonCount(3, 'data');
        $response->assertJsonPath('data.0.id', 3);
        $response->assertJsonPath('data.1.id', 2);
        $response->assertJsonPath('data.2.id', 1);
    }

    public function tearDown(): void
    {
        $this->user->forceDelete();
    }
}
