import Link from "next/link"
import { BsEye } from "react-icons/bs"

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

const tableData = [
  {
    name: "kartu 1",
    year: 2001,
    brand: "toyota",
    serial_number: 111112,
    grade_target: "A",
    status: "submitted",
    submitted_at: "21 jul 2025"
  },
  {
    name: "kartu 1",
    year: 2001,
    brand: "toyota",
    serial_number: 111113,
    grade_target: "A",
    status: "accepted",
    submitted_at: "21 jul 2025"
  },
  {
    name: "kartu 1",
    year: 2001,
    brand: "toyota",
    serial_number: 111114,
    grade_target: "A",
    status: "in process",
    submitted_at: "21 jul 2025"
  },
  {
    name: "kartu 1",
    year: 2001,
    brand: "toyota",
    serial_number: 111115,
    grade_target: "A",
    status: "done",
    submitted_at: "21 jul 2025"
  },
  {
    name: "kartu 1",
    year: 2001,
    brand: "toyota",
    serial_number: 111116,
    grade_target: "A",
    status: "done",
    submitted_at: "21 jul 2025"
  }
]

export default function AdminDashboardSubmissionPage() {
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
            {tableData.map((item: Record<string, string | number>, index: number) => (
              <tr key={index}>
                {fields.map(field => {
                  return <td className="py-3 px-6 whitespace-nowrap" key={field.name}>{item[field.name]}</td>
                })}
                <td className="py-3 px-6 whitespace-nowrap flex justify-center text-xl text-blue-400">
                  <Link href={"/dashboard/admin/submission/1"}>
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
