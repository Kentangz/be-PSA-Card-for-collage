"use client";

import { FaUser } from "react-icons/fa";
import { useEffect, useState } from "react";
import Link from "next/link";
import { GoSignOut } from "react-icons/go";

export default function ProfileMenu() {
  const [profileMenu, setProfileMenu] = useState(false);
  const [name, setName] = useState("admin")

  return <div className="relative">
    <button onClick={() => setProfileMenu(!profileMenu)}
      className="flex items-center justify-center h-10 font-medium w-10 text-xl text-white rounded-full bg-neutral-800 cursor-pointer">
      <FaUser />
    </button>
    <div className={`${!profileMenu && "hidden"} bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 rounded p-2 w-60 absolute top-12 right-0`}>
      <div className="flex items-center gap-2 p-2 mb-2">
        <div
          className="flex items-center justify-center h-10 font-medium w-10 text-xl rounded-full bg-neutral-700 text-white">
          <FaUser />
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-neutral-700 dark:text-neutral-400 font-light">{name}@gmail.com</p>
        </div>
      </div>
      {/* <Link href={`/profile/`} onClick={() => setProfileMenu(false)} className="hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center gap-2 p-2 rounded text-sm"> */}
      {/*   <FaUser /> */}
      {/*   View Profile */}
      {/* </Link> */}
      <button className="hover:bg-red-500/20 flex items-center gap-2 w-full p-2 rounded cursor-pointer text-sm"><GoSignOut />Sign out</button>
    </div>
  </div>
}
