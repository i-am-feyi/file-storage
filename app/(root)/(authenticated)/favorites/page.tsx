import FileBrowser from "@/components/file-browser";
import PageTitle from "@/components/page-title";
import React from "react";

const Favorites = () => {
  return (
    <div className="w-full">
      <PageTitle title="Favorites" />

      <div className="mt-10">
        <FileBrowser mode="favorites" />
      </div>
    </div>
  );
};

export default Favorites;
