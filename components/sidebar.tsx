"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebar_links } from "@/constants";
import { twMerge } from "tailwind-merge";

const Sidebar = () => {
  const pathname = usePathname();

  return (
    <div className="grid w-52">
      <ul className="flex flex-col gap-3">
        {sidebar_links.map(({ href, label, Icon }) => {
          const isActive = pathname.match(href);
          return (
            <Link href={href}>
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
