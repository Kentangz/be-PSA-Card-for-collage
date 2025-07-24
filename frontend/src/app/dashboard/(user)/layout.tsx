"use client";

import ProfileMenu from "@/app/components/profile-menu"
import Sidebar from "@/app/components/sidebar"
import UserNotification from "@/app/components/user-notification"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ImHome } from "react-icons/im"
import { MdAssignmentAdd, MdTrackChanges } from "react-icons/md";

const menu = [
  {
    title: "home",
    link: "/dashboard",
    icon: ImHome
  },
  {
    title: "create submission",
    link: "/dashboard/submission",
    icon: MdAssignmentAdd
  },
  {
    title: "track submission",
    link: "/dashboard/tracking",
    icon: MdTrackChanges
  },
]

export default function UserDashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const getCurrentUser = async () => {
      const currentUser = await axios.get("/api/auth/current-user") as any;
      console.log(currentUser);
      if (currentUser.data.role === "admin") {
        router.push("/dashboard/admin");
      }
    }
    getCurrentUser();
  }, []);

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
