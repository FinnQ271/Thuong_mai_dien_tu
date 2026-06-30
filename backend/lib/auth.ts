import jwt from 'jsonwebtoken';
import type { NextRequest } from 'next/server';
import type { JwtUser } from '@/types';

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret === 'replace_this_with_a_long_random_secret') {
    throw new Error('Missing JWT_SECRET. Please set a long random JWT_SECRET in .env');
  }
  return secret;
};

export const signToken = (user: JwtUser) => {
  const expiresIn = process.env.JWT_EXPIRES_IN || '7d';
  return jwt.sign(user, getJwtSecret(), { expiresIn: expiresIn as any });
};

export const verifyToken = (token: string): JwtUser => {
  return jwt.verify(token, getJwtSecret()) as JwtUser;
};

export const getBearerToken = (request: NextRequest) => {
  const authHeader = request.headers.get('authorization') || '';
  if (!authHeader.startsWith('Bearer ')) return null;
  return authHeader.slice('Bearer '.length).trim();
};

export const requireUser = (request: NextRequest): JwtUser => {
  const token = getBearerToken(request);
  if (!token) {
    throw new Error('Missing Authorization Bearer token');
  }
  return verifyToken(token);
};

export const requireAdmin = (request: NextRequest): JwtUser => {
  const user = requireUser(request);
  if (user.roleLevel < 80) {
    throw new Error('Bạn không có quyền admin để thực hiện thao tác này');
  }
  return user;
};

export const requireSuperAdmin = (request: NextRequest): JwtUser => {
  const user = requireUser(request);
  if (user.roleLevel < 100) {
    throw new Error('Bạn không có quyền super admin để thực hiện thao tác này');
  }
  return user;
};
