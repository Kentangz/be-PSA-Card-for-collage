const data = {
  name: "kartu 5",
  year: 2001,
  brand: "toyota",
  serial_number: 111113,
  verified_grade: "B",
  target_grade: "A",
  status: "done",
  submitted_at: "21 jul 2025"
}

export default function TrackingDetail() {
  return <div>
    <div className="flex gap-8 mb-8">
      <div className="w-96 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded">
        <div className="flex items-top gap-2 mb-2">
          <h3 className="text-2xl font-medium">{data.name}</h3>
          <span className="text-sm font-light">({data.year})</span>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th className="text-start pb-1">brand</th>
                <td><span className="px-2">:</span>{data.brand}</td>
              </tr>
              <tr>
                <th className="text-start pb-1">serial number</th>
                <td><span className="px-2">:</span>{data.serial_number}</td>
              </tr>
              <tr>
                <th className="text-start pb-1">verified grade</th>
                <td><span className="px-2">:</span>{data.verified_grade}</td>
              </tr>
              <tr>
                <th className="text-start pb-1">target grade</th>
                <td><span className="px-2">:</span>{data.target_grade}</td>
              </tr>
              <tr>
                <th className="text-start pb-1">submitted at</th>
                <td><span className="px-2">:</span>{data.submitted_at}</td>
              </tr>
              <tr>
                <th className="text-start pb-1">status</th>
                <td><span className="px-2">:</span>{data.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <div className="py-2 border-s border-neutral-400 dark:border-neutral-700 px-4 relative flex flex-col justify-center">
          <div className="h-4 w-4 absolute bg-neutral-300 dark:bg-neutral-800 -left-2 rounded-full border border-neutral-400 dark:border-neutral-700"></div>
          <p className="text-lg">submitted</p>
          <p className="text-sm text-neutral-400">21 jul 2025</p>
        </div>
        <div className="py-2 border-s border-neutral-400 dark:border-neutral-700 px-4 relative flex flex-col justify-center">
          <div className="h-4 w-4 absolute bg-neutral-300 dark:bg-neutral-800 -left-2 rounded-full border border-neutral-400 dark:border-neutral-700"></div>
          <p className="text-lg">accepted</p>
          <p className="text-sm text-neutral-400">22 jul 2025</p>
        </div>
        <div className="py-2 border-s border-neutral-400 dark:border-neutral-700 px-4 relative flex flex-col justify-center">
          <div className="h-4 w-4 absolute bg-neutral-300 dark:bg-neutral-800 -left-2 rounded-full border border-neutral-400 dark:border-neutral-700"></div>
          <p className="text-lg">in process</p>
          <p className="text-sm text-neutral-400">22 jul 2025</p>
        </div>
        <div className="py-2 border-s border-neutral-400 dark:border-neutral-700 px-4 relative flex flex-col justify-center">
          <div className="h-4 w-4 absolute bg-neutral-300 dark:bg-neutral-800 -left-2 rounded-full border border-neutral-400 dark:border-neutral-700"></div>
          <p className="text-lg">done</p>
          <p className="text-sm text-neutral-400">22 jul 2025</p>
        </div>
      </div>
    </div>

    <h4 className="mb-4 text-lg">Card Pictures</h4>
    <div className="flex gap-2 overflow-x-auto flex-nowrap rounded mb-4">
      <div className="bg-neutral-500 h-60 w-96 flex-shrink-0 flex justify-center items-center rounded">this is image</div>
      <div className="bg-neutral-500 h-60 w-96 flex-shrink-0 flex justify-center items-center rounded">this is image</div>
      <div className="bg-neutral-500 h-60 w-96 flex-shrink-0 flex justify-center items-center rounded">this is image</div>
      <div className="bg-neutral-500 h-60 w-96 flex-shrink-0 flex justify-center items-center rounded">this is image</div>
      <div className="bg-neutral-500 h-60 w-96 flex-shrink-0 flex justify-center items-center rounded">this is image</div>
    </div>


  </div>
}
