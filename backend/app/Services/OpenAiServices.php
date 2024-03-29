<?php

namespace App\Services;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use App\Services\ImageServices;
use GuzzleHttp\Client;
use Config;

class OpenAiServices
{
    public static function ask($prompt)
    {
        $messages = [
            [
                "role" => "user",
                "content" => $prompt
            ]
        ];

        $functions = OpenAiServices::getFunctions();
        
        $response = Http::accept('application/json')
            ->withToken(config('env.OPENAI_API_KEY'))
            ->post('https://api.openai.com/v1/chat/completions', [
                'model' => 'gpt-3.5-turbo',
                'messages' => $messages,
                'functions' => $functions,
            ]);

        if ($response->status() != 200) {
            throw new \Exception('The OpenAi request (ask) failed with status ' . $response->status());
        }
            
        $parsedData = json_decode($response)->choices[0]->message->function_call->arguments;

        return json_decode($parsedData, true);
    }

    public static function imagine($prompt, $model, $size)
    {
        $response = Http::accept('application/json')
        ->withToken(config('env.OPENAI_API_KEY'))
        ->post('https://api.openai.com/v1/images/generations', [
            "model" => $model,
            'prompt' => $prompt,
            'n' => 1,
            'size'=> $size,
        ]);

        if ($response->status() != 200) {
            throw new \Exception('The OpenAi request (imagine) failed with status ' . $response->status());
        }
        
        $parsedData = json_decode($response);

        return ImageServices::downloadImage($parsedData->data[0]->url);
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
                    ],
                ],
            ],
            [
                "name" => "generate_comment",
                "description" => "Function to create a new comment",
                "parameters" => [
                    "type" => "object",
                    "properties" => [
                        "text_content" => [
                            "type" => "string",
                            "description" => "The content of the comment",
                        ],
                    ],
                ],
            ]
        ];
    }
}
