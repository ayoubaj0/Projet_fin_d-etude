<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Facture extends Model
{
    use HasFactory;
    protected $fillable = [
        'contrat_id',
        'date_facture',
        'montant_total'
    ];

    public function contrat()
    {
        return $this->belongsTo(Contrat::class);
    }

}
