import PageTitle from "@/components/page-title";
import FileBrowser from "@/components/file-browser";

export default function Home() {
  return (
    <div className="w-full">
      <PageTitle title="All Files" />

      <div className="mt-10">
        <FileBrowser mode="all" />
      </div>
    </div>
  );
}
