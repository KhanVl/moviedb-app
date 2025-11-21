export const TMDB_BASE = 'https://api.themoviedb.org/3';

export function tmdbUrl(path: string, params: Record<string, string | number | boolean> = {}) {
  const u = new URL(`${TMDB_BASE}${path}`);
  const apiKey = process.env.TMDB_API_KEY!;
  u.searchParams.set('api_key', apiKey);
  for (const [k, v] of Object.entries(params)) u.searchParams.set(k, String(v));
  return u.toString();
}
