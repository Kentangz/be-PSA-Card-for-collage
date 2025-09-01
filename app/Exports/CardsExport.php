<?php

namespace App\Exports;

use App\Models\Card;
use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;

class CardsExport implements FromCollection, WithHeadings, WithMapping
{
    public function collection()
    {
        return Card::with(['user', 'latestStatus', 'batch'])
            ->whereHas('latestStatus', function ($q) {
                $q->where('status', 'done');
            })
            ->get();
    }

    public function headings(): array
    {
        return [
            'User ID',
            'User Name',
            'Card Name',
            'Year',
            'Brand',
            'Serial Number',
            // 'Grade Target',
            'Grade',
            'Batch Number',
            'Register Number',
            'Batch Category',
        ];
    }

    public function map($card): array
    {
        return [
            $card->user->id,
            $card->user->name,
            $card->name,
            $card->year,
            $card->brand,
            $card->serial_number,
            // $card->grade_target,
            $card->grade,
            $card->batch ? $card->batch->batch_number : 'No Batch',
            $card->batch ? $card->batch->register_number : 'N/A',
            $card->batch ? $card->batch->category : 'N/A',
        ];
    }
}
