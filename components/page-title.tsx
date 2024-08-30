"use client";

import { Button } from "./ui/button";
import { useUploadModal } from "@/hooks/use-upload-modal";

const PageTitle = ({ title }: { title: string }) => {
  const { onOpen } = useUploadModal();
  return (
    <div className="flex justify-between items-center">
      <div className="flex-1">
        <h1 className="text-4xl font-bold capitalize">{title}</h1>
      </div>
      <div>
        <Button onClick={onOpen} className="font-semibold">
          Upload File
        </Button>
      </div>
    </div>
  );
};

export default PageTitle;
