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
        return Card::with(['user', 'latestStatus'])
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
            'Grade',
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
            $card->grade,
        ];
    }
}
