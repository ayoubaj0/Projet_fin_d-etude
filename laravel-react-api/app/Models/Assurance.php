<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Assurance extends Model
{
    use HasFactory;
    protected $fillable =["ref", "date_debut", "date_fin", "voiture_id"];

    public function voiture()
    {
        return $this->belongsTo(Voiture::class);
    }

}
