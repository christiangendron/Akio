<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Resources\CommentResource;
use App\Http\Requests\CommentRequest;
use App\Models\Post;
use App\Jobs\OpenAiCommentJob;

class CommentController extends Controller
{
    public function store(CommentRequest $commentRequest, Post $post)
    {
        $request = $commentRequest->validated();

        $comment = new Comment;
        $comment->text_content = $request['text_content'];
        $comment->user_id = auth()->user()->id;
        $comment->post_id = $post['id'];
        $comment->status = 'active';
        $comment->save();

        return response()->json(["message" => 'Comment created', "data" => CommentResource::make($comment)], 201);
    }
    
    public function getCommentsByPostId(Post $post)
    {
        $query = $post->comments();

        $query->with('user');

        $comments = $query->get();

        return CommentResource::collection($comments);
    }

    public function destroy(Comment $comment)
    {
        $this->authorize('destroy', $comment);

        $comment->delete();
        return response()->json(["message" => 'Comment deleted'], 200);
    }
}
