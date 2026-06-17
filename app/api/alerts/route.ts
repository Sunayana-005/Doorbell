import { NextResponse } from 'next/server';
import { getAlerts } from '@/lib/storage';

export async function GET() {
  try {
    const alerts = await getAlerts();
    
    return NextResponse.json({
      success: true,
      alerts,
    });
  } catch (error) {
    console.error('Error fetching alerts:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch alerts' },
      { status: 500 }
    );
  }
}
