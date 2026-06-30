import { NextResponse } from 'next/server';

export const getCorsHeaders = () => {
  const origin = process.env.FRONTEND_URL || 'http://localhost:5173';

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Methods': 'GET,POST,PATCH,PUT,DELETE,OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Credentials': 'true',
  };
};

export const withCors = <T extends Response>(response: T): T => {
  const headers = getCorsHeaders();
  Object.entries(headers).forEach(([key, value]) => response.headers.set(key, value));
  return response;
};

export const optionsResponse = () => {
  return new NextResponse(null, {
    status: 204,
    headers: getCorsHeaders(),
  });
};
