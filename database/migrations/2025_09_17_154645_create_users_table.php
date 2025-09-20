<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('users', function (Blueprint $table) {
            $table->id();
            $table->string('google_id', 255)->nullable()->unique();
            $table->string('name', 100);
            $table->string('username', 50)->unique();
            $table->string('email', 150);
            $table->boolean('email_verified')->default(false);
            $table->string('password', 255);
            $table->string('profile_pic', 255)->nullable();
            $table->boolean('is_verified')->default(false);
            $table->boolean('is_premium')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
