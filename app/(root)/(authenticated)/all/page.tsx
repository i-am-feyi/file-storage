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
import { File, Grid, Rows2, Star, Trash } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Home() {
  const { onOpen } = useUploadModal();
  const { isLoaded, organization } = useOrganization();
  const { user } = useUser();

  const orgId = organization?.id ?? user?.id;

  const files = useQuery(api.files.getFiles, isLoaded ? { orgId: orgId! } : "skip");

  if (files === undefined) return null;
  return (
    <>
      <div className="grid gap-8 w-full">
        <div className="flex justify-between items-center">
          <div className="flex-1">
            <h1 className="text-4xl font-bold">Your Files</h1>
          </div>
          <div>
            <Button onClick={onOpen} className="font-semibold">
              Upload File
            </Button>
          </div>
        </div>

        <div>
          <Tabs defaultValue="grid">
            <div className="mb-6 flex justify-between">
              <TabsList>
                <TabsTrigger value="grid" className="flex gap-2 items-center">
                  <Grid />
                  <span>Grid</span>
                </TabsTrigger>
                <TabsTrigger value="table" className="flex gap-2 items-center">
                  <Rows2 />
                  <span>Table</span>
                </TabsTrigger>
              </TabsList>
              <div className="flex gap-2 items-center">
                <span className="font-semibold">Type Filter</span>

                <Select>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="All" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="image">Images</SelectItem>
                      <SelectItem value="video">Videos</SelectItem>
                      <SelectItem value="document">Documents</SelectItem>
                      <SelectItem value="archive">Archives</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <TabsContent value="grid" className="w-full">
              <div className="grid grid-cols-3 gap-4">
                {files?.map((file) => (
                  <Fragment key={file.fileId}>
                    <FileCard file={file} />
                  </Fragment>
                ))}
              </div>
            </TabsContent>
            <TabsContent value="table">Change your password here.</TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  );
}
