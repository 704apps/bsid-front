import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const response = await fetch('http://174.138.95.161:3000/signature', {cache: "no-store"});

    const data = await response.json();
    return new NextResponse(JSON.stringify(data));

  } catch (error) {
    const errorMessage = axios.isAxiosError(error) ? error.response?.data || error.message : 'Internal Server Error';
    const statusCode = axios.isAxiosError(error) ? error.response?.status || 500 : 500;

    return new NextResponse(JSON.stringify({ error: errorMessage }), {
      status: statusCode,
    });
  }
}