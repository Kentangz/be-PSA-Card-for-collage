<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use App\Models\Card;
use App\Models\BatchQueueEntry;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\DB;

class BatchQueueEntryController extends Controller
{
  public function store(Request $request, int $batchId): JsonResponse
  {
    $request->validate([
      'cards' => 'required|array|min:1',
      'cards.*.name' => 'required|string',
      'cards.*.year' => 'required|integer',
      'cards.*.brand' => 'required|string',
      'cards.*.serial_number' => 'nullable|string',
      'cards.*.images' => 'required|array|min:1',
      'cards.*.images.*' => 'required|file|image|max:5120',
    ]);

    $batch = Batch::findOrFail($batchId);
    if (!$batch->is_active) {
      return response()->json(['message' => 'Selected batch is not active for submissions'], 422);
    }

    $user = $request->user();

    return DB::transaction(function () use ($batchId, $user, $request) {
      $nextOrder = BatchQueueEntry::where('batch_id', $batchId)->max('queue_order');
      $entry = BatchQueueEntry::create([
        'batch_id' => $batchId,
        'user_id' => $user->id,
        'queue_order' => ($nextOrder ?? 0) + 1,
      ]);

      $createdCards = [];
      foreach ($request->input('cards') as $index => $cardInput) {
        $card = Card::create([
          'name' => $cardInput['name'],
          'year' => $cardInput['year'],
          'brand' => $cardInput['brand'],
          'serial_number' => $cardInput['serial_number'] ?? null,
          'user_id' => $user->id,
          'batch_id' => $batchId,
          'queue_entry_id' => $entry->id,
        ]);
        $card->statuses()->create(['status' => 'submit']);

        // Save uploaded images for this card
        $uploadedImages = $request->file("cards.$index.images", []);
        foreach ($uploadedImages as $image) {
          $path = $image->store('card-images', 'public');
          $card->images()->create(['path' => $path]);
        }
        $createdCards[] = $card;
      }

      $entry->load(['user:id,name,email']);

      // Ensure latestStatus relation is loaded for each created card
      foreach ($createdCards as $createdCard) {
        $createdCard->load('latestStatus');
      }

      return response()->json([
        'entry' => $entry,
        'cards' => $createdCards
      ], 201);
    });
  }

  public function indexByBatch(Request $request, int $batchId): JsonResponse
  {
    $perPage = (int) $request->query('perPage', 20);

    $query = BatchQueueEntry::where('batch_id', $batchId)
      ->with(['user:id,name,email'])
      ->withCount('cards')
      ->orderBy('queue_order')
      ->orderBy('created_at');

    $paginated = $query->paginate($perPage);

    return response()->json($paginated);
  }

  public function reorder(Request $request, int $batchId): JsonResponse
  {
    if ($request->user()->role !== 'admin') {
      return response()->json(['message' => 'Forbidden'], 403);
    }
    $request->validate([
      'entry_ids' => 'required|array|min:1',
      'entry_ids.*' => 'required|integer|exists:batch_queue_entries,id',
    ]);

    $entryIds = $request->input('entry_ids');

    $count = BatchQueueEntry::where('batch_id', $batchId)->whereIn('id', $entryIds)->count();
    if ($count !== count($entryIds)) {
      return response()->json(['message' => 'Some entries do not belong to this batch'], 422);
    }

    DB::transaction(function () use ($entryIds) {
      foreach ($entryIds as $index => $entryId) {
        BatchQueueEntry::where('id', $entryId)->update(['queue_order' => $index + 1]);
      }
    });

    return response()->json(['message' => 'Queue order updated']);
  }

  public function setAndSendPayment(Request $request, int $entryId): JsonResponse
  {
    if ($request->user()->role !== 'admin') {
      return response()->json(['message' => 'Forbidden'], 403);
    }
    $request->validate([
      'payment_url' => 'required|string',
    ]);

    $entry = BatchQueueEntry::findOrFail($entryId);

    if ($entry->is_sent) {
      return response()->json(['message' => 'Payment already sent and cannot be modified'], 409);
    }

    $entry->update([
      'payment_url' => $request->input('payment_url'),
      'is_sent' => true,
    ]);

    return response()->json(['message' => 'Payment set and sent', 'entry' => $entry]);
  }

  public function show(int $entryId): JsonResponse
  {
    $entry = BatchQueueEntry::with(['user:id,name,email', 'cards.latestStatus'])
      ->findOrFail($entryId);

    return response()->json($entry);
  }
}
