import { getCurrentUserCard } from "@/actions/card";
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
    name: "created_at",
  },
]

export type CardType = {
  id: string,
  name: string;
  year: string;
  brand: string;
  serial_number: string;
  latest_status: { status: string };
  grade_target: string;
  grade: string;
  created_at: string;
};

export default async function Dashboard() {
  const cards = await getCurrentUserCard();

  return <div>

    {/* submission status summary */}
    <div className="flex gap-2 flex-wrap">
      <div className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 w-60 p-4 text-center rounded">
        <h2 className="text-3xl font-bold mb-2">5</h2>
        <p className="text-sm">cards submitted</p>
      </div>
      <div className="bg-blue-300 dark:bg-blue-800 border border-blue-400 dark:border-blue-700 w-60 p-4 text-center rounded">
        <h2 className="text-3xl font-bold mb-2">1</h2>
        <p className="text-sm">cards accepted</p>
      </div>
      <div className="bg-yellow-300 dark:bg-yellow-800 border border-yellow-400 dark:border-yellow-700 w-60 p-4 text-center rounded">
        <h2 className="text-3xl font-bold mb-2">1</h2>
        <p className="text-sm">cards in process</p>
      </div>
      <div className="bg-green-300 dark:bg-green-800 border border-green-400 dark:border-green-700 w-60 p-4 text-center rounded">
        <h2 className="text-3xl font-bold mb-2">2</h2>
        <p className="text-sm">done</p>
      </div>
    </div>

    <h5 className="text-lg mt-8 mb-2">Submission history</h5>
    <div className="flex">
      <div className="border bg-neutral-100 dark:bg-neutral-800 border-neutral-200 dark:border-zinc-700 rounded overflow-x-auto">
        <table className="table w-full text-sm text-left rtl:text-right">
          <thead className="">
            <tr>
              {fields.map(field => {
                return <th className="py-3 px-6" key={field.name}>{field.label}</th>
              })}
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
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {!cards?.data.length && <p>you have not submit any card yet</p>}
  </div>
}
