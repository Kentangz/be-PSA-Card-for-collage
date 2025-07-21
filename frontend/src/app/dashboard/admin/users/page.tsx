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
    label: "Phone number",
    name: "phone_number"
  },
  {
    label: "Status",
    name: "status"
  },
]

const tableData = [
  {
    name: "user 1",
    email: "user1@gmail.com",
    phone_number: "123456789",
    status: "active"
  },
  {
    name: "user 2",
    email: "user1@gmail.com",
    phone_number: "123456789",
    status: "nonactive"
  },
  {
    name: "user 3",
    email: "user1@gmail.com",
    phone_number: "123456789",
    status: "active"
  },
]

export default function AdminDashboardUsersPage() {
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
            {tableData.map((item: Record<string, string | number>, index: number) => (
              <tr key={index}>
                {fields.map(field => {
                  return <td className="py-3 px-6 whitespace-nowrap" key={field.name}>{item[field.name]}</td>
                })}
                <td className="py-3 px-6 whitespace-nowrap flex justify-center text-xl text-blue-400">
                  <Link href={"/dashboard/admin/users/1"}>
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
