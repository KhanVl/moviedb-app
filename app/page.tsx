import SearchBox from './components/SearchBox';
import Pager from './components/Pager';
import { MovieList } from './components/MovieList';
import TabsHeader from './components/TabsHeader';
import type { Movie } from './types';

type SP = { q?: string | string[]; page?: string | string[] };

async function getMovies(query: string, page: number) {
  const trimmed = query.trim();

  if (!trimmed) {
    return {
      results: [] as Movie[],
      totalResults: 0,
      page: 1,
      pageSize: 20,
    };
  }

  const apiKey = process.env.TMDB_API_KEY;
  if (!apiKey) throw new Error('TMDB_API_KEY is not set');

  const url = new URL('https://api.themoviedb.org/3/search/movie');
  url.searchParams.set('api_key', apiKey);
  url.searchParams.set('language', 'en-US');
  url.searchParams.set('include_adult', 'false');
  url.searchParams.set('page', String(Math.max(1, page)));
  url.searchParams.set('query', trimmed);

  const res = await fetch(url.toString(), { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch movies');

  const data = await res.json();
  return {
    results: (data.results || []) as Movie[],
    totalResults: Number(data.total_results || 0),
    page: Number(data.page || 1),
    pageSize: 20,
  };
}

function getStringParam(sp: SP | undefined, key: keyof SP, fallback = '') {
  if (!sp) return fallback;
  const v = sp[key];
  if (Array.isArray(v)) return v[0] ?? fallback;
  return (v ?? fallback) as string;
}

function getPositiveInt(sp: SP | undefined, key: 'page', fallback = 1) {
  const s = getStringParam(sp, key, '');
  const n = parseInt(s, 10);
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

export default async function HomePage({ searchParams }: { searchParams: Promise<SP> }) {
  const sp = await searchParams;

  const q = getStringParam(sp, 'q', '').trim();
  const page = getPositiveInt(sp, 'page', 1);

  const { results, totalResults, pageSize } = await getMovies(q, page);

  return (
    <main style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <TabsHeader />
      <div style={{ marginTop: 24, marginBottom: 24 }}>
        <SearchBox defaultQuery={q} />
      </div>

      {q && (
        <>
          <MovieList movies={results} />
          {totalResults > 0 && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
              <Pager total={totalResults} current={page} pageSize={pageSize} />
            </div>
          )}
        </>
      )}
    </main>
  );
}
