import { getAllUser } from "@/actions/user"
import Link from "next/link"
import { BsEye } from "react-icons/bs"

const fields = [
  {
    label: "Name",
    name: "name",
  },
  {
    label: "Email",
    name: "email"
  },
  {
    label: "Role",
    name: "role"
  },
  {
    label: "Status",
    name: "status"
  },
]

export default async function AdminDashboardUsersPage() {
  const users = await getAllUser();
  console.log(users);

  return <div>
    <h4 className="mb-4 text-lg">Users</h4>
    <div className="flex">
      <div className="border bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-zinc-700 rounded overflow-x-auto">
        <table className="table w-full text-sm text-left rtl:text-right">
          <thead className="">
            <tr>
              {fields.map(field => {
                return <th className="py-3 px-6" key={field.name}>{field.label}</th>
              })}
              <th className="py-3 px-6">Detail</th>
            </tr>
          </thead>
          <tbody className="text-neutral-800 dark:text-neutral-100">
            {users?.data.map((item: Record<string, string | number>, index: number) => (
              <tr key={index}>
                <td className="py-3 px-6 whitespace-nowrap">{item.name}</td>
                <td className="py-3 px-6 whitespace-nowrap">{item.email}</td>
                <td className="py-3 px-6 whitespace-nowrap">{item.role}</td>
                <td className="py-3 px-6 whitespace-nowrap">aktif</td>
                <td className="py-3 px-6 whitespace-nowrap flex justify-center text-xl text-blue-400">
                  <Link href={"/dashboard/admin/users/" + item.id}>
                    <BsEye />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
}
