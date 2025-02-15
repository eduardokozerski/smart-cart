import { NextResponse } from 'next/server';

export function middleware(request: Request) {
  const allowedOrigins = [
    'https://smart-cart-91g0mlb27-eduardokozerskis-projects.vercel.app',
    'http://localhost:3000',
  ];
  
  const origin = request.headers.get('Origin');
  
  if (allowedOrigins.includes(origin || '')) {
    const response = NextResponse.next();
    response.headers.set('Access-Control-Allow-Origin', origin || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    return response;
  }
  
  return NextResponse.next();
}