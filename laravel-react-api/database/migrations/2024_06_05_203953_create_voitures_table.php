<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('voitures', function (Blueprint $table) {
            $table->id();
            $table->string('matricule');
            $table->integer('nbr_chevaux');
            $table->integer('kilometrage');
            $table->decimal('prix_par_jour', 8, 2);
            $table->foreignId('carburant_id')->constrained()->onDelete('cascade');
            $table->foreignId('marque_id')->constrained()->onDelete('cascade');
            // $table->foreignId('assurance_id')->constrained()->onDelete('cascade');
            $table->boolean('disponible');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('voitures');
    }
};
