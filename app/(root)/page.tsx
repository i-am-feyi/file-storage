import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const page = () => {
  return (
    <section className="py-16 md:py-48">
      <div className="container ">
        <div className="grid items-center text-center max-w-2xl mx-auto">
          <h1 className="text-6xl font-semibold tracking-tighter">
            Welcome to the new age of cloud storage.
          </h1>
          <p className="text-xl text-black/50 mt-6">
            Effortlessly secure your files in the cloud and access them from anywhere,
            anytime. Get started for free.
          </p>
        </div>
        <div className="flex items-center justify-center gap-8 mt-12">
          <Button size="lg" className=" font-semibold" asChild>
            <Link href="/sign-up" className="inline-flex gap-2">
              <span>Get started</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="lg"
            className="bg-slate-100 font-semibold text-black/80"
          >
            Learn more
          </Button>
        </div>

        <div className="py-16 flex justify-center">
          <Image
            src="/images/dashboard.png"
            alt="dashboard"
            width={1200}
            height={100}
            className="rounded-xl md:rounded-[3rem] lg:rounded-[5rem]"
          />
        </div>
      </div>
    </section>
  );
};

export default page;
