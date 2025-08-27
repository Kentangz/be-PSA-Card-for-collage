<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('batches', function (Blueprint $table) {
            $table->id();
            $table->string('batch_number')->unique(); // "Batch 1", "Batch 2", etc
            $table->string('register_number')->unique(); // "B1ABC123"
            $table->text('services'); // deskripsi batch
            $table->enum('category', ['PSA-Japan', 'PSA-USA', 'CGC']);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('batches');
    }
};
