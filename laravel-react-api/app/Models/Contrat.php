<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Contrat extends Model
{
    use HasFactory;
    protected $fillable =["client_id","voiture_id" ,"date_debut","date_fin","prix_contrat"];

    public function client()
    {
        return $this->belongsTo(Client::class);
    }


    public function voiture()
    {
        return $this->belongsTo(Voiture::class);
    }
    
    public function facture()
    {
        return $this->hasOne(Facture::class);
    }

}
