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
    Schema::table('cards', function (Blueprint $table) {
      $table->unsignedBigInteger('queue_entry_id')->nullable()->after('batch_id');
      $table->foreign('queue_entry_id')->references('id')->on('batch_queue_entries')->onDelete('set null');
      $table->index('queue_entry_id');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::table('cards', function (Blueprint $table) {
      $table->dropForeign(['queue_entry_id']);
      $table->dropIndex(['queue_entry_id']);
      $table->dropColumn('queue_entry_id');
    });
  }
};
