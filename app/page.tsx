"use client";

import { Loading } from "@/components/Loading";
import { Logo } from "@/components/Logo";
import { SignInButton } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { isLoading, isAuthenticated } = useConvexAuth();
  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }
  if (!isLoading && !isAuthenticated) {
    return (
      <main className="h-full w-full flex flex-col justify-center items-center gap-6">
        <Logo size="Icon" />
        <SignInButton
          mode="modal"
          signUpFallbackRedirectUrl="/my-documents"
          signUpForceRedirectUrl="/my-documents"
        >
          <button className="bg-blue-800 text-white flex items-center py-2 px-6 rounded-sm gap-2">
            <span className="">Start</span>
            <ArrowRight className="h-4 w-4"/>
          </button>
        </SignInButton>
      </main>
    );
  }

  if (!isLoading && isAuthenticated) {
    router.push("/my-documents");
  }
}
