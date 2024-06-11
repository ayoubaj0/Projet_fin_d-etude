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
    $voitures = Voiture::with(['latestAssurance', 'latestContrat', 'contrats.facture', 'marque', 'carburant'])->get();
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
            'disponible' => 'required|string',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('images', 'public');
            $data['image'] = $path;
        }

        $voiture = Voiture::create($data);
    
        // $voiture = Voiture::create($request->all());

        return response()->json($voiture, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $voiture = Voiture::with('contrats.facture', 'latestAssurance', 'latestContrat', 'marque', 'carburant', 'contrats.client',  'assurances')->find($id);

        if (is_null($voiture)) {
            return response()->json(['message' => 'Voiture not found'], 404);
        }
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
    // dd($request);
    $voiture = Voiture::find($id);
    // dd($voiture);

    if (is_null($voiture)) {
        return response()->json(['message' => 'Voiture not found'], 404);
    }

    $data = $request->validate([
        'matricule' => 'required|string|max:255|unique:voitures,matricule,'.$id,
        'nbr_chevaux' => 'required|integer',
        'kilometrage' => 'required|integer',
        'prix_par_jour' => 'required|string',
        'carburant_id' => 'required|exists:carburants,id',
        'marque_id' => 'required|exists:marques,id',
        'disponible' => 'required|string',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    if ($request->hasFile('image')) {
        if ($voiture->image) {
            Storage::disk('public')->delete($voiture->image);
        }

        $path = $request->file('image')->store('images', 'public');
        $data['image'] = $path;
    }

    $voiture->update($data);

    return response()->json($voiture, 200);
    // return response()->json([
    //     'request' => $request
    // ]);
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
