"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LoginRedirectHandler = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "authenticated" && session?.user) {
      // Check if user is admin and redirect accordingly
      if (session.user.role === "ADMIN") {
        router.push("/admin");
        router.refresh();
      } else {
        router.push("/DashboardHomePage");
        router.refresh();
      }
    }
  }, [session, status, router]);

  return null; // This component doesn't render anything
};

export default LoginRedirectHandler;