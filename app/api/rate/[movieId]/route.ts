import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { tmdbUrl } from '@/lib/tmdb';

export async function POST(req: Request, { params }: { params: Promise<{ movieId: string }> }) {
  const { movieId } = await params;
  console.log('RATE ROUTE movieId =', movieId);

  const body = await req.json().catch(() => ({}));
  const value = Number(body?.value);

  if (!Number.isFinite(value) || value < 0.5 || value > 10) {
    return NextResponse.json({ error: 'value must be between 0.5 and 10' }, { status: 400 });
  }

  const cookieStore = await cookies();
  const guest = cookieStore.get('tmdb_guest_id')?.value;

  if (!guest) {
    return NextResponse.json({ error: 'No guest session' }, { status: 401 });
  }

  const url = tmdbUrl(`/movie/${movieId}/rating`, {
    guest_session_id: guest,
  });

  const tmdbRes = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json;charset=utf-8' },
    body: JSON.stringify({ value }),
    cache: 'no-store',
  });

  const data = await tmdbRes.json().catch(() => ({}));

  if (!tmdbRes.ok) {
    console.error('TMDB rate error', tmdbRes.status, data);
    return NextResponse.json(data || { error: 'Failed to rate at TMDB' }, {
      status: tmdbRes.status || 500,
    });
  }

  return NextResponse.json({ ok: true, data });
}
