import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css';
import './globals.css';

import NetworkBanner from './components/NetworkBanner';
import { GenresProvider } from './providers/GenresProvider';
import { tmdbUrl } from '@/lib/tmdb';
import type { Genre } from './types';
import InitGuestClient from './components/InitGuestClient';

export const metadata: Metadata = {
  title: 'MovieDB App',
  description: 'Movie search app using TMDB and Next.js',
};

async function getGenres(): Promise<Genre[]> {
  const res = await fetch(tmdbUrl('/genre/movie/list', { language: 'en-US' }), {
    cache: 'force-cache',
  });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.genres ?? []) as Genre[];
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const genres = await getGenres();

  return (
    <html lang="en">
      <body>
        <ConfigProvider>
          <NetworkBanner />
          <InitGuestClient />
          <GenresProvider genres={genres}>{children}</GenresProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
