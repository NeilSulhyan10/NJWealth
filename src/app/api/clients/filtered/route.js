import { connectToDatabase } from '@/lib/db';
import Client from '@/models/Client';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(req) {
  await connectToDatabase();

  try {
    const { searchParams } = new URL(req.url);
    
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const search = searchParams.get('search') || '';
    const riskProfile = searchParams.get('riskProfile') || '';
    const occupationType = searchParams.get('occupationType') || '';
    const hasLifeInsurance = searchParams.get('hasLifeInsurance');
    const hasHealthInsurance = searchParams.get('hasHealthInsurance');
    const sortBy = searchParams.get('sortBy') || 'createdAt';
    const sortOrder = searchParams.get('sortOrder') || 'desc';

    const skip = (page - 1) * limit;

    const query = {};

    if (search) {
      query.$or = [
        { clientName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    if (riskProfile) {
      query.riskProfile = riskProfile;
    }

    if (occupationType) {
      query.occupationType = occupationType;
    }

    if (hasLifeInsurance !== null && hasLifeInsurance !== '') {
      query.hasLifeInsurance = hasLifeInsurance === 'true';
    }

    if (hasHealthInsurance !== null && hasHealthInsurance !== '') {
      query.hasHealthInsurance = hasHealthInsurance === 'true';
    }

    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [clients, total] = await Promise.all([
      Client.find(query)
        .select('-pan -aadhar')
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean(),
      Client.countDocuments(query),
    ]);

    return NextResponse.json({
      clients,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNextPage: page < Math.ceil(total / limit),
        hasPrevPage: page > 1,
      },
    }, { status: 200 });
  } catch (err) {
    console.error('Error fetching filtered clients:', err);
    return NextResponse.json(
      { message: 'Error fetching clients', error: err.message || err },
      { status: 500 }
    );
  }
}