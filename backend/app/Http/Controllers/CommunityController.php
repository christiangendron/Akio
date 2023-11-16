<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Community;
use App\Http\Resources\CommunityResource;
use App\Http\Requests\CommunityRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Post;
use App\Services\OpenAiServices;

class CommunityController extends Controller
{
    public function index()
    {
        $community = Community::all();
        return CommunityResource::collection($community);
    }

    public function getCommunityById(Community $community)
    {
        return CommunityResource::make($community);
    }

    public function store(CommunityRequest $communityRequest)
    {   
        $request = $communityRequest->validated();

        if (Community::where("name", $request['name'])->exists()) {
            return response()->json(["message" => 'Community already exists'], 409);
        }

        $community = new Community;
        $community->name = $request['name'];
        $community->description = $request['description'];
        $community->user_id = auth()->id();
        $community->save();

        return response()->json(["message" => 'Community created', "data" => CommunityResource::make($community)], 201);
    }

    public function destroy(Community $community)
    {
        $this->authorize('destroy', $community);

        // Get all posts from this community to delete their images
        $posts = $community->posts;

        foreach ($posts as $post) {
            error_log($post->media_url);
            Storage::disk('public')->delete($post->media_url);
            Storage::disk('public')->delete('sm-' . $post->media_url);
            Storage::disk('public')->delete('md-' . $post->media_url);
        }

        if ($community->media_url) {
            Storage::disk('public')->delete($community->media_url);
            Storage::disk('public')->delete('sm-' . $community->media_url);
            Storage::disk('public')->delete('md-' . $community->media_url);
        }

        $community->delete();
        return response()->json(["message" => 'Community deleted'], 200);
    }

    public function generate(Request $request)
    {   
        $prompt = 'Generate a community with a unique and creative name and description. The name should be catchy, relevant, and appealing to potential users.';

        if ($request->inspiration) {
            $prompt = $prompt . 'On the topic of : ' . $request->inspiration;
        }

        $res = OpenAiServices::ask($prompt);

        $validator = Validator::make($res, [
            'name' => 'required',
            'description' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(["message" => 'OpenAi did not return the appropriate field'], 422);
        }

        $validated = $validator->validated();

        $image = null;

        if ($request->with_image) {
            $imagePrompt = 'Create a clean, simple and logo for this community with a strong focus to the center of the image on the following topic :' . $validated['description'];
            $image = OpenAiServices::imagine($imagePrompt, "dall-e-3", "1024x1024");
        }

        $community = new Community;
        $community->name = $validated['name'];
        $community->description = $validated['description'];
        $community->media_url = $image;
        $community->user_id = auth()->id();
        $community->save();
        
        return response()->json(["message" => 'Community generated', "data" => CommunityResource::make($community)], 201);
    }
}
