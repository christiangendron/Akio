<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Saved;
use App\Http\Resources\PostResource;
use Illuminate\Support\Facades\DB;
use App\Models\Post;
use App\Http\Requests\SavedRequest;
use App\Helpers\QueryBuilder;

class SavedController extends Controller
{
    public function index(Request $request)
    {
        // get the user
        $user = auth()->user();

        // Create a query
        $query = $user->savedPosts();

        // Add the where clause for the user
        $query->where('saved.user_id', $user->id);

        // Send it to the QueryBuilder for the orderby/keyword
        QueryBuilder::post($query, $request);
        
        // Execute the query
        $posts = $query->get();

        // Create the collection and return it
        return PostResource::collection($posts);
    }
    
    public function store(Post $post)
    {
        $isUnique = Saved::where(['post_id' => $post->id,'user_id' => auth()->id()])->doesntExist();

        if (!$isUnique) {
            return response()->json(['message' => 'This post is already saved'], 422);
        }

        $saved = new Saved;
        $saved->post_id = $post->id;
        $saved->user_id = auth()->id();
        $saved->save();

        return response()->json(['message' => 'Post saved'])->setStatusCode(201);
    }

    public function destroy(Post $post)
    {
        // Create the query
        $query = Saved::query();

        // Add the where clause for the post
        $query->where('post_id', $post->id);

        // Add the where clause for the user
        $query->where('user_id', auth()->user()->id);

        // Delete the saved post
        $effectedRows = $query->delete();

        if ($effectedRows === 0) {
            return response()->json(['message' => 'The ressource does not exist'], 404);
        }

        return response()->json(['message' => 'Unsaved'])->setStatusCode(200);
    }
}
