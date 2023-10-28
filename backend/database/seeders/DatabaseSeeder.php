<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // \App\Models\User::factory(10)->create();

        \App\Models\User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
        ]);

        \App\Models\Community::factory()->create([
            'name' => 'Cats',
            'description' => 'A place for cats',
            'user_id' => 1,
        ]);

        \App\Models\Post::factory()->create([
            'title' => 'Cute cats',
            'text_content' => 'They are the best',
            'media_url' => 'null',
            'user_id' => 1,
            'community_id' => 1,
        ]);
    }
}
