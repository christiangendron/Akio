<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Community;
use App\Http\Resources\CommunityResource;
use App\Http\Requests\CommunityRequest;
use App\Http\Controllers\OpenAIController;

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

    public function generate(string $keyword = null)
    {   
        $prompt = 'Generate a community with a unique and creative name and description. The name should be catchy, relevant, and appealing to potential users.';

        if ($keyword) {
            $prompt = $prompt . 'On the topic of : ' . $keyword;
        }

        $res = OpenAIController::ask($prompt);

        try {
            $community = new Community;
            $community->name = json_decode($res)->name;
            $community->description = json_decode($res)->description;
            $community->user_id = auth()->id();
            $community->save();
        } catch (Exception $e) {
            return response()->json(["message" => 'Community generation failed'], 500);
        }
        
        return response()->json(["message" => 'Community generated'], 201);
    }
}
