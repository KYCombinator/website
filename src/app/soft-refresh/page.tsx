'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SoftRefresh() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectPath = params.get('redirect') || '/';

  useEffect(() => {
    fetch('https://api.kycombinator.com/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    }).then((res) => {
      if (res.ok) {
        router.replace(redirectPath);
      } else {
        router.replace('/login');
      }
    });
  }, [redirectPath, router]);

  return <p className="text-center p-8">Refreshing session...</p>;
}
