<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Voiture;
use Carbon\Carbon;

class VoitureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
{
    $voitures = Voiture::with(['latestAssurance', 'contrats','marque','carburant'])->get();
    foreach ($voitures as $voiture) {
        if ($voiture->latestAssurance) {
            $endDate = Carbon::parse($voiture->latestAssurance->date_fin);
            $now = Carbon::now();
            if ($now->lessThanOrEqualTo($endDate)) {
                $daysLeft = $endDate->diffInDays($now);
            } else {
                $daysLeft = 0; // Assurance has expired
            }
            $voiture->days_left = $daysLeft;
        } else {
            $voiture->days_left = 0; // No assurance available
        }
    }

    return response()->json($voitures, 200);
}

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // dd($request);
        $data=$request->validate([
            'matricule' => 'required|string|max:255|unique:voitures',
            'nbr_chevaux' => 'required|integer',
            'kilometrage' => 'required|integer',
            'prix_par_jour' => 'required|numeric',
            'carburant_id' => 'required|exists:carburants,id',
            'marque_id' => 'required|exists:marques,id',
            // 'carburant_id' => 'required|integer', // change to integer
            // 'marque_id' => 'required|integer', // change to integer
            'disponible' => 'required|string',
        ]);
        // $data = $request->all();
        // if (!isset($data['disponible'])) {
        //     $data['disponible'] = "0";
        // }
    
        $voiture = Voiture::create($data);
    
        // $voiture = Voiture::create($request->all());

        return response()->json($voiture, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $voiture = Voiture::find($id);

        if (is_null($voiture)) {
            return response()->json(['message' => 'Voiture not found'], 404);
        }

        return response()->json($voiture, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $data = $request->validate([
            'matricule' => 'string|max:255|unique:voitures,matricule,'.$id,
            'nbr_chevaux' => 'integer',
            'kilometrage' => 'integer',
            'prix_par_jour' => 'numeric',
            'carburant_id' => 'required|exists:carburants,id',
            'marque_id' => 'required|exists:marques,id',
            'disponible' => 'required|string',
        ]);

        $voiture = Voiture::find($id);

        if (is_null($voiture)) {
            return response()->json(['message' => 'Voiture not found'], 404);
        }

        $voiture->update($data);

        return response()->json($voiture, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $voiture = Voiture::find($id);

        if (is_null($voiture)) {
            return response()->json(['message' => 'Voiture not found'], 404);
        }

        $voiture->delete();

        return response()->json(['message' => 'Voiture deleted successfully'], 200);
    }
}
