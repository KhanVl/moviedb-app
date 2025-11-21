import { cookies } from 'next/headers';
import { MovieList } from '../components/MovieList';
import TabsHeader from '../components/TabsHeader';
import { tmdbUrl } from '@/lib/tmdb';
import type { Movie } from '../types';

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

async function ensureGuestId(): Promise<string> {
  const cookieStore = await cookies();
  const existing = cookieStore.get('tmdb_guest_id')?.value;
  if (existing) return existing;

  const res = await fetch(`${BASE_URL}/api/guest`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to init guest session');

  const data = await res.json().catch(() => ({}));
  const id = data.guest_session_id as string | undefined;
  if (!id) throw new Error('No guest_session_id in /api/guest response');

  return id;
}

async function getRatedMovies(): Promise<Movie[]> {
  const guestId = await ensureGuestId();

  const res = await fetch(
    tmdbUrl(`/guest_session/${guestId}/rated/movies`, {
      language: 'en-US',
      sort_by: 'created_at.desc',
      page: 1,
    }),
    { cache: 'no-store' },
  );

  if (!res.ok) return [];
  const data = await res.json();
  return (data.results ?? []) as Movie[];
}

export default async function RatedPage() {
  const movies = await getRatedMovies();

  return (
    <main style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <TabsHeader />
      <MovieList movies={movies} />
    </main>
  );
}
