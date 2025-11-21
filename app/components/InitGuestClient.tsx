'use client';

import { useEffect } from 'react';

export default function InitGuestClient() {
  useEffect(() => {
    fetch('/api/guest', { cache: 'no-store' }).catch(() => {});
  }, []);

  return null;
}
