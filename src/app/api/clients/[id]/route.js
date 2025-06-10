import { connectToDatabase } from '@/lib/db';
import Client from '@/models/Client';
import { NextResponse } from 'next/server';

// GET /api/clients/[id] - Used to fetch a single client by ID
export async function GET(req, { params }) {
  // Ensure connection to the database
  await connectToDatabase();
  const { id } = params; // Extract the client ID from the dynamic route parameters

  try {
    // Find a client document by its ID
    const client = await Client.findById(id);

    // If no client is found, return a 404 response
    if (!client) {
      return NextResponse.json({ message: 'Client not found' }, { status: 404 });
    }

    // Return a success response with the found client
    return NextResponse.json({ message: 'Client fetched', client }, { status: 200 });
  } catch (err) {
    // Log the error and return an error response
    console.error('Error fetching client by ID:', err);
    return NextResponse.json({ message: 'Error fetching client by ID', error: err.message || err }, { status: 500 });
  }
}
