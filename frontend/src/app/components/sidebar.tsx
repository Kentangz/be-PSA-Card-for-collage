"use client";

import Link from "next/link";
import ToggleTheme from "./toggle-theme";
import { IconType } from "react-icons";
import { usePathname } from "next/navigation";

type SidebarMenuType = {
  title: string,
  icon: IconType,
  link: string
}

interface SidebarType {
  menu: SidebarMenuType[]
}

export default function Sidebar({ menu }: SidebarType) {
  const pathname = usePathname();
  console.log(pathname);

  return <div className="min-w-60 fixed top-4 bottom-4 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded px-2 flex flex-col justify-between">
    <div>
      {/* LOGO */}
      <div className="text-center mb-5 flex justify-between border-b border-neutral-200 dark:border-neutral-700 px-2 h-14 items-center">
        <h2 className="font-bold italic underline">Logo here</h2>
        <ToggleTheme />
      </div>

      {/* MENU */}
      {
        menu.map((item, i) => (
          <Link
            key={i}
            href={item.link}
            className={`flex items-center gap-2 hover:bg-neutral-200 dark:hover:bg-neutral-700 p-2 rounded ${pathname === item.link && "bg-neutral-700"}`}
          >
            <item.icon className="text-xl" /> {item.title}
          </Link>
        ))
      }
    </div>
  </div>
}
