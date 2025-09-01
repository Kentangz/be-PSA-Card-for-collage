<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('cards', function (Blueprint $table) {
            $table->string('grade_target')->nullable()->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::table('cards')
            ->whereNull('grade_target')
            ->update(['grade_target' => '']);

        Schema::table('cards', function (Blueprint $table) {
            $table->string('grade_target')
                ->default('')
                ->nullable(false)
                ->change();
        });
    }
};
