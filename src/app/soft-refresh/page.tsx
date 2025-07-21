'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function SoftRefresh() {
  const router = useRouter();
  const params = useSearchParams();
  const redirectPath = params.get('redirect') || '/';
  const currentUrl = window.location.href;
  const returnUrl = 'https://auth.kycombinator.com?redirect=' + encodeURIComponent(currentUrl + redirectPath);

  useEffect(() => {
    fetch('https://api.kycombinator.com/auth/refresh', {
      method: 'POST',
      credentials: 'include',
    }).then((res) => {
      console.log("res", res);
      if (res.ok) {
        router.replace(redirectPath);
      } else {
        router.replace(returnUrl);
      }
    });
  }, [redirectPath, router]);

  return <p className="text-center p-8">Refreshing session...</p>;
}
