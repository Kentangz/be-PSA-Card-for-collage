<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  public function up(): void
  {
    if (Schema::hasTable('user_batch_queues')) {
      Schema::drop('user_batch_queues');
    }
    if (Schema::hasTable('batch_payments')) {
      Schema::drop('batch_payments');
    }
  }

  public function down(): void
  {
    
  }
};
