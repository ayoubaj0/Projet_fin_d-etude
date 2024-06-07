<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    use HasFactory;
    protected $fillable =["id","cin" ,"n_passport","nom","prenom","email","telephone"];

    public function contrats()
    {
        return $this->hasMany(Contrat::class);
    }
}
