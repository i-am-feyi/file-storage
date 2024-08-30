"use client";

import FileCard from "./file-card";
import FileFilter from "./file-filter";
import { useQuery } from "convex/react";
import { Fragment } from "react";
import { Grid, Rows2 } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

const FileBrowser = () => {
  const { isLoaded, organization } = useOrganization();
  const { user } = useUser();

  const orgId = organization?.id ?? user?.id;

  const files = useQuery(api.files.getFiles, isLoaded ? { orgId: orgId! } : "skip");

  if (files === undefined) return null;
  return (
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
        <FileFilter />
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
  );
};

export default FileBrowser;
