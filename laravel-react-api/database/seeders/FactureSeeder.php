<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Facture;
use Carbon\Carbon;

class FactureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $factures = [
            [
                'contrat_id' => 1,
                'date_facture' => '2024-06-10',
                'montant_total' => 400.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'contrat_id' => 2,
                'date_facture' => '2024-06-16',
                'montant_total' => 220.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'contrat_id' => 3,
                'date_facture' => '2024-06-26',
                'montant_total' => 186.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'contrat_id' => 4,
                'date_facture' => '2024-06-06',
                'montant_total' => 633.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'contrat_id' => 5,
                'date_facture' => '2024-06-01',
                'montant_total' => 231.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
            [
                'contrat_id' => 6,
                'date_facture' => '2024-06-06',
                'montant_total' => 192.00,
                'created_at' => Carbon::now(),
                'updated_at' => Carbon::now(),
            ],
        ];

        Facture::insert($factures);
    }
}
