import { cookies } from 'next/headers';

export async function ensureGuestId(): Promise<string> {
  const c = await cookies();
  const existing = c.get('tmdb_guest_id')?.value;
  if (existing) return existing;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ''}/api/guest`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to init guest session');
  const data = await res.json();
  return data.guest_session_id as string;
}
