<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Community;
use App\Http\Resources\CommunityResource;
use App\Http\Requests\CommunityRequest;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use App\Models\Post;
use App\Jobs\OpenAiCommunityJob;

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
        $community->status = 'active';
        $community->save();

        return response()->json(["message" => 'Community created', "data" => CommunityResource::make($community)], 201);
    }

    public function destroy(Community $community)
    {
        $this->authorize('destroy', $community);

        // Get all posts from this community to delete their images
        $posts = $community->posts;

        foreach ($posts as $post) {
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
}
