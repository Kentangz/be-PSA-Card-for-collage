<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
  public function up(): void
  {
    if (!DB::getSchemaBuilder()->hasTable('user_batch_queues')) {
      return;
    }

    $legacyQueues = DB::table('user_batch_queues')
      ->select('user_id', 'batch_id', 'queue_order')
      ->orderBy('batch_id')
      ->orderBy('queue_order')
      ->get();

    foreach ($legacyQueues as $legacy) {
      $entryId = DB::table('batch_queue_entries')->insertGetId([
        'batch_id' => $legacy->batch_id,
        'user_id' => $legacy->user_id,
        'queue_order' => $legacy->queue_order,
        'payment_url' => null,
        'is_sent' => false,
        'created_at' => now(),
        'updated_at' => now(),
      ]);

      if (DB::getSchemaBuilder()->hasTable('batch_payments')) {
        $payment = DB::table('batch_payments')
          ->where('batch_id', $legacy->batch_id)
          ->where('user_id', $legacy->user_id)
          ->first();
        if ($payment) {
          DB::table('batch_queue_entries')
            ->where('id', $entryId)
            ->update([
              'payment_url' => $payment->payment_url,
              'is_sent' => (bool) $payment->is_sent,
            ]);
        }
      }

      DB::table('cards')
        ->where('batch_id', $legacy->batch_id)
        ->where('user_id', $legacy->user_id)
        ->whereNull('queue_entry_id')
        ->update(['queue_entry_id' => $entryId]);
    }
  }

  public function down(): void
  {
    // No-op backfill rollback
  }
};
