<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Config;

class OpenAIController extends Controller
{
    public static function ask($prompt)
    {
        $messages = [
            [
                "role" => "user",
                "content" => $prompt
            ]
        ];

        $functions = OpenAIController::getFunctions();
    
        $response = Http::accept('application/json')
            ->withToken(config('env.OPENAI_API_KEY'))
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-3.5-turbo',
                'messages' => $messages,
                'functions' => $functions,
            ]);
            
        $parsedData = json_decode($response);

        return $parsedData->choices[0]->message->function_call->arguments;
    }

    private static function getFunctions()
    {
        return [
            [
                "name" => "generate_community",
                "description" => "Function to create a new community",
                "parameters" => [
                    "type" => "object",
                    "properties" => [
                        "name" => [
                            "type" => "string",
                            "description" => "Name of the community",
                        ],
                        "description" => [
                            "type" => "string",
                            "description" => "Description of the community (max 250 char)",
                        ],
                    ],
                ],
            ],
            [
                "name" => "generate_post",
                "description" => "Function to create a new post message",
                "parameters" => [
                    "type" => "object",
                    "properties" => [
                        "title" => [
                            "type" => "string",
                            "description" => "Title of the post",
                        ],
                        "text_content" => [
                            "type" => "string",
                            "description" => "Text content of the post related to the community",
                        ],
                        "has_media" => [
                            "type" => "boolean",
                            "description" => "Does it make sense for this post to contain an image",
                        ],
                    ],
                ],
            ]
        ];
    }
}
