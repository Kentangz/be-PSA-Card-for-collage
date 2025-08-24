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
        DB::statement("ALTER TABLE statuses MODIFY COLUMN status ENUM(
            'submit',
            'rejected',
            'received_by_us',
            'data_input',
            'delivery_to_jp',
            'received_by_jp_wh',
            'delivery_to_psa',
            'psa_arrival_of_submission',
            'psa_order_processed',
            'psa_research',
            'psa_grading',
            'psa_holder_sealed',
            'psa_qc',
            'psa_grading_completed',
            'psa_completion',
            'delivery_to_jp_wh',
            'waiting_to_delivery_to_id',
            'delivery_process_to_id',
            'received_by_wh_id',
            'payment_request',
            'delivery_to_customer',
            'received_by_customer',
            'done'
        )");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("ALTER TABLE statuses MODIFY COLUMN status ENUM(
            'submit',
            'received_by_us',
            'data_input',
            'delivery_to_jp',
            'received_by_jp_wh',
            'delivery_to_psa',
            'psa_arrival_of_submission',
            'psa_order_processed',
            'psa_research',
            'psa_grading',
            'psa_holder_sealed',
            'psa_qc',
            'psa_grading_completed',
            'psa_completion',
            'delivery_to_jp_wh',
            'waiting_to_delivery_to_id',
            'delivery_process_to_id',
            'received_by_wh_id',
            'payment_request',
            'delivery_to_customer',
            'received_by_customer',
            'done'
        )");
    }
};
