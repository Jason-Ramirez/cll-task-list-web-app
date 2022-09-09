import { NextResponse } from 'next/server';
import { $post } from './composables/fetch';

let reqLoginToken;

const validateToken = async (token) => {
  try {
    const jsonResponse = await $post('/validateToken', { token });
    if (jsonResponse?.success) return jsonResponse.data.is_token_valid
    return true;
  } catch (error) {
    return true
  }
}

const gotoLogin = (req) => {
  const loginUrl = new URL('/login', req.url);
  return NextResponse.redirect(loginUrl);
}

export async function middleware(request) {
  if (!reqLoginToken) {
    reqLoginToken = request.nextUrl.searchParams.get('token');
  }

  if (request.nextUrl.pathname.startsWith('/login') && reqLoginToken) {
    const home = new URL('/', request.url);
    return NextResponse.redirect(home);
  }

  if (request.nextUrl.pathname.startsWith('/logout')) {
    reqLoginToken = null;
    return gotoLogin(request);
  }

  if ((request.nextUrl.pathname == '/') && !reqLoginToken) {
    return gotoLogin(request);
  }
  
  if ((request.nextUrl.pathname == '/') && reqLoginToken) {
    const isTokenValid = await validateToken(reqLoginToken);
    if (!isTokenValid) {
      return gotoLogin(request);
    }
  }
}