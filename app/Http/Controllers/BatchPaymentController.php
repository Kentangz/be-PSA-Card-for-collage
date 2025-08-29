<?php

namespace App\Http\Controllers;

use App\Models\BatchPayment;
use App\Models\Batch;
use App\Models\Card;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class BatchPaymentController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $request->validate([
            'batch_id' => 'required|exists:batches,id',
            'user_id' => 'required|exists:users,id',
            'payment_url' => 'required|string|url',
            'submission_ids' => 'sometimes|array',
            'submission_ids.*' => 'exists:cards,id',
        ]);

        try {
            $batchPayment = BatchPayment::where('batch_id', $request->batch_id)
                ->where('user_id', $request->user_id)
                ->first();

            if ($batchPayment) {
                $batchPayment->update([
                    'payment_url' => $request->payment_url,
                    'is_sent' => false,
                    'sent_at' => null,
                ]);
            } else {
                // Create new batch payment
                $batchPayment = BatchPayment::create([
                    'batch_id' => $request->batch_id,
                    'user_id' => $request->user_id,
                    'payment_url' => $request->payment_url,
                ]);
            }
            $batchPayment->calculateTotalSubmissions();

            $batchPayment->updateSubmissionPaymentUrls();

            $batchPayment->load(['batch', 'user']);

            return response()->json([
                'message' => 'Batch payment created/updated successfully',
                'data' => $batchPayment
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to create/update batch payment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getByBatch(int $batchId): JsonResponse
    {
        try {
            $batch = Batch::findOrFail($batchId);

            $batchPayments = BatchPayment::where('batch_id', $batchId)
                ->with(['user', 'batch'])
                ->get();

            $batchPayments->each(function ($payment) {
                $submissions = Card::where('user_id', $payment->user_id)
                    ->where('batch_id', $payment->batch_id)
                    ->with('latest_status')
                    ->get();
                $payment->submissions_detail = $submissions;
            });

            return response()->json([
                'batch' => $batch,
                'payments' => $batchPayments
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch batch payments',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function sendPaymentLink(int $id): JsonResponse
    {
        try {
            $batchPayment = BatchPayment::findOrFail($id);

            if (!$batchPayment->payment_url) {
                return response()->json([
                    'message' => 'Payment URL is required before sending'
                ], 400);
            }

            $batchPayment->markAsSent();
            return response()->json([
                'message' => 'Payment link sent successfully',
                'data' => $batchPayment
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to send payment link',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show(int $id): JsonResponse
    {
        try {
            $batchPayment = BatchPayment::with(['batch', 'user'])->findOrFail($id);

            $submissions = Card::where('user_id', $batchPayment->user_id)
                ->where('batch_id', $batchPayment->batch_id)
                ->with(['latest_status', 'images'])
                ->get();

            $batchPayment->submissions_detail = $submissions;

            return response()->json([
                'data' => $batchPayment
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Batch payment not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function destroy(int $id): JsonResponse
    {
        try {
            $batchPayment = BatchPayment::findOrFail($id);

            Card::where('user_id', $batchPayment->user_id)
                ->where('batch_id', $batchPayment->batch_id)
                ->update(['payment_url' => null]);

            $batchPayment->delete();

            return response()->json([
                'message' => 'Batch payment deleted successfully'
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to delete batch payment',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getPendingPayments(): JsonResponse
    {
        try {
            $pendingPayments = BatchPayment::where('is_sent', false)
                ->with(['batch', 'user'])
                ->get();

            return response()->json([
                'data' => $pendingPayments
            ], 200);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Failed to fetch pending payments',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
