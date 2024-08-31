"use client";

import { Doc, Id } from "@/convex/_generated/dataModel";
import { ColumnDef } from "@tanstack/react-table";
import { Download, MoreHorizontal, MoreVertical, Star, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { getFirstLetters } from "@/lib/utils";
import { formatRelative } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useConfirmModal } from "@/hooks/use-confirm-modal";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";
import { twMerge } from "tailwind-merge";
import { Protect } from "@clerk/nextjs";

export type Files = {
  isFavorited: boolean;
  url: string | null;
  _id: Id<"files">;
  _creationTime: number;
  shouldDelete?: boolean | undefined;
  type: any;
  fileId: string;
  name: string;
  orgId: string;
  fileStorageId: Id<"_storage">;
  userId: Id<"users">;
  user: Doc<"users"> | any;
};

export const columns: ColumnDef<Files>[] = [
  {
    accessorKey: "name",
    header: () => {
      return <div className="flex-1 w-full">File Name</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const file = row.original;
      return <p className="first-letter:capitalize">{file.type}</p>;
    },
  },
  {
    accessorFn: ({ user }) => user.fullName,
    header: "Uploaded By",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <div className="inline-flex items-center gap-2">
          <Avatar className="overflow-hidden size-6">
            <AvatarImage
              src={data.user.imageUrl}
              alt={getFirstLetters(data.user.fullName)}
            />
            <AvatarFallback>{getFirstLetters(data.user.fullName)}</AvatarFallback>
          </Avatar>

          <div>{data.user.fullName}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "_creationTime",
    header: "Uploaded On",
    cell: ({ row }) => {
      const data = row.original;

      return (
        <p className="first-letter:capitalize">
          {formatRelative(new Date(data._creationTime), new Date())}
        </p>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => {
      const data = row.original;

      const { onOpen, setOnConfirm } = useConfirmModal();

      const user = useQuery(api.users.current, {});

      const deleteFile = useMutation(api.files.deleteFile);
      const toggleFavorite = useMutation(api.files.toggleFavorite);

      const onCallDelete = async () => {
        await deleteFile({ fileId: data.fileId });
        toast.success("File deleted successfully ✅", {
          duration: 3000,
        });
      };

      const onDeleteClick = () => {
        onOpen();
        setOnConfirm(onCallDelete);
      };

      const onFavoriteClick = async () => {
        const initalStateIsFavorited = data.isFavorited;
        toast.promise(
          toggleFavorite({
            fileId: data.fileId,
          }),
          {
            loading: "Loading...",
            success: () => {
              return initalStateIsFavorited
                ? "File has been removed from favorites."
                : "File has been added to favorites!";
            },
            error: "There was an error completing the action.",
          }
        );
      };
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              className="flex gap-1 items-center cursor-pointer"
              onClick={() => window.open(data.url!, "_blank")}
            >
              <Download className="size-4" />
              Download
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex gap-1 items-center cursor-pointer"
              onClick={onFavoriteClick}
            >
              <Star
                className={twMerge(
                  "size-4",
                  data.isFavorited && "fill-orange-500 text-orange-500"
                )}
              />
              <span className="">{data.isFavorited ? "Unfavorite" : "Favorite"}</span>
            </DropdownMenuItem>

            <Protect
              condition={(check) => {
                return (
                  check({
                    role: "org:admin",
                  }) || data.userId === user?._id
                );
              }}
            >
              <DropdownMenuItem
                className="flex gap-1 text-red-500 items-center hover:text-red-500 cursor-pointer"
                onClick={onDeleteClick}
              >
                <Trash2 className="size-4" />
                <span className="">Delete</span>
              </DropdownMenuItem>
            </Protect>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
