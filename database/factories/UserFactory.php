<?php

namespace Database\Factories;

use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\User>
 */
class UserFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'username' => $this->faker->unique()->userName(),
            'email' => $this->faker->unique()->safeEmail(),
            'email_verified' => true,
            'password' => Hash::make('password123'), 
             'profile_pic' => "https://i.pravatar.cc/150?img=" . $this->faker->numberBetween(1, 70),
            'is_verified' => $this->faker->boolean(50),
            'is_premium' => $this->faker->boolean(70),
        ];
    }
}
