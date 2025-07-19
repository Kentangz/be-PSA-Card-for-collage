import Sidebar from "@/app/components/sidebar";
import { ImHome } from "react-icons/im";

const menu = [
  {
    title: "home",
    link: "/home",
    icon: ImHome
  }
]

export default function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return <>
    <Sidebar menu={menu} />
    <div className="flex-grow p-4 ps-64">
      {children}
    </div>
  </>
}
