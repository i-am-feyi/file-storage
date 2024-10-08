"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Download, MoreVertical, Star, Trash2 } from "lucide-react";
import { useConfirmModal } from "@/hooks/use-confirm-modal";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { formatRelative } from "date-fns";
import { fileTypeIcons } from "@/constants";
import { twMerge } from "tailwind-merge";
import { Protect, useUser } from "@clerk/nextjs";

const FileCardActions = ({
  file,
}: {
  file: Doc<"files"> & { url: string | null; isFavorited: boolean };
}) => {
  const { onOpen, setOnConfirm } = useConfirmModal();

  const user = useQuery(api.users.current, {});

  const deleteFile = useMutation(api.files.deleteFile);
  const toggleFavorite = useMutation(api.files.toggleFavorite);

  const onCallDelete = async () => {
    await deleteFile({ fileId: file.fileId });
    toast.success("File deleted successfully ✅", {
      duration: 3000,
    });
  };

  const onDeleteClick = () => {
    onOpen();
    setOnConfirm(onCallDelete);
  };

  const onFavoriteClick = async () => {
    const initalStateIsFavorited = file.isFavorited;
    toast.promise(
      toggleFavorite({
        fileId: file.fileId,
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
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <a
          href={file.url!}
          download={file.name}
          target="_blank"
          rel="noopener noreferrer"
        >
          <DropdownMenuItem className="flex gap-1 items-center cursor-pointer">
            <Download className="size-4" />
            <span className="">Download</span>
          </DropdownMenuItem>
        </a>
        <DropdownMenuItem
          className="flex gap-1 items-center  cursor-pointer"
          onClick={onFavoriteClick}
        >
          <Star
            className={twMerge(
              "size-4",
              file.isFavorited && "fill-orange-500 text-orange-500"
            )}
          />
          <span className="">{file.isFavorited ? "Unfavorite" : "Favorite"}</span>
        </DropdownMenuItem>

        <Protect
          condition={(check) => {
            return (
              check({
                role: "org:admin",
              }) || file.userId === user?._id
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
};

const FileCard = ({
  file,
}: {
  file: Doc<"files"> & { url: string | null; isFavorited: boolean };
}) => {
  const fileCreator = useQuery(api.users.getUserProfile, {
    userId: file.userId,
  });
  return (
    <Card className="flex flex-col justify-between">
      <CardHeader className="relative">
        <CardTitle className="flex justify-between">
          <div className="flex gap-1 items-center">
            {fileTypeIcons[file.type]}
            {/* <ImageIcon /> */}
            <span className="text-lg font-normal capitalize">{file.name}</span>
          </div>
        </CardTitle>
        <div className="absolute right-5 top-5">
          <FileCardActions file={file} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex-1 flex flex-co justify-center items-center object-contain h-40">
          {file.url && file.type === "image" ? (
            <Image
              src={file.url}
              alt={file.name}
              width={200}
              height={100}
              className="object-contain h-full w-full"
            />
          ) : (
            <div className="*:size-16">{fileTypeIcons[file.type]}</div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="flex gap-2 text-xs text-gray-700 w-40 items-center">
          <Avatar className="w-6 h-6">
            <AvatarImage src={fileCreator?.image} />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
          {fileCreator?.name}
        </div>
        <div className="text-xs text-gray-700 first-letter:capitalize">
          {formatRelative(new Date(file._creationTime), new Date())}
        </div>
      </CardFooter>
    </Card>
  );
};

export default FileCard;
