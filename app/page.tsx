"use client";

import {  SignInButton, UserButton, UserProfile } from "@clerk/nextjs";
import { useConvexAuth } from "convex/react";

export default function Home() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  if (isLoading) {
    return <div>Loading....</div>;
  }
  if (!isLoading && !isAuthenticated) {
    return (
      <div>
        <h1>Landing page</h1>
        <SignInButton
          mode="modal"
          // signUpFallbackRedirectUrl="/"
          signUpForceRedirectUrl="/"
        >
          <button>Sign in</button>
        </SignInButton>
      </div>
    );
  }
  return (
    <div>
      <span>Landing Page</span>
      <p>Start now</p>
      <UserButton />
    </div>
  );
}
