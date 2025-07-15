import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { api } from '../../api';
import { parse } from 'cookie';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (accessToken) {
    return NextResponse.json({success: true});
  }

  if (refreshToken) {
    const apiRes = await api.get('auth/session', {
      headers: {
        Cookie: cookieStore.toString(),
      },
    });
    const setCookie = apiRes.headers['set-cookie'];
    if (setCookie) {
      const cookieArray = Array.isArray(setCookie) ? setCookie : [setCookie];
      let accessToken = '';
      let refreshToken = '';

      for (const cookieStr of cookieArray) {
        const parsed = parse(cookieStr);
        if (parsed.accessToken) accessToken = parsed.accessToken;
        if (parsed.refreshToken) refreshToken = parsed.refreshToken;
      }

      if (accessToken) cookieStore.set('accessToken', accessToken);
      if (refreshToken) cookieStore.set('refreshToken', refreshToken);

      return NextResponse.json({success: true});
    }
  }
  return NextResponse.json({success: false});
}