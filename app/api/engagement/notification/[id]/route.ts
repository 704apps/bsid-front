import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const response = await fetch(`http://174.138.95.161:3000/engagement/notification/${params.id}`);
    
    const data = await response.json();

    if (!data || data.length === 0) {
      console.warn(`No engagement data found for ID: ${params.id}`);
    }

    return new NextResponse(JSON.stringify(data));
  } catch (error) {
    console.error('Error fetching engagement data:', error);

    const errorMessage = axios.isAxiosError(error) ? error.response?.data || error.message : 'Internal Server Error';
    const statusCode = axios.isAxiosError(error) ? error.response?.status || 500 : 500;

    return new NextResponse(JSON.stringify({ error: errorMessage }), { status: statusCode });
  }
}