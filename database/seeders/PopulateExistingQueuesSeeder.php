<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\UserBatchQueue;

class PopulateExistingQueuesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $userBatches = DB::table('cards')
            ->select(
                'user_id',
                'batch_id',
                DB::raw('MIN(created_at) as first_submission')
            )
            ->whereNotNull('batch_id')
            ->groupBy('user_id', 'batch_id')
            ->orderBy('batch_id')
            ->orderBy('first_submission')
            ->get();

        $batchGroups = $userBatches->groupBy('batch_id');

        foreach ($batchGroups as $batchId => $users) {
            $queueOrder = 1;

            foreach ($users as $user) {
                $existingQueue = UserBatchQueue::where('user_id', $user->user_id)
                    ->where('batch_id', $user->batch_id)
                    ->first();

                if (!$existingQueue) {
                    UserBatchQueue::create([
                        'user_id' => $user->user_id,
                        'batch_id' => $user->batch_id,
                        'queue_order' => $queueOrder
                    ]);
                }

                $queueOrder++;
            }
        }

        $this->command->info('User batch queues populated successfully!');
    }
}
