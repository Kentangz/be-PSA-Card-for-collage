<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Exports\CardsExport;
use Illuminate\Http\Request;
use App\Models\UserBatchQueue;
use Maatwebsite\Excel\Facades\Excel;

class CardController extends Controller
{
    public function index(Request $request)
    {
        $query = Card::with(["latestStatus", "statuses", "batch", "certificates","user:id,name,email"]);

        if ($request->has('status')) {
            $status = $request->query('status');

            $statusMap = [
                'done' => 'done',
                'rejected' => 'rejected'
            ];

            if (array_key_exists($status, $statusMap)) {
                $dbStatus = $statusMap[$status];
                $query->whereHas('latestStatus', function ($q) use ($dbStatus) {
                    $q->where('status', $dbStatus);
                });
            }
        }

        return $query->get();
    }

    public function getCardByUser(Request $request)
    {
        return response()->json(
            Card::query()
                ->where("user_id", $request->user()->id)
                ->with(["latestStatus", "batch", "certificates"])
                ->get()
        );
    }

    public function show($id)
    {
        return Card::query()
            ->where("id", $id)
            ->with(["latestStatus", "statuses", "images", "deliveryProofs", "batch", "certificates"])
            ->firstOrFail();
    }

    public function getDetailCardByUser(Request $request, $id)
    {
        return Card::query()
            ->where("id", $id)
            ->where("user_id", $request->user()->id)
            ->with(["latestStatus", "statuses", "images", "deliveryProofs", "batch", "certificates"])
            ->firstOrFail();
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            "name" => "required|string",
            "year" => "required|integer",
            "brand" => "required|string",
            "batch_id" => "required|exists:batches,id",
        ]);

        $batch = \App\Models\Batch::findOrFail($validated['batch_id']);
        if (!$batch->is_active) {
            return response()->json([
                'message' => 'Selected batch is not active for submissions'
            ], 422);
        }

        $validated["user_id"] = $request->user()->id;
        $card = Card::query()->create($validated);

        $card->statuses()->create(["status" => "submit"]);

        if ($card->batch_id) {
            $existingQueue = UserBatchQueue::where('user_id', $card->user_id)
                ->where('batch_id', $card->batch_id)
                ->first();

            if (!$existingQueue) {
                $nextOrder = UserBatchQueue::getNextQueueOrder($card->batch_id);

                UserBatchQueue::create([
                    'user_id' => $card->user_id,
                    'batch_id' => $card->batch_id,
                    'queue_order' => $nextOrder
                ]);
            }
        }

        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $image) {
                $path = $image->store('card-images', 'public');

                $card->images()->create([
                    'path' => $path
                ]);
            }
        }

        $card->load(['batch:id,batch_number,register_number,services,category']);
        return response()->json(["card" => $card]);
    }

    public function update(Request $request, $id)
    {
        $rules = [];

        if ($request->has('name')) {
            $rules['name'] = 'required|string';
        }

        if ($request->has('grade')) {
            $rules['grade'] = 'required|string';
        }

        if ($request->has('serial_number')) {
            $rules['serial_number'] = 'required|string';
        }

        if ($request->has('payment_url')) {
            $rules['payment_url'] = 'required|url';
        }

        if ($request->has('certificates')) {
            $rules['certificates'] = 'array';
            $rules['certificates.*.cert_url'] = 'required|url';
        }

        $validated = $request->validate($rules);

        $card = Card::findOrFail($id);

        $cardData = collect($validated)->except('certificates')->toArray();
        if (!empty($cardData)) {
            $card->update($cardData);
        }

        if ($request->has('certificates')) {
            foreach ($validated['certificates'] as $cert) {
                $card->certificates()->create([
                    'cert_url' => $cert['cert_url']
                ]);
            }
        }

        return response()->json([
            "card" => $card->load('certificates')
        ]);
    }

    public function publicSearchBySerialNumber(Request $request)
    {
        $request->validate([
            'q' => 'required|string'
        ]);

        $serialNumber = trim($request->query('q'));

        $card = Card::with(['latestStatus'])
            ->where('serial_number', $serialNumber)
            ->whereHas('latestStatus', function ($q) {
                $q->where('status', 'done');
            })
            ->first();

        if (!$card) {
            return response()->json([
                'message' => 'Card with serial number "' . $serialNumber . '" not found or not done yet.'
            ], 404);
        }

        if ($card->certificates->isNotEmpty()) {
            $card->display_images = $card->certificates->map(function ($cert) {
                return [
                    'type' => 'certificate',
                    'url' => $cert->cert_url
                ];
            });
        } else {
            $card->display_images = $card->images->map(function ($image) {
                return [
                    'type' => 'upload',
                    'url' => asset('storage/' . $image->path)
                ];
            });
        }

        $card->images->each(function ($image) {
            $image->path = asset('storage/' . $image->path);
        });

        return response()->json($card);
    }

    public function publicLatestCards(Request $request)
    {
        $limit = $request->query('limit', 3);

        $latestCards = Card::with(['images' => function ($q) {
            $q->limit(1);
        }])
            ->whereHas('latestStatus', function ($q) {
                $q->where('status', 'done');
            })
            ->orderBy('updated_at', 'desc')
            ->limit($limit)
            ->get(['id', 'serial_number'])
            ->map(function ($card) {
                return [
                    'id' => $card->id,
                    'serial_number' => $card->serial_number,
                    'path' => $card->images->first()->path ?? null,
                ];
            });

        return response()->json($latestCards);
    }

    public function export()
    {
        return Excel::download(new CardsExport, 'psa-cards-' . date('Y-m-d-H-i-s') . '.xlsx');
    }
}
