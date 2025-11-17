import type { Metadata } from 'next';
import { ConfigProvider } from 'antd';
import 'antd/dist/reset.css'; // для Ant Design 5
import './globals.css';

export const metadata: Metadata = {
  title: 'MovieDB App',
  description: 'Movie search app using TMDB and Next.js',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider>{children}</ConfigProvider>
      </body>
    </html>
  );
}
