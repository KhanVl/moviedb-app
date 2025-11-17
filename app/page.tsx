import { Movie } from './types';
import { MovieList } from './components/MovieList';

async function getMovies(): Promise<Movie[]> {
  const apiKey = process.env.TMDB_API_KEY;

  if (!apiKey) {
    throw new Error('TMDB_API_KEY is not set in .env.local');
  }

  const url = `https://api.themoviedb.org/3/search/movie?query=return&language=en-US&page=1&api_key=${apiKey}`;

  const res = await fetch(url, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch movies from TMDB');
  }

  const data = await res.json();
  return data.results as Movie[];
}

export default async function HomePage() {
  const movies = await getMovies();

  return (
    <main style={{ padding: 24, maxWidth: 1200, margin: '0 auto' }}>
      <MovieList movies={movies} />
    </main>
  );
}
