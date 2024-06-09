<?php
namespace App\Http\Controllers;

use App\Models\Assurance;
use Illuminate\Http\Request;

class AssuranceController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all assurances
        $assurances = Assurance::all();
        
        // Return response
        return response()->json([
            'message' => 'Assurances retrieved successfully',
            'assurances' => $assurances
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validation
        $validatedData = $request->validate([
            'ref' => 'required|string|max:255',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'voiture_id' => 'required|exists:voitures,id',
        ]);

        // Create the Assurance
        $assurance = Assurance::create($validatedData);

        // Return response
        return response()->json([
            'message' => 'Assurance created successfully',
            'assurance' => $assurance
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // Validation
        $validatedData = $request->validate([
            'ref' => 'required|string|max:255',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date|after:date_debut',
            'voiture_id' => 'required|exists:voitures,id',
        ]);

        // Find the Assurance
        $assurance = Assurance::findOrFail($id);

        // Update the Assurance
        $assurance->update($validatedData);

        // Return response
        return response()->json([
            'message' => 'Assurance updated successfully',
            'assurance' => $assurance
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        // Find the Assurance
        $assurance = Assurance::findOrFail($id);

        // Delete the Assurance
        $assurance->delete();

        // Return response
        return response()->json([
            'message' => 'Assurance deleted successfully'
        ], 200);
    }
}
