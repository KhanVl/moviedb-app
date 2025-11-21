import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import './globals.css';
import NetworkBanner from './components/NetworkBanner';
import { GenresProvider } from './providers/GenresProvider';
import { tmdbUrl } from '@/lib/tmdb';
import type { Genre } from './types';
import GuestInit from './components/GuestInit';

export const metadata: Metadata = {
  title: 'MovieDB App',
  description: 'Movie search app using TMDB and Next.js',
};

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

async function getGenres(): Promise<Genre[]> {
  const res = await fetch(tmdbUrl('/genre/movie/list', { language: 'en-US' }), {
    cache: 'force-cache',
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.genres ?? []) as Genre[];
}

async function initGuest() {
  try {
    await fetch(`${BASE_URL}/api/guest`, { cache: 'no-store' });
  } catch (err) {
    console.error('Failed to init guest session', err);
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const genres = await getGenres();
  await initGuest();

  return (
    <html lang="en">
      <body>
        <ConfigProvider>
          <NetworkBanner />
          <GenresProvider genres={genres}>
            <GuestInit />
            {children}
          </GenresProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
