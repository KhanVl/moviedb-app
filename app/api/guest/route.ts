import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { tmdbUrl } from '@/lib/tmdb';

export async function GET() {
  const cookieStore = await cookies();
  const existing = cookieStore.get('tmdb_guest_id')?.value;

  if (existing) {
    return NextResponse.json({ guest_session_id: existing });
  }

  const tmdbRes = await fetch(tmdbUrl('/authentication/guest_session/new'), {
    cache: 'no-store',
  });

  if (!tmdbRes.ok) {
    const data = await tmdbRes.json().catch(() => ({}));
    console.error('TMDB guest error', tmdbRes.status, data);
    return NextResponse.json(data || { error: 'Failed to create guest session' }, {
      status: tmdbRes.status || 500,
    });
  }

  const data = await tmdbRes.json();
  const id = data.guest_session_id as string | undefined;

  if (!id) {
    return NextResponse.json({ error: 'No guest_session_id' }, { status: 500 });
  }

  const response = NextResponse.json({ guest_session_id: id });

  response.cookies.set('tmdb_guest_id', id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    sameSite: 'lax',
    maxAge: 24 * 60 * 60,
  });

  return response;
}
