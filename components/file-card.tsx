"use client";

import React from "react";
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
import { MoreVertical, Trash2 } from "lucide-react";
import { useConfirmModal } from "@/hooks/use-confirm-modal";
import { Doc } from "@/convex/_generated/dataModel";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import toast from "react-hot-toast";

const FileCardActions = ({ file }: { file: Doc<"files"> }) => {
  const { onOpen, setOnConfirm } = useConfirmModal();

  const deleteFile = useMutation(api.files.deleteFile);

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
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex gap-1 text-red-500 items-center hover:text-red-500 cursor-pointer"
          onClick={onDeleteClick}
        >
          <Trash2 className="size-5 hover:text-red-500" />
          <span className="font-semibold hover:text-red-500">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FileCard = ({ file }: { file: Doc<"files"> }) => {
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex justify-between">
          <span>{file.name}</span>
        </CardTitle>
        <div className="absolute right-5 top-5">
          <FileCardActions file={file} />
        </div>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default FileCard;
