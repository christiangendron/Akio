<?php

namespace App\Jobs;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldBeUnique;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use App\Models\Comment;
use App\Services\OpenAiServices;
use Illuminate\Support\Facades\Validator;

class OpenAiCommentJob implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected $prompt;
    protected $comment_id;
    
    public function __construct($id, $prompt)
    {
        $this->comment_id = $id;
        $this->prompt = $prompt;
    }

    public function handle(): void
    {
        try 
        {
            $res = OpenAiServices::ask($this->prompt);

            $validator = Validator::make($res, [
                'text_content' => 'required',
            ]);
    
            if ($validator->fails()) {
                throw new \Exception('OpenAi did not return the appropriate field');
            }
    
            $validated = $validator->validated();

            $comment = Comment::find($this->comment_id);
            $comment->text_content = $validated['text_content'];
            $comment->status = 'active';
            $comment->save();
        } 
        catch (\Exception $e) 
        {
            $comment = Comment::find($this->comment_id);
            $comment->text_content = 'Generation failed with: ' . $e->getMessage();
            $comment->status = 'failed';
            $comment->save();
        }
    }
}
