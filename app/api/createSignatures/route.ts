import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

export const dynamic = 'force-dynamic';

export async function POST(req: NextRequest) {
  const corsHeaders = new Headers({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET,POST,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Cache-Control': 'no-store',
  });

  try {
    const body = await req.formData();

    const notificacao = {
      title: body.get('title'),
      description: body.get('description'),
      shortDescription: body.get('shortDescription'),
      linkRedirect: body.get('link'),
    };


    const formDataToSend = new FormData();
    formDataToSend.append("notificacao", JSON.stringify(notificacao));

    const logo = body.get('logo');
    if (logo instanceof Blob) {
      formDataToSend.append("logo", logo, "logo.png");
    }

    const banner = body.get('image');
    if (banner instanceof Blob) {
      formDataToSend.append("image", banner, "banner.png");
    }

    const response = await axios.post(
      'http://174.138.95.161:3000/signature/',
      formDataToSend,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return new NextResponse(JSON.stringify(response.data), { headers: corsHeaders });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Axios error:', error.response?.data || error.message);
    } else {
      console.error('Unexpected error:', error);
    }
    return new NextResponse('Internal Server Error', { status: 500, headers: corsHeaders });
  }
}
