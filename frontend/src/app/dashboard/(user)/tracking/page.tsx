import Link from "next/link"
import { AiFillEye } from "react-icons/ai"
import { BsEye } from "react-icons/bs"

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

const tableData = [
  {
    name: "kartu 1",
    serial_number: 111112,
    verified_grade: "-",
    status: "submitted",
    submitted_at: "21 jul 2025"
  },
  {
    name: "kartu 2",
    serial_number: 111113,
    verified_grade: "-",
    status: "Accepted",
    submitted_at: "21 jul 2025"
  },
  {
    name: "kartu 3",
    serial_number: 111113,
    verified_grade: "-",
    status: "in process",
    submitted_at: "21 jul 2025"
  },
  {
    name: "kartu 4",
    serial_number: 111113,
    verified_grade: "A",
    status: "done",
    submitted_at: "21 jul 2025"
  },
  {
    name: "kartu 5",
    serial_number: 111113,
    verified_grade: "B",
    status: "done",
    submitted_at: "21 jul 2025"
  },
]

export default function Tracking() {
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
            {tableData.map((item: Record<string, string | number>, index: number) => (
              <tr key={index}>
                {fields.map(field => {
                  return <td className="py-3 px-6 whitespace-nowrap" key={field.name}>{item[field.name]}</td>
                })}
                <td className="py-3 px-6 whitespace-nowrap flex justify-center text-xl text-blue-400">
                  <Link href={"/dashboard/tracking/1"}>
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
