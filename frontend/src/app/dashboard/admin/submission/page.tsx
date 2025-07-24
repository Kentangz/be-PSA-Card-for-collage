import { getCards } from "@/actions/card";
import Link from "next/link"
import { BsEye } from "react-icons/bs"
import { CardType } from "../../(user)/page";
import formatDate from "@/utils/format-date";

const fields = [
  {
    label: "Name",
    name: "name",
  },
  {
    label: "Year",
    name: "year"
  },
  {
    label: "Brand",
    name: "brand"
  },
  {
    label: "Serial Number",
    name: "serial_number"
  },
  {
    label: "Grade Target",
    name: "grade_target"
  },
  {
    label: "Status",
    name: "status"
  },
  {
    label: "Submitted at",
    name: "submitted_at",
  },
]

export default async function AdminDashboardSubmissionPage() {
  const cards = await getCards();

  return <div>
    <h4 className="mb-4 text-lg">Submission</h4>
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
            {cards?.data.map((item: CardType, index: number) => (
              <tr key={index}>
                <td className="py-3 px-6 whitespace-nowrap">{item.name}</td>
                <td className="py-3 px-6 whitespace-nowrap">{item.year}</td>
                <td className="py-3 px-6 whitespace-nowrap">{item.brand}</td>
                <td className="py-3 px-6 whitespace-nowrap">{item.serial_number}</td>
                <td className="py-3 px-6 whitespace-nowrap">{item.grade_target}</td>
                <td className="py-3 px-6 whitespace-nowrap">{item.latest_status.status}</td>
                <td className="py-3 px-6 whitespace-nowrap">{formatDate(new Date(item.created_at))}</td>
                <td className="py-3 px-6 whitespace-nowrap flex justify-center text-xl text-blue-400">
                  <Link href={"/dashboard/admin/submission/" + item.id}>
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
