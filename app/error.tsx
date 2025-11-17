'use client';

import { useEffect } from 'react';
import { Alert, Button } from 'antd';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div style={{ maxWidth: 720, margin: '40px auto', padding: '0 16px' }}>
      <Alert
        message="Something went wrong while loading movies"
        description={
          <div>
            <div style={{ marginBottom: 12 }}>{error.message || 'Unknown error'}</div>
            <Button type="primary" onClick={() => reset()}>
              Try again
            </Button>
          </div>
        }
        type="error"
        showIcon
      />
    </div>
  );
}
