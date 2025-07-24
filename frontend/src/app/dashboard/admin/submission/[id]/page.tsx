import { getCardDetail } from "@/actions/card";
import UpdateCard from "@/app/components/updateCard";
import { CardType } from "@/app/dashboard/(user)/page";
import { BE_URL } from "@/lib/api";
import formatDate from "@/utils/format-date";
import Image from "next/image";

export default async function SubmissoinDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const card = await getCardDetail(id);
  console.log(card);

  return <div>
    <div className="flex gap-8 mb-8">
      <div className="w-96 bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 p-4 rounded">
        <div className="flex items-top gap-2 mb-2">
          <h3 className="text-2xl font-medium">{card?.data.name}</h3>
          <span className="text-sm font-light">({card?.data.year})</span>
        </div>
        <div>
          <table>
            <tbody>
              <tr>
                <th className="text-start pb-1">brand</th>
                <td><span className="px-2">:</span>{card?.data.brand}</td>
              </tr>
              <tr>
                <th className="text-start pb-1">serial number</th>
                <td><span className="px-2">:</span>{card?.data.serial_number}</td>
              </tr>
              <tr>
                <th className="text-start pb-1">verified grade</th>
                <td><span className="px-2">:</span>{card?.data.grade ?? "-"}</td>
              </tr>
              <tr>
                <th className="text-start pb-1">target grade</th>
                <td><span className="px-2">:</span>{card?.data.grade_target}</td>
              </tr>
              <tr>
                <th className="text-start pb-1">submitted at</th>
                <td><span className="px-2">:</span>{formatDate(new Date(card?.data.created_at))}</td>
              </tr>
              <tr>
                <th className="text-start pb-1">status</th>
                <td><span className="px-2">:</span>{card?.data.latest_status.status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div>
        {card?.data.statuses.map((data: { status: string, created_at: string }, i: number) => (
          <div key={i} className="py-2 border-s border-neutral-400 dark:border-neutral-700 px-4 relative flex flex-col justify-center">
            <div className="h-4 w-4 absolute bg-neutral-300 dark:bg-neutral-800 -left-2 rounded-full border border-neutral-400 dark:border-neutral-700"></div>
            <div className="text-lg"><p>{data.status}</p> {data.status == "done" && <p className="text-sm text-blue-500">card is verified (grade: {card?.data.grade})</p>}</div>
            <p className="text-sm text-neutral-400">{formatDate(new Date(data.created_at))}</p>
          </div>
        ))}
      </div>
      <UpdateCard card={card?.data as CardType | undefined} />
    </div>

    <h4 className="mb-4 text-lg">Card Pictures</h4>
    <div className="flex gap-2 overflow-x-auto flex-nowrap rounded mb-4">
      {card?.data.images.map((item: any, i: number) => (
        <div key={i} className="bg-neutral-500 w-96 flex-shrink-0 flex justify-center items-center rounded">
          <Image src={`${BE_URL}/storage/${item.path}`} alt="" width={500} height={500} />
        </div>
      ))}
    </div>

  </div>
}
