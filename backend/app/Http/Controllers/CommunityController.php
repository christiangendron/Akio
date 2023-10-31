<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Community;
use App\Http\Resources\CommunityResource;
use App\Http\Requests\CommunityRequest;

class CommunityController extends Controller
{
    public function index()
    {
        $community = Community::all();
        return CommunityResource::collection($community);
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

        return response()->json(["message" => 'Community created'], 201);
    }

    public function destroy(Community $community)
    {
        $this->authorize('destroy', $community);

        $community->delete();
        return response()->json(["message" => 'Community deleted'], 200);
    }
}
