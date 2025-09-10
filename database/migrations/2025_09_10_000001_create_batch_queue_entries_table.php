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
    Schema::create('batch_queue_entries', function (Blueprint $table) {
      $table->id();
      $table->unsignedBigInteger('batch_id');
      $table->unsignedBigInteger('user_id');
      $table->integer('queue_order');
      $table->text('payment_url')->nullable();
      $table->boolean('is_sent')->default(false);
      $table->timestamps();

      $table->foreign('batch_id')->references('id')->on('batches')->onDelete('cascade');
      $table->foreign('user_id')->references('id')->on('users')->onDelete('cascade');

      $table->index(['batch_id', 'queue_order']);
      $table->index('user_id');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('batch_queue_entries');
  }
};
