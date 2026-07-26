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

  return (
    <div className="flex min-h-[50vh] items-center justify-center px-5 py-24">
      <p className="font-[family-name:var(--font-ibm-plex-mono)] text-[12px] uppercase tracking-[0.08em] text-[#7d766a]">
        Refreshing session...
      </p>
    </div>
  );
}
