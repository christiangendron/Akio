<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Community;
use App\Http\Controllers\OpenAIController;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use App\Models\User;

class PostController extends Controller
{
    public function index(Request $request, Community $community = null, User $user = null)
    {     
        // Get the keyword from the request
        $keyword = $request->get('keyword');

        // Get the order_by and direction from the request or set default values
        $order_by = $request->get('order_by') ?? 'created_at';
        $direction = $request->get('direction') ?? 'asc';

        // Create a query
        $query = Post::query();

        // If there is a keyword, add a where clause
        if ($keyword) {
            $query->where('title', 'like', "%{$keyword}%")->orWhere('text_content', 'like', "%{$keyword}%");
        }

        // Add order by clause with provided values or default values
        $query->orderBy($order_by, $direction);

        // If there is a community_id, add a where clause
        if ($community) {
            $query->where('community_id', $community['id']);
        }

        // If there is a user_id, add a where clause
        if ($user) {
            $query->where('user_id', $user['id']);
        }
        
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

    public function generate(Request $request, Community $community)
    {      
        $prompt = 'Generate a post in the style of a Reddit post for this community' . $community['name'];

        if ($request->inspiration) {
            $prompt = $prompt . 'With an emphasis on : ' . $request->inspiration;
        }

        if ($request->with_image) {
            $prompt = $prompt . 'This post will be coupled with an image.';
        } else {
            $prompt = $prompt . 'This post will not contain an image.';
        }

        $res = OpenAIController::ask($prompt);

        $validator = Validator::make($res, [
            'title' => 'required',
            'text_content' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(["message" => 'OpenAi did not return the appropriate field'], 422);
        }

        $validated = $validator->validated();

        $image = null;

        if ($request->with_image) {
            $imagePrompt = 'Create an fictional image inspired by this message' . $validated['text_content'];
            $image = OpenAIController::imagine($imagePrompt, "dall-e-3", "1024x1024");
        }

        $post = new Post;
        $post->title = $validated['title'];
        $post->text_content = $validated['text_content'];
        $post->media_url = $image;
        $post->user_id = auth()->user()->id;
        $post->community_id = $community['id'];
        $post->save();
        
        return response()->json(["message" => 'Post generated', 'data' => PostResource::make($post)], 201);
    }
}
