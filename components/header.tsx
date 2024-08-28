"use client";

import { OrganizationSwitcher, SignedIn, SignInButton, UserButton } from "@clerk/nextjs";
import { Authenticated, Unauthenticated } from "convex/react";
import React from "react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div>
      Header
      <SignedIn></SignedIn>
      <Authenticated>
        <OrganizationSwitcher />
        <UserButton />
      </Authenticated>
      <Unauthenticated>
        <SignInButton>
          <Button>Sign in</Button>
        </SignInButton>
      </Unauthenticated>
    </div>
  );
};

export default Header;
