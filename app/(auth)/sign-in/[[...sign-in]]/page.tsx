import Link from "next/link";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="h-full lg:flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-4 pt-16">
          <div className="flex items-center justify-center mb-12">
            <Link href="/">
              <Image src="/images/upbox-logo.png" alt="logo" height={150} width={150} />
            </Link>
          </div>
          <h1 className="font-bold text-3xl text-[#2E2A47]">Welcome Back!</h1>
        </div>
        <div className="flex items-center justify-center mt-8">
          <ClerkLoaded>
            <SignIn path="/sign-in" signUpUrl="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-muted-foreground" />
          </ClerkLoading>
        </div>
      </div>
      <div className="h-full bg-gray-950 hidden lg:flex items-center justify-center">
        <Image src="/images/upbox-icon-white.png" alt="Logo" width={250} height={250} />
      </div>
    </div>
  );
}
