'use client';

import { Alert } from 'antd';
import { useEffect, useState } from 'react';

export default function NetworkBanner() {
  const [online, setOnline] = useState<boolean>(true);

  useEffect(() => {
    setOnline(typeof navigator !== 'undefined' ? navigator.onLine : true);

    const handleOnline = () => setOnline(true);
    const handleOffline = () => setOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  if (online) return null;

  return (
    <Alert
      banner
      showIcon
      type="warning"
      message="You are offline"
      description="Check your internet connection. Some data may be outdated or unavailable."
    />
  );
}
