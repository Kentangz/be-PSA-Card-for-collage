<?php

namespace App\Http\Controllers;

use App\Models\Card;
use App\Models\CardDeliveryProof;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class CardDeliveryProofController extends Controller
{
    public function show($id)
    {
        try {
            $card = Card::with(['deliveryProofs' => function ($query) {
                $query->orderBy('created_at', 'asc');
            }])->findOrFail($id);

            return response()->json([
                'card_id' => $id,
                'card_name' => $card->name,
                'delivery_proofs' => $card->deliveryProofs
            ]);
        } catch (\Exception $e) {
            Log::error('Error fetching card delivery proofs: ' . $e->getMessage());
            return response()->json(['error' => 'Card not found'], 404);
        }
    }

    public function store(Request $request, $id)
    {
        try {
            $request->validate([
                'image' => 'required|image|mimes:jpeg,png,jpg,gif|max:2048'
            ]);

            $card = Card::findOrFail($id);

            if ($request->hasFile('image')) {
                $file = $request->file('image');

                $filename = time() . '_' . uniqid() . '.' . $file->getClientOriginalExtension();

                $imagePath = $file->storeAs('delivery-proofs', $filename, 'public');

                $deliveryProof = CardDeliveryProof::create([
                    'card_id' => $id,
                    'image_path' => $imagePath
                ]);

                return response()->json([
                    'success' => true,
                    'message' => 'Delivery proof uploaded successfully',
                    'data' => [
                        'id' => $deliveryProof->id,
                        'card_id' => $deliveryProof->card_id,
                        'image_path' => $deliveryProof->image_path,
                        'image_url' => Storage::url($imagePath),
                        'created_at' => $deliveryProof->created_at
                    ]
                ], 201);
            }

            return response()->json([
                'success' => false,
                'error' => 'No image file provided'
            ], 400);
        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Validation failed',
                'messages' => $e->errors()
            ], 422);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Card not found'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error storing delivery proof', [
                'card_id' => $id,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Internal server error'
            ], 500);
        }
    }

    public function destroy($cardId, $proofId)
    {
        try {
            $card = Card::findOrFail($cardId);

            $deliveryProof = CardDeliveryProof::where('id', $proofId)
                ->where('card_id', $cardId)
                ->firstOrFail();

            // Delete the physical file from storage
            if (Storage::disk('public')->exists($deliveryProof->image_path)) {
                Storage::disk('public')->delete($deliveryProof->image_path);
            }

            // Delete the database record
            $deliveryProof->delete();

            return response()->json([
                'success' => true,
                'message' => 'Delivery proof deleted successfully'
            ], 200);
        } catch (\Illuminate\Database\Eloquent\ModelNotFoundException $e) {
            return response()->json([
                'success' => false,
                'error' => 'Delivery proof not found'
            ], 404);
        } catch (\Exception $e) {
            Log::error('Error deleting delivery proof', [
                'card_id' => $cardId,
                'proof_id' => $proofId,
                'error' => $e->getMessage()
            ]);

            return response()->json([
                'success' => false,
                'error' => 'Internal server error'
            ], 500);
        }
    }
}
