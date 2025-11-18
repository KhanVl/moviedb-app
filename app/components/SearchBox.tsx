'use client';

import { Input } from 'antd';
import { useCallback, useEffect, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = { defaultQuery?: string };

export default function SearchBox({ defaultQuery = '' }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const [value, setValue] = useState(defaultQuery);

  const updateUrl = useCallback(
    (q: string) => {
      const sp = new URLSearchParams(params?.toString() ?? '');
      if (q) sp.set('q', q);
      else sp.delete('q');
      sp.set('page', '1');
      router.replace(`${pathname}?${sp.toString()}`, { scroll: true });
    },
    [params, pathname, router],
  );

  const debouncedUpdate = useMemo(() => debounce(updateUrl, 400), [updateUrl]);

  useEffect(() => () => debouncedUpdate.cancel(), [debouncedUpdate]);

  return (
    <div style={{ marginBottom: 16 }}>
      <Input
        size="large"
        placeholder="Type to search..."
        value={value}
        onChange={(e) => {
          const next = e.target.value;
          setValue(next);
          debouncedUpdate(next.trim());
        }}
        allowClear
      />
    </div>
  );
}
