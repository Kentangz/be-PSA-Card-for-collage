"use client";

import ProfileMenu from "@/app/components/profile-menu";
import Sidebar from "@/app/components/sidebar";
import { BsPeopleFill } from "react-icons/bs";
import { ImHome } from "react-icons/im";
import { MdAssignment } from "react-icons/md";

const menu = [
  {
    title: "home",
    link: "/dashboard/admin",
    icon: ImHome
  },
  {
    title: "users",
    link: "/dashboard/admin/users",
    icon: BsPeopleFill
  },
  {
    title: "submissions",
    link: "/dashboard/admin/submission",
    icon: MdAssignment
  }
]

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return <>
    <Sidebar menu={menu} />
    <nav className="w-full pl-62 mt-4">
      <div className="h-14 flex justify-between items-center px-2">
        <p className="text-xl font-medium">dashboard</p>
        <div className="flex items-center gap-4">
          <ProfileMenu />
        </div>
      </div>
    </nav>
    <div className="flex-grow p-4 ps-64">
      {children}
    </div>
  </>
}
