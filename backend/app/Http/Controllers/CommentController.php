<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Resources\CommentResource;
use App\Http\Requests\CommentRequest;
use App\Models\Post;
use Illuminate\Support\Facades\Validator;
use App\Services\OpenAiServices;

class CommentController extends Controller
{
    public function store(CommentRequest $commentRequest, Post $post)
    {
        $request = $commentRequest->validated();

        $comment = new Comment;
        $comment->text_content = $request['text_content'];
        $comment->user_id = auth()->user()->id;
        $comment->post_id = $post['id'];
        $comment->save();

        return response()->json(["message" => 'Comment created', "data" => CommentResource::make($comment)], 201);
    }
    
    public function getCommentsByPostId(Post $post)
    {
        // Create the query
        $query = $post->comments();

        // Load user for the relation to be loaded
        $query->with('user');

        // Execute the query
        $comments = $query->get();

        return CommentResource::collection($comments);
    }

    public function destroy(Comment $comment)
    {
        $this->authorize('destroy', $comment);

        $comment->delete();
        return response()->json(["message" => 'Comment deleted'], 200);
    }

    public function generate(Request $request, Post $post)
    {
        $prompt = 'Generate a unique (catchy, relevant) and creative comment for this post' . $post['text_content'];

        if ($request->inspiration) {
            $prompt = $prompt . 'With an emphasis on : ' . $request->inspiration;
        }

        $res = OpenAiServices::ask($prompt);

        $validator = Validator::make($res, [
            'text_content' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(["message" => 'OpenAi did not return the appropriate field'], 422);
        }

        $validated = $validator->validated();

        $comment = new Comment;
        $comment->text_content = $validated['text_content'];
        $comment->user_id = auth()->user()->id;
        $comment->post_id = $post['id'];
        $comment->save();
        
        return response()->json(["message" => 'Comment generated', "data" => CommentResource::make($comment)], 201);
    }
}
