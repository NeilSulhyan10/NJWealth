import { connectToDatabase } from '@/lib/db';
import Client from '@/models/Client';
import { NextResponse } from 'next/server';

export async function POST(req) {
  await connectToDatabase();
  const body = await req.json();

  try {
    const client = await Client.create(body);
    return NextResponse.json({ message: 'Client saved', client }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: 'Error saving client', error: err }, { status: 500 });
  }
}
