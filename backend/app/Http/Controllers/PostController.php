<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Community;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use App\Helpers\QueryBuilder;
use App\Jobs\OpenAiPostJob;

class PostController extends Controller
{
    public function index(Request $request, Community $community = null, User $user = null)
    {     
        // Create a query
        $query = Post::query();

        // Send it to the QueryBuilder
        QueryBuilder::post($query, $request, $community, $user);
    
        // Execute the query
        $posts = $query->get();

        // Create the collection and return it
        return PostResource::collection($posts);
    }

    public function store(PostRequest $postRequest, Community $community)
    {
        $request = $postRequest->validated();

        $post = new Post;
        $post->title = $request['title'];
        $post->text_content = $request['text_content'];
        $post->media_url = $request['media_url'];
        $post->user_id = auth()->user()->id;
        $post->community_id = $community['id'];
        $post->status = 'active';
        $post->save();

        return response()->json(["message" => 'Post created', "data" => PostResource::make($post)], 201);
    }

    public function destroy(Post $post)
    {
        $this->authorize('destroy', $post);

        if ($post->media_url) {
            Storage::disk('public')->delete($post->media_url);
            Storage::disk('public')->delete('sm-' . $post->media_url);
            Storage::disk('public')->delete('md-' . $post->media_url);
        }
        
        $post->delete();
        return response()->json(["message" => 'Post deleted'], 200);
    }
}
