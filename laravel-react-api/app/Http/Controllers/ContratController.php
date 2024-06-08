<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Contrat;

class ContratController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // Retrieve all contrats
        $contrats = Contrat::with(['client','voiture'])->get();

        // Return JSON response
        return response()->json($contrats, 200);
    }

   
    public function store(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'client_id' => 'required|exists:clients,id',
            'voiture_id' => 'required|exists:voitures,id',
            'date_debut' => 'required|date',
            'date_fin' => 'required|date',
            'prix_contrat' => 'required|numeric',
        ]);

        // Create a new contrat
        $contrat = Contrat::create($validatedData);

        // Return a success response
        return response()->json($contrat, 201);
    }

    
    public function show($id)
    {
        // Find the contrat by id
        $contrat = Contrat::find($id);

        // If contrat doesn't exist, return 404 response
        if (!$contrat) {
            return response()->json(['message' => 'Contrat not found'], 404);
        }

        // Return the contrat
        return response()->json($contrat, 200);
    }

    
    public function update(Request $request, $id)
    {
        // Find the contrat by id
        $contrat = Contrat::find($id);

        // If contrat doesn't exist, return 404 response
        if (!$contrat) {
            return response()->json(['message' => 'Contrat not found'], 404);
        }

        // Validate the request data
        $validatedData = $request->validate([
            'client_id' => 'sometimes|exists:clients,id',
            'voiture_id' => 'sometimes|exists:voitures,id',
            'date_debut' => 'sometimes|date',
            'date_fin' => 'sometimes|date',
            'prix_contrat' => 'sometimes|numeric',
        ]);

        // Update the contrat with validated data
        $contrat->update($validatedData);

        // Return the updated contrat
        return response()->json($contrat, 200);
    }

   
    public function destroy($id)
    {
        // Find the contrat by id
        $contrat = Contrat::find($id);

        // If contrat doesn't exist, return 404 response
        if (!$contrat) {
            return response()->json(['message' => 'Contrat not found'], 404);
        }

        // Delete the contrat
        $contrat->delete();

        // Return success message
        return response()->json(['message' => 'Contrat deleted successfully'], 200);
    }
}
