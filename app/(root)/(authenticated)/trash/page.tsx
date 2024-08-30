import FileBrowser from "@/components/file-browser";
import PageTitle from "@/components/page-title";
import React from "react";

const Trash = () => {
  return (
    <div className="w-full">
      <PageTitle title="Trash" />

      <div className="mt-10">
        <FileBrowser mode="trash" />
      </div>
    </div>
  );
};

export default Trash;
