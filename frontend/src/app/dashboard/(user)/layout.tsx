"use client";

import ProfileMenu from "@/app/components/profile-menu"
import Sidebar from "@/app/components/sidebar"
import UserNotification from "@/app/components/user-notification"
import { ImHome } from "react-icons/im"

const menu = [
  {
    title: "home",
    link: "/dashboard",
    icon: ImHome
  }
]

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  return <>
    <Sidebar menu={menu} />
    <nav className="w-full pl-62 mt-4">
      <div className="h-14 flex justify-between items-center px-2">
        <p className="text-xl font-medium">dashboard</p>
        <div className="flex items-center gap-4">
          <UserNotification />
          <ProfileMenu />
        </div>
      </div>
    </nav>

    <div className="flex-grow p-4 ps-64">
      {children}
    </div>
  </>
}
