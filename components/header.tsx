"use client";

import {
  ClerkLoaded,
  ClerkLoading,
  OrganizationSwitcher,
  SignedIn,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";
import Link from "next/link";
import { Loader2 } from "lucide-react";

const Header = () => {
  return (
    <div className="border-b py-3">
      <div className="container">
        <div className="flex justify-between items-center">
          <div className="text-lg font-semibold">
            <Image
              src="/images/upbox-logo.png"
              alt="UpBox Logo"
              width={100}
              height={100}
            />
          </div>
          <ClerkLoading>
            <Loader2 className="animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <Authenticated>
              <div className="flex items-center gap-4">
                <OrganizationSwitcher />
                <UserButton />
              </div>
            </Authenticated>
            <Unauthenticated>
              <div className="flex gap-4">
                <Button variant="ghost" asChild>
                  <Link href="/sign-in" className="bg-slate-200">
                    Sign in
                  </Link>
                </Button>
                {/* <Button asChild>
                  <Link href="/sign-up">Get started</Link>
                </Button> */}
              </div>
            </Unauthenticated>
          </ClerkLoaded>
        </div>
      </div>
    </div>
  );
};

export default Header;
