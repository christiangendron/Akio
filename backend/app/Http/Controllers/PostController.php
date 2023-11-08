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

class PostController extends Controller
{
    public function index(string $keyword = null)
    {   
        if ($keyword) {
            $post = Post::where('title', 'like', "%{$keyword}%")->orWhere('text_content', 'like', "%{$keyword}%")->get();
            return PostResource::collection($post);
        }

        $post = Post::all();
        return PostResource::collection($post);
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

    public function getPostFromCommunity($community_id, string $keyword = null)
    {
        if ($keyword) {
            $post = Post::where('title', 'like', "%{$keyword}%")->orWhere('text_content', 'like', "%{$keyword}%")->where('community_id', $community_id)->get();
            return PostResource::collection($post);
        }

        $posts = Post::where('community_id', $community_id)->get();
        return PostResource::collection($posts);
    }

    public function getPostFromUser($user_id, string $keyword = null)
    {
        if ($keyword) {
            $post = Post::where('title', 'like', "%{$keyword}%")->orWhere('text_content', 'like', "%{$keyword}%")->where('user_id', $user_id)->get();
            return PostResource::collection($post);
        }

        $posts = Post::where('user_id', $user_id)->get();
        return PostResource::collection($posts);
    }

    public function destroy(Post $post)
    {
        $this->authorize('destroy', $post);

        if ($post->media_url) {
            Storage::disk('public')->delete($post->media_url);
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
            $image = OpenAIController::imagine($imagePrompt);
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
