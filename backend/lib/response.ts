import { NextResponse } from 'next/server';
import { withCors } from './cors';
import type { ApiResponse } from '@/types';

export const ok = <T>(data: T, message = 'OK', init?: ResponseInit) => {
  return withCors(
    NextResponse.json<ApiResponse<T>>(
      { success: true, message, data },
      { status: init?.status || 200, headers: init?.headers },
    ),
  );
};

export const created = <T>(data: T, message = 'Created') => ok(data, message, { status: 201 });

export const fail = (message: string, status = 400, error?: unknown) => {
  const errorMessage = error instanceof Error ? error.message : typeof error === 'string' ? error : undefined;
  return withCors(
    NextResponse.json<ApiResponse>(
      { success: false, message, error: errorMessage },
      { status },
    ),
  );
};

export const paginated = <T>(
  data: T,
  pagination: { page: number; limit: number; total: number; totalPages: number },
  message = 'OK',
) => {
  return withCors(
    NextResponse.json<ApiResponse<T>>({ success: true, message, data, pagination }, { status: 200 }),
  );
};
