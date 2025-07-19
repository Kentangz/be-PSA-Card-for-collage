"use client";

import { useRef, useState } from "react"
import { BiSolidBell } from "react-icons/bi"

const notifications = [
  {
    message: "your card grade have been upgraded to B",
    is_read: false,
    time: "20 jul 2025"
  },
  {
    message: "your card grade have been upgraded to B",
    is_read: false,
    time: "20 jul 2025"
  },
  {
    message: "your card grade have been upgraded to B",
    is_read: true,
    time: "20 jul 2025"
  }
]

export default function UserNotification() {
  const [isActive, setIsActive] = useState(false);

  return <>
    <button onClick={() => setIsActive(true)} className="relative cursor-pointer h-10 w-10 flex items-center justify-center rounded-full">
      <div className="bg-red-500 text-sm text-white rounded-full w-5 h-5 absolute -top-1 right-0">3</div>
      <BiSolidBell className="text-2xl" />
    </button>

    <div onClick={() => setIsActive(false)} className={`${isActive ? "fixed" : "hidden"} top-0 left-0 right-0 bottom-0 bg-black/20 dark:bg-white/20 backdrop-blur-sm flex items-center justify-center z-50`}>
      <div className="max-w-96 md:max-w-[500px] border border-neutral-200 dark:border-neutral-700 rounded bg-neutral-100 dark:bg-neutral-800 p-4" onClick={e => e.stopPropagation()}>
        <h2 className="text-2xl font-semibold mb-4">Notification</h2>
        <div className="flex flex-col gap-1 max-h-[500px] overflow-auto">
          {notifications.map((notification, i) => (
            <div key={i} className={`border border-neutral-200 dark:border-neutral-700 p-4 dark:text-neutral-100 rounded ${!notification.is_read && "font-medium bg-neutral-200 dark:bg-neutral-700/50 dark:text-white"}`}>
              <p>{notification.message}</p>
              <p className="text-sm text-neutral-600 dark:text-neutral-400">{notification.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
}
