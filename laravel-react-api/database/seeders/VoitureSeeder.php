<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Voiture;
class VoitureSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $voituresData = [];

        // Créez 10 enregistrements de voiture avec des données aléatoires
        for ($i = 0; $i < 10; $i++) {
            $voituresData[] = [
                'matricule' => 'ABC123'.$i, // Remplacez par votre matricule
                'nbr_chevaux' => rand(100, 200), // Remplacez par votre plage de valeurs
                'kilometrage' => rand(50000, 100000), // Remplacez par votre plage de valeurs
                'prix_par_jour' => rand(30, 70) + (rand(0, 99) / 100), // Remplacez par votre plage de valeurs
                'carburant_id' => rand(1, 3), // Remplacez par votre plage de valeurs
                'marque_id' => rand(1, 11), // Remplacez par votre plage de valeurs
                'disponible' => rand(0, 1), // Remplacez par votre plage de valeurs
            ];
        }

        // Insérer les données dans la base de données
        Voiture::insert($voituresData);
    }
}
