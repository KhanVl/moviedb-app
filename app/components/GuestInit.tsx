'use client';

import { useEffect } from 'react';

export default function GuestInit() {
  useEffect(() => {
    fetch('/api/guest', { cache: 'no-store' }).catch(() => {});
  }, []);

  return null;
}
