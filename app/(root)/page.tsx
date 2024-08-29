"use client";

import FileCard from "@/components/file-card";
import { Button } from "@/components/ui/button";
import UploadModal from "@/components/modals/upload-modal";
import { useUploadModal } from "@/hooks/use-upload-modal";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Fragment } from "react";

export default function Home() {
  const { onOpen } = useUploadModal();
  const { isLoaded, organization } = useOrganization();
  const { user } = useUser();

  const orgId = organization?.id ?? user?.id;

  const files = useQuery(api.files.getFiles, isLoaded ? { orgId: orgId! } : "skip");

  if (files === undefined) return null;
  return (
    <>
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
      <section>
        <div className="container">
          <div className="grid grid-cols-4 gap-4">
            {files?.map((file) => (
              <Fragment key={file.fileId}>
                <FileCard file={file} />
              </Fragment>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
