"use client";

import Input from "@/app/components/input";
import Image from "next/image";
import { ChangeEvent, useState } from "react";
import { LuUpload } from "react-icons/lu";

export default function Submission() {
  const [uploadFile, setUploadFile] = useState<File[]>([])

  const handleFileChange = (e: ChangeEvent) => {
    const file = (e.target as HTMLInputElement).files?.[0];
    if (file && file.type.startsWith("image/")) {
      setUploadFile(prev => [...prev, file]);
    }
    console.log(uploadFile);
  }

  return <div>
    <h4 className="mb-4 text-lg">Submission Form</h4>
    <form className="">
      <div className="grid grid-cols-2 gap-4 mb-4 w-[700px]">
        <Input type="text" label="Card Name" name="name" required={true} />
        <Input type="number" label="Year" name="name" required={true} />
        <Input type="text" label="Brand" name="brand" required={true} />
        <Input type="text" label="Serial Number" name="serial_number" required={true} />
        <select name="grade_target" className="dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded outline-none h-10 px-1">
          <option>Grade Target</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>
      <div>
        {
          uploadFile?.map((item, i) => (
            <div key={i} className="w-[700px] border border-neutral-700 rounded overflow-hidden mb-4">
              <Image src={URL.createObjectURL(item)} width={500} height={500} alt="Profile Picture" className="h-full w-full object-cover" />
            </div>
          ))
        }
        <label htmlFor="picture" className="px-2 border border-neutral-200 dark:border-neutral-700 flex items-center rounded w-[700px] h-10 gap-2 justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800">
          <LuUpload />Upload Picture
        </label>
        <input type="file" name="image" onChange={handleFileChange} id="picture" className="hidden" />
      </div>
    </form>
  </div>
}
