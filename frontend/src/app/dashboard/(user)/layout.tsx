"use client";

import ProfileMenu from "@/app/components/profile-menu"
import Sidebar from "@/app/components/sidebar"
import UserNotification from "@/app/components/user-notification"
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
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
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const getCurrentUser = async () => {
      const user = await axios.get("/api/auth/current-user") as any;
      if (user.data.role === "admin") {
        router.push("/dashboard/admin");
      }
      setCurrentUser(user.data);
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
          <ProfileMenu currentUser={currentUser} />
        </div>
      </div>
    </nav>

    <div className="flex-grow p-4 ps-64">
      {children}
    </div>
  </>
}
