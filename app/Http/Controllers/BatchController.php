<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use Illuminate\Http\Request;
use App\Models\UserBatchQueue;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;

class BatchController extends Controller
{
  public function index(Request $request)
  {
    $query = Batch::query()->withCount('cards');

    if ($request->has('status')) {
      $status = $request->query('status');
      if ($status === 'active') {
        $query->where('is_active', true);
      } elseif ($status === 'inactive') {
        $query->where('is_active', false);
      }
    }

    return $query->orderBy('created_at', 'desc')->get();
  }

  public function store(Request $request)
  {
    $validated = $request->validate([
      'services' => 'required|string',
      'category' => 'required|in:PSA-Japan,PSA-USA,CGC',
      'is_active' => 'boolean'
    ]);

    $batch = Batch::create($validated);

    return response()->json([
      'message' => 'Batch created successfully',
      'batch' => $batch
    ], 201);
  }

  public function show($id)
  {
    $batch = Batch::with(['cards' => function ($query) {
      $query->with(['user:id,name,email', 'latestStatus']);
    }])->findOrFail($id);

    return response()->json($batch);
  }

  public function update(Request $request, $id)
  {
    $batch = Batch::findOrFail($id);

    $validated = $request->validate([
      'services' => 'sometimes|string',
      'category' => 'sometimes|in:PSA-Japan,PSA-USA,CGC',
      'is_active' => 'sometimes|boolean'
    ]);

    $batch->update($validated);

    return response()->json([
      'message' => 'Batch updated successfully',
      'batch' => $batch
    ]);
  }

  public function getActiveBatches()
  {
    $activeBatches = Batch::where('is_active', true)
      ->select('id', 'batch_number', 'register_number', 'services', 'category', 'is_active')
      ->orderBy('created_at', 'desc')
      ->get();

    return response()->json($activeBatches);
  }

  public function getUserQueue(int $id): JsonResponse
  {
    try {
      $batch = Batch::findOrFail($id);

      $userQueues = UserBatchQueue::where('batch_id', $id)
        ->with(['user:id,name,email'])
        ->orderBy('queue_order')
        ->get();

      $submissions = DB::table('cards')
        ->where('batch_id', $id)
        ->get()
        ->groupBy('user_id');

      $result = $userQueues->map(function ($queue) use ($submissions) {
        return [
          'queue_order' => $queue->queue_order,
          'user' => $queue->user,
          'submissions' => $submissions->get($queue->user_id, collect())->values()->toArray(),
          'submission_count' => $submissions->get($queue->user_id, collect())->count()
        ];
      });

      return response()->json([
        'success' => true,
        'data' => [
          'batch' => $batch,
          'user_queues' => $result
        ]
      ]);
    } catch (\Exception $e) {
      return response()->json([
        'success' => false,
        'message' => 'Failed to fetch user queue: ' . $e->getMessage()
      ], 500);
    }
  }

  public function updateUserQueue(int $id, Request $request): JsonResponse
  {
    try {
      $request->validate([
        'user_ids' => 'required|array|min:1',
        'user_ids.*' => 'required|integer|exists:users,id'
      ]);

      $batch = Batch::findOrFail($id);
      $userIds = $request->input('user_ids');

      DB::beginTransaction();

      $existingQueues = UserBatchQueue::where('batch_id', $id)
        ->whereIn('user_id', $userIds)
        ->pluck('user_id')
        ->toArray();

      $missingUsers = array_diff($userIds, $existingQueues);
      if (!empty($missingUsers)) {
        throw ValidationException::withMessages([
          'user_ids' => ['Some users are not found in this batch: ' . implode(', ', $missingUsers)]
        ]);
      }

      // Update queue orders based on array index
      foreach ($userIds as $index => $userId) {
        UserBatchQueue::where('batch_id', $id)
          ->where('user_id', $userId)
          ->update(['queue_order' => $index + 1]);
      }

      DB::commit();

      return $this->getUserQueue($id);
    } catch (ValidationException $e) {
      DB::rollBack();
      return response()->json([
        'success' => false,
        'message' => 'Validation failed',
        'errors' => $e->errors()
      ], 422);
    } catch (\Exception $e) {
      DB::rollBack();
      return response()->json([
        'success' => false,
        'message' => 'Failed to update user queue: ' . $e->getMessage()
      ], 500);
    }
  }

  public function addUserToBatchQueue(int $userId, int $batchId): void
  {
    $existingQueue = UserBatchQueue::where('user_id', $userId)
      ->where('batch_id', $batchId)
      ->first();

    if (!$existingQueue) {
      $nextOrder = UserBatchQueue::getNextQueueOrder($batchId);

      UserBatchQueue::create([
        'user_id' => $userId,
        'batch_id' => $batchId,
        'queue_order' => $nextOrder
      ]);
    }
  }
}
