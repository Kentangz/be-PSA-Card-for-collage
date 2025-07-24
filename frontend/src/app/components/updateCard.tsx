"use client";

import axios from "axios";
import { CardType } from "../dashboard/(user)/page";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export default function UpdateCard({ card }: { card?: CardType }) {
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const grade = formData.get("grade");

    const response = await axios.put("/api/card/" + card?.id, { grade })
    if (response.status == 200) {
      handleUpdateSubmission("done");
    }
  }

  const handleUpdateSubmission = async (status: string) => {
    const response = await axios.post("/api/status/", { card_id: card?.id, status: status })
    if (response.status == 200) {
      router.refresh();
    }
  }

  return <div>
    {card?.latest_status.status == "submitted" &&
      <div>
        <p className="text-blue-400 mb-2">accept this submission?</p>
        <div className="flex gap-2">
          <button onClick={() => handleUpdateSubmission("accepted")} className="bg-green-300 dark:bg-green-800 px-2 border border-green-400 dark:border-green-700 rounded cursor-pointer">yes</button>
          <button className="bg-red-300 dark:bg-red-800 px-2 border border-red-400 dark:border-red-700 rounded cursor-pointer">no</button>
        </div>
      </div>
    }
    {card?.latest_status.status == "accepted" &&
      <div>
        <p className="text-blue-400 mb-2">continue to process?</p>
        <div className="flex gap-2">
          <button onClick={() => handleUpdateSubmission("on process")} className="bg-green-300 dark:bg-green-800 px-2 border border-green-400 dark:border-green-700 rounded cursor-pointer">yes</button>
          <button className="bg-red-300 dark:bg-red-800 px-2 border border-red-400 dark:border-red-700 rounded cursor-pointer">no</button>
        </div>
      </div>
    }
    {card?.latest_status.status == "on process" &&
      <form onSubmit={handleSubmit}>
        <h5 className="text-lg font-medium mb-2">Change grade to</h5>
        <select name="grade" className="h-10 px-2 border dark:border-zinc-700 rounded w-30 dark:bg-neutral-800 outline-none">
          <option>Grade</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
        <button type="submit" className="px-2 py-1 bg-green-500 rounded ms-2 cursor-pointer">save</button>
      </form>
    }
  </div>
}
