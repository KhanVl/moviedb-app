'use client';

import { Tabs } from 'antd';
import { usePathname, useRouter } from 'next/navigation';

export default function TabsHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const active = pathname === '/rated' ? 'rated' : 'search';

  return (
    <Tabs
      activeKey={active}
      items={[
        { key: 'search', label: 'Search' },
        { key: 'rated', label: 'Rated' },
      ]}
      onChange={(k) => router.push(k === 'rated' ? '/rated' : '/')}
    />
  );
}
