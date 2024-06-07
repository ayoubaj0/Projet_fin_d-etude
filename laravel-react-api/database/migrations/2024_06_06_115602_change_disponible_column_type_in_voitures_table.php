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
        Schema::table('voitures', function (Blueprint $table) {
            // Changing the 'disponible' column from boolean to string
            $table->string('disponible')->default('1')->change();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('voitures', function (Blueprint $table) {
            $table->boolean('disponible')->default(1)->change();
        });
    }
};

