import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const origin = request.headers.get('origin');
  
  // Define allowed origins patterns (local development ports like 5173, 5176, etc.)
  const isAllowedOrigin = origin && (
    origin.startsWith('http://localhost:') || 
    origin.startsWith('http://127.0.0.1:') ||
    origin.includes('rivoramart') ||
    origin.includes('vercel.app') ||
    origin.includes('thuong-mai-dien-tu')
  );

  const corsHeaders = {
    'Access-Control-Allow-Origin': isAllowedOrigin ? origin : 'http://localhost:5173',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };

  // Handle preflight requests
  if (request.method === 'OPTIONS') {
    return new NextResponse(null, {
      status: 204,
      headers: corsHeaders,
    });
  }

  // Handle normal API requests
  const response = NextResponse.next();
  Object.entries(corsHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });

  return response;
}

// Match all API routes starting with /api/
export const config = {
  matcher: '/api/:path*',
};
