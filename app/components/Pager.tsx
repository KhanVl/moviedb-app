'use client';

import { Pagination } from 'antd';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

type Props = {
  total: number;
  current: number;
  pageSize?: number;
};

export default function Pager({ total, current, pageSize = 20 }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  return (
    <Pagination
      total={Math.min(total, 10000)}
      current={current}
      pageSize={pageSize}
      showSizeChanger={false}
      onChange={(page) => {
        const sp = new URLSearchParams(params?.toString() ?? '');
        sp.set('page', String(page));
        router.replace(`${pathname}?${sp.toString()}`, { scroll: true });
      }}
    />
  );
}
