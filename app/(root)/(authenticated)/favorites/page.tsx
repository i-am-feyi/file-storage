import FileBrowser from "@/components/file-browser";
import PageTitle from "@/components/page-title";
import React from "react";

const Favorites = () => {
  return (
    <div className="grid gap-8 w-full">
      <PageTitle title="Your Favorites" />

      <div>
        <FileBrowser mode="favorites" />
      </div>
    </div>
  );
};

export default Favorites;
