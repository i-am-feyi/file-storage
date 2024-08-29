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

const FileCardActions = () => {
  const { onOpen } = useConfirmModal();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus-visible:outline-none">
        <MoreVertical className="size-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          className="flex gap-1 text-red-500 items-center hover:text-red-500 cursor-pointer"
          onClick={onOpen}
        >
          <Trash2 className="size-5 hover:text-red-500" />
          <span className="font-semibold hover:text-red-500">Delete</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const FileCard = () => {
  return (
    <Card>
      <CardHeader className="relative">
        <CardTitle className="flex justify-between">
          <span>Screenshot</span>
        </CardTitle>
        <div className="absolute right-5 top-5">
          <FileCardActions />
        </div>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default FileCard;
