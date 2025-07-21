// app/cors-test/page.tsx
'use client';

import { useEffect, useState } from 'react';

export default function CorsTestPage() {
  const [result, setResult] = useState<string>("Pending...");

  useEffect(() => {
    fetch("https://api.kycombinator.com/auth/corstest", {
      method: "GET",
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setResult(data.message))
      .catch((err) => {
        console.error("CORS error:", err);
        setResult("CORS Failed");
      });
  }, []);

  return (
    <main className="p-8 text-center">
      <h1 className="text-xl font-bold mb-4">CORS Test</h1>
      <p>{result}</p>
    </main>
  );
}
