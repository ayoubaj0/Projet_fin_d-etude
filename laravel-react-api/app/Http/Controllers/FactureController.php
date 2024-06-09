<?php

namespace App\Http\Controllers;

use App\Models\Facture;
use Illuminate\Http\Request;

class FactureController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
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
        // Validation
        $validatedData = $request->validate([
            'contrat_id' => 'required|exists:contrats,id',
            'date_facture' => 'required|date',
            'montant_total' => 'required|numeric|min:0',
        ]);

        // Create the Facture
        $facture = Facture::create($validatedData);

        // Return response
        return response()->json([
            'message' => 'Facture created successfully',
            'facture' => $facture
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validation
        $validatedData = $request->validate([
            'contrat_id' => 'required|exists:contrats,id',
            'date_facture' => 'required|date',
            'montant_total' => 'required|numeric|min:0',
        ]);

        // Find the Facture
        $facture = Facture::findOrFail($id);

        // Update the Facture
        $facture->update($validatedData);

        // Return response
        return response()->json([
            'message' => 'Facture updated successfully',
            'facture' => $facture
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find the Facture
        $facture = Facture::findOrFail($id);

        // Delete the Facture
        $facture->delete();

        // Return response
        return response()->json([
            'message' => 'Facture deleted successfully'
        ], 200);
    }
}
