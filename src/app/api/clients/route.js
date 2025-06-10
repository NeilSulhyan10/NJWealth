import { connectToDatabase } from '@/lib/db';
import Client from '@/models/Client';
import { NextResponse } from 'next/server';

// POST /api/clients - Used to create a new client
export async function POST(req) {
  // Ensure connection to the database
  await connectToDatabase();
  const body = await req.json();

  try {
    // Create a new client document in the database
    const client = await Client.create(body);
    // Return a success response with the created client
    return NextResponse.json({ message: 'Client saved', client }, { status: 201 });
  } catch (err) {
    // Log the error and return an error response
    console.error('Error saving client:', err);
    return NextResponse.json({ message: 'Error saving client', error: err.message || err }, { status: 500 });
  }
}

// GET /api/clients - Used to fetch all clients
export async function GET() {
  // Ensure connection to the database
  await connectToDatabase();

  try {
    // Find all client documents in the database
    const clients = await Client.find({});
    // Return a success response with all clients
    return NextResponse.json({ message: 'Clients fetched', clients }, { status: 200 });
  } catch (err) {
    // Log the error and return an error response
    console.error('Error fetching clients:', err);
    return NextResponse.json({ message: 'Error fetching clients', error: err.message || err }, { status: 500 });
  }
}
