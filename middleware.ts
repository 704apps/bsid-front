import { NextRequest, NextResponse } from 'next/server';
import jwt, { JwtPayload } from 'jsonwebtoken';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  
  if (!token) {
    return redirectToLogin(request);
  }

  try {
    const decoded = jwt.decode(token) as JwtPayload;

    if (!decoded || !decoded.exp || Date.now() >= decoded.exp * 1000) {
      return redirectToLogin(request);
    }
  } catch (error) {
    return redirectToLogin(request);
  }

  return NextResponse.next();
}

function redirectToLogin(request: NextRequest) {
  const url = request.nextUrl.clone();
  url.pathname = '/login';
  return NextResponse.redirect(url);
}

export const config = {
  matcher: ['/', '/painel'],
};
