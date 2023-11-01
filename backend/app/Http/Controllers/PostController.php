<?php

namespace App\Http\Controllers;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Requests\PostRequest;
use App\Http\Resources\PostResource;
use App\Models\Community;
use App\Http\Controllers\OpenAIController;
use Illuminate\Support\Facades\Storage;

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

        return response()->json(["message" => 'Post created'], 201);
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

    public function show(Post $post)
    {
        return response()->json($post, 200);
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

    public function generate(Community $community, string $keyword = null)
    {   
        $prompt = 'Create a post in the style of a Reddit post for this community' . $community['name'];

        if ($keyword) {
            $prompt = $prompt . 'With an emphasis on : ' . $keyword;
        }

        $res = OpenAIController::ask($prompt);

        try {
            $post = new Post;
            $post->title = json_decode($res)->title;
            $post->text_content = json_decode($res)->text_content;
            $image = null;

            if (json_decode($res)->has_media) {
                $imagePrompt = 'Create an image for this message' . json_decode($res)->text_content;
                $image = OpenAIController::imagine($imagePrompt);
            }

            $post->media_url = $image;
            $post->user_id = auth()->user()->id;
            $post->community_id = $community['id'];
            $post->save();
        } catch (Exception $e) {
            return response()->json(["message" => 'Post generation failed'], 500);
        }
        
        return response()->json(["message" => 'Post generated'], 201);
    }
}
