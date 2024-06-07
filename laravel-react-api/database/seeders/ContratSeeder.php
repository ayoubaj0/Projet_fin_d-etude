<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Contrat;
use App\Models\Client;
use App\Models\Voiture;
use Carbon\Carbon;

class ContratSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run()
    {
        $clients = Client::all();

        foreach ($clients as $client) {
            $voiture = Voiture::inRandomOrder()->first(); // Get a random voiture for each client

            Contrat::create([
                'client_id' => $client->id,
                'voiture_id' => $voiture->id,
                'date_debut' => Carbon::now(),
                'date_fin' => Carbon::now()->addDays(rand(1, 30)), // Random contract duration between 1 and 30 days
                'prix_contrat' => rand(100, 1000), // Random contract price
            ]);
        }
    }
}
