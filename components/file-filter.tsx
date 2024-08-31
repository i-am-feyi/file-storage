"use client";

import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useFileFilterStore } from "@/hooks/use-file-filter";

const FileFilter = () => {
  const { setType } = useFileFilterStore();
  const [filter, setFilter] = useState("all");

  const onFilterSelect = (filter: any) => {
    setFilter(filter);
    setType(filter);
  };
  return (
    <div className="flex gap-2 items-center">
      <span className="font-semibold">Type Filter</span>

      <Select value={filter} onValueChange={onFilterSelect}>
        <SelectTrigger className="w-[180px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="image">Image</SelectItem>
            <SelectItem value="video">Video</SelectItem>
            <SelectItem value="audio">Audio</SelectItem>
            <SelectItem value="archive">Archive</SelectItem>
            <SelectItem value="document">Document</SelectItem>
            <SelectItem value="others">Other</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FileFilter;
