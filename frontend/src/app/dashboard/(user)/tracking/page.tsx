import { getCurrentUserCard } from "@/actions/card"
import formatDate from "@/utils/format-date";
import Link from "next/link"
import { BsEye } from "react-icons/bs"
import { CardType } from "../page";

const fields = [
  {
    label: "Name",
    name: "name",
  },
  {
    label: "Serial Number",
    name: "serial_number"
  },
  {
    label: "Verified Grade",
    name: "verified_grade"
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

export default async function Tracking() {
  const cards = await getCurrentUserCard();

  return <div>
    <h4 className="mb-4 text-lg">Tracking</h4>
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
                <td className="py-3 px-6 whitespace-nowrap">{item.serial_number}</td>
                <td className="py-3 px-6 whitespace-nowrap">{item.grade ? item.grade : "-"}</td>
                <td className="py-3 px-6 whitespace-nowrap">{item.latest_status.status}</td>
                <td className="py-3 px-6 whitespace-nowrap">{formatDate(new Date(item.created_at))}</td>
                <td className="py-3 px-6 whitespace-nowrap flex justify-center text-xl text-blue-400">
                  <Link href={"/dashboard/tracking/" + item.id}>
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
