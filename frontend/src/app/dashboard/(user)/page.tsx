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

export default function Dashboard() {
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
            {tableData.map((item: Record<string, string | number>, index: number) => (
              <tr key={index}>
                {fields.map(field => {
                  return <td className="py-3 px-6 whitespace-nowrap" key={field.name}>{item[field.name]}</td>
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
}
