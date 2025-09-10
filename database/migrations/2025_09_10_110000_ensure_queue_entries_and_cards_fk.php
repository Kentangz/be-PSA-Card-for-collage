<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
  public function up(): void
  {
    if (!Schema::hasTable('batch_queue_entries')) {
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

    if (Schema::hasTable('cards') && !Schema::hasColumn('cards', 'queue_entry_id')) {
      Schema::table('cards', function (Blueprint $table) {
        $table->unsignedBigInteger('queue_entry_id')->nullable()->after('batch_id');
        $table->foreign('queue_entry_id')->references('id')->on('batch_queue_entries')->onDelete('set null');
        $table->index('queue_entry_id');
      });
    }

    // Basic backfill if legacy user_batch_queues exists and cards.queue_entry_id is null
    if (Schema::hasTable('user_batch_queues')) {
      $legacy = DB::table('user_batch_queues')
        ->select('user_id', 'batch_id', 'queue_order')
        ->orderBy('batch_id')->orderBy('queue_order')->get();
      foreach ($legacy as $row) {
        $entryId = DB::table('batch_queue_entries')->insertGetId([
          'batch_id' => $row->batch_id,
          'user_id' => $row->user_id,
          'queue_order' => $row->queue_order,
          'payment_url' => null,
          'is_sent' => false,
          'created_at' => now(),
          'updated_at' => now(),
        ]);
        DB::table('cards')
          ->where('batch_id', $row->batch_id)
          ->where('user_id', $row->user_id)
          ->whereNull('queue_entry_id')
          ->update(['queue_entry_id' => $entryId]);
      }
    }
  }

  public function down(): void
  {
    
  }
};
