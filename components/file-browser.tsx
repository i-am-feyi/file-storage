"use client";

import FileCard from "./file-card";
import FileFilter from "./file-filter";
import { useQuery } from "convex/react";
import { Fragment } from "react";
import { Grid, Loader2, Rows2 } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useOrganization, useUser } from "@clerk/nextjs";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { SearchBar } from "./search-bar";
import { useFileFilterStore } from "@/hooks/use-file-filter";

interface FileBrowserProps {
  mode: "all" | "favorites" | "trash";
}

const FileBrowser = ({ mode }: FileBrowserProps) => {
  const { isLoaded, organization } = useOrganization();
  const { user } = useUser();

  const { type } = useFileFilterStore();

  const orgId = organization?.id ?? user?.id;

  const files = useQuery(
    api.files.getFiles,
    isLoaded
      ? {
          orgId: orgId!,
          favorites: mode === "favorites" && true,
          deletedOnly: mode === "trash" && true,
          type: type !== "all" ? type : undefined,
        }
      : "skip"
  );

  const favorites = useQuery(api.files.getAllFavorites, orgId ? { orgId } : "skip");

  const modifiedFiles =
    files?.map((file) => ({
      ...file,
      isFavorited: (favorites ?? []).some((favorite) => favorite.fileId === file._id),
    })) ?? [];

  const isLoading = files === undefined;

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
      <SearchBar query="" setQuery={() => {}} />

      <TabsContent value="grid" className="w-full">
        {isLoading && <Loader2 />}
        <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-4">
          {modifiedFiles?.map((file) => (
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
