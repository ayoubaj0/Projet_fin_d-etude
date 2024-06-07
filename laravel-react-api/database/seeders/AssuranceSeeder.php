<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Assurance;
use App\Models\Voiture;
use Carbon\Carbon;

class AssuranceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $voitures = Voiture::all();

        foreach ($voitures as $voiture) {
            // Generate a random date between the specified range (2023/01/01 and 2024/06/06)
            $startDate = Carbon::createFromDate(2023, 1, 1);
            $endDate = Carbon::createFromDate(2024, 6, 6);
            $randomDate = Carbon::createFromTimestamp(mt_rand($startDate->timestamp, $endDate->timestamp));

            // Generate a unique reference for each assurance record
            $ref = 'REF_' . uniqid();

            Assurance::create([
                'voiture_id' => $voiture->id,
                'ref' => $ref,
                'date_debut' => $randomDate,
                'date_fin' => $randomDate->copy()->addDays(365), // Example value for date_fin (1 year later)
            ]);
        }
    }
}
