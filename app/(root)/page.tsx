import { Button } from "@/components/ui/button";
import UploadModal from "@/components/upload-modal";
import Image from "next/image";

export default function Home() {
  return (
    <section className="py-10">
      <div className="container">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Your Files</h1>
          </div>
          <div>
            <Button>Upload File</Button>
          </div>
        </div>
      </div>
      <UploadModal />
    </section>
  );
}
