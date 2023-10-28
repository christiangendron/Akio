<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use Illuminate\Http\Request;
use App\Http\Resources\CommentResource;
use App\Http\Requests\CommentRequest;
use App\Models\Post;

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

        return response()->json(["message" => 'Comment created'], 201);
    }
    
    public function getCommentByPostId($id)
    {
        $comments = Comment::where('post_id', $id)->get();
        return CommentResource::collection($comments);
    }

    public function destroy(Comment $comment)
    {
        $comment->delete();
        return response()->json(["message" => 'Comment deleted'], 200);
    }
}
