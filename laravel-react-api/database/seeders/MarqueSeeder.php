<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Marque;

class MarqueSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        //
        $marques = [
            'Dacia',
            'Toyota',
            'Ford',
            'BMW',
            'Mercedes-Benz',
            'Honda',
            'Volkswagen',
            'Audi',
            'Tesla',
            'Chevrolet',
            'Nissan',

        ];

        foreach ($marques as $marque) {
            Marque::create(['label' => $marque]);
        }
    }
}
