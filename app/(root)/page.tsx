"use client";

import { Button } from "@/components/ui/button";
import UploadModal from "@/components/upload-modal";
import { useUploadModal } from "@/hooks/use-upload-modal";
import Image from "next/image";

export default function Home() {
  const { onOpen } = useUploadModal();
  return (
    <section className="py-10">
      <div className="container">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Your Files</h1>
          </div>
          <div>
            <Button onClick={onOpen}>Upload File</Button>
          </div>
        </div>
      </div>
      <UploadModal />
    </section>
  );
}
