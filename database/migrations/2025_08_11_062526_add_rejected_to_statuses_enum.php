<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Modify the existing enum to include 'rejected'
        DB::statement("ALTER TABLE statuses MODIFY COLUMN status ENUM('submitted', 'accepted', 'rejected', 'on process', 'done')");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Remove 'rejected' from enum (rollback)
        DB::statement("ALTER TABLE statuses MODIFY COLUMN status ENUM('submitted', 'accepted', 'on process', 'done')");
    }
};
