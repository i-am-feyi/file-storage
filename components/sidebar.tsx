"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { sidebar_links } from "@/constants";
import { twMerge } from "tailwind-merge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const Sidebar = () => {
  const pathname = usePathname();
  const router = useRouter();

  const onSelectChange = (value: string) => {
    router.push(value);
  };

  return (
    <div className="grid lg:w-52">
      <div className="">
        <Select defaultValue="/all" onValueChange={onSelectChange}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="/all">All Files</SelectItem>
            <SelectItem value="/favorites">Favorites</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <ul className="hidden lg:flex flex-col gap-3">
        {sidebar_links.map(({ href, label, Icon }) => {
          const isActive = pathname.match(href);
          return (
            <Link href={href} key={href}>
              <div
                className={twMerge(
                  "flex gap-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-all",
                  isActive && "bg-gray-200"
                )}
              >
                <Icon />
                <span>{label}</span>
              </div>
            </Link>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
