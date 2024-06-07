<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Models\Client;


class ClientController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $clients=Client::all();
        return response()->json($clients, 200);
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
        $request->validate([
            'cin' => 'required|string|max:255',
            'n_passport' => 'nullable|string|max:255',
            'nom' => 'required|string|max:255',
            'prenom' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:clients',
            'telephone' => 'required|string|max:20',
        ]);

        $client = Client::create($request->all());

        return response()->json($client, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $client = Client::find($id);

        if (is_null($client)) {
            return response()->json(['message' => 'Client not found'], 404);
        }

        return response()->json($client, 200);
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
    public function update(Request $request, $id)
    {
        $request->validate([
            'cin' => 'string|max:255',
            'n_passport' => 'nullable|string|max:255',
            'nom' => 'string|max:255',
            'prenom' => 'string|max:255',
            'email' => 'string|email|max:255|unique:clients,email,' . $id,
            'telephone' => 'string|max:20',
        ]);

        $client = Client::find($id);

        if (is_null($client)) {
            return response()->json(['message' => 'Client not found'], 404);
        }

        $client->update($request->all());

        return response()->json($client, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $client = Client::find($id);

        if (is_null($client)) {
            return response()->json(['message' => 'Client not found'], 404);
        }

        $client->delete();

        return response()->json(['message' => 'Client deleted successfully'], 200);
    }
}
