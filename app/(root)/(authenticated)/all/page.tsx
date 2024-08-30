import PageTitle from "@/components/page-title";
import FileBrowser from "@/components/file-browser";

export default function Home() {
  return (
    <div className="grid gap-8 w-full">
      <PageTitle title="Your Files" />

      <div>
        <FileBrowser />
      </div>
    </div>
  );
}
