"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@/components/Auth";
import { useAuth } from "@/hooks/useAuth";

export default function AuthPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/dashboard");
    }
  }, [user, router]);

  return <Auth />;
}
