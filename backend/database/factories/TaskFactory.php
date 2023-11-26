<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'type' => $this->faker->randomElement(['post', 'comment', 'community']),
            'parent_id' => $this->faker->numberBetween(1, 100),
            'inspiration' => $this->faker->text(),
            'with_image' => $this->faker->boolean(),
            'user_id' => $this->faker->numberBetween(1, 100),
            'model' => $this->faker->randomElement(['davinci', 'curie', 'babbage']),
            'status' => $this->faker->randomElement(['pending', 'completed']),
        ];
    }
}
