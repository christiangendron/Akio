<?php

namespace Tests\Feature\OpenAi;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Services\OpenAiServices;

class OpenAiAskTest extends TestCase
{
    public function testAskGeneratePost()
    {
        // Make a ask request to openAI
        $response = OpenAiServices::ask("Generate a post on the topic of dogs");

        // Assert that the response has the correct properties
        $this->assertTrue(isset($response['title']));
        $this->assertTrue(isset($response['text_content']));
        $this->assertFalse(isset($response['description']));
    }

    public function testAskGenerateCommunity()
    {
        // Make a ask request to openAI
        $response = OpenAiServices::ask("Generate a community on the topic of dogs");

        // Assert that the response has the correct properties
        $this->assertTrue(isset($response['name']));
        $this->assertTrue(isset($response['description']));
        $this->assertFalse(isset($response['title']));
    }

    public function testAskGenerateComment()
    {
        // Make a ask request to openAI
        $response = OpenAiServices::ask("Generate a comment on the topic of dogs");

        // Assert that the response has the correct properties
        $this->assertTrue(isset($response['text_content']));
        $this->assertFalse(isset($response['title']));
    }
}
