"use client";

import { OrganizationSwitcher, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

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
          <div className="flex items-center gap-4">
            <OrganizationSwitcher />
            <UserButton />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
