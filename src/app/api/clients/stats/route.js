import { connectToDatabase } from '@/lib/db';
import Client from '@/models/Client';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  await connectToDatabase();

  try {
    const [
      totalClients,
      conservativeClients,
      noLifeInsurance,
      noHealthInsurance,
      recentClients,
    ] = await Promise.all([
      Client.countDocuments({}),
      Client.countDocuments({ riskProfile: 'Conservative' }),
      Client.countDocuments({ hasLifeInsurance: false }),
      Client.countDocuments({ hasHealthInsurance: false }),
      Client.find({})
        .select('clientName email createdAt riskProfile')
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),
    ]);

    return NextResponse.json({
      stats: {
        totalClients,
        conservativeClients,
        noLifeInsurance,
        noHealthInsurance,
        recentClients,
      },
    }, { status: 200 });
  } catch (err) {
    console.error('Error fetching client stats:', err);
    return NextResponse.json(
      { message: 'Error fetching stats', error: err.message || err },
      { status: 500 }
    );
  }
}