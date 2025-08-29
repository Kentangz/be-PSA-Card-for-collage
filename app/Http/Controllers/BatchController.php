<?php

namespace App\Http\Controllers;

use App\Models\Batch;
use Illuminate\Http\Request;

class BatchController extends Controller
{
  public function index(Request $request)
  {
    $query = Batch::query()->withCount('cards');

    // Optional filter by status
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
}
