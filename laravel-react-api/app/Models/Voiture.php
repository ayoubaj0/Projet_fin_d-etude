<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Voiture extends Model
{
    use HasFactory;
    protected $fillable =["id" ,"matricule" ,"nbr_chevaux" ,"kilometrage" ,"prix_par_jour" ,"carburant_id" ,"marque_id" ,"disponible"];

    public function carburant()
    {
        return $this->belongsTo(Carburant::class);
    }

    public function marque()
    {
        return $this->belongsTo(Marque::class);
    }

    // public function assurance()
    // {
    //     return $this->belongsTo(Assurance::class);
    // }
    public function latestAssurance()
    {
        return $this->hasOne(Assurance::class)->latest();
    }
    public function latestContrat()
    {
        return $this->hasOne(Contrat::class)->latest();
    }
    public function assurances()
    {
        return $this->hasMany(Assurance::class);
    }

    public function contrats()
    {
        return $this->hasMany(Contrat::class);
    }

}
