"use client";

import Input from "@/app/components/input";
import Image from "next/image";
import { ChangeEvent } from "react";
import { LuUpload } from "react-icons/lu";

type SubmissionData = {
  name: string;
  year: string;
  brand: string;
  serial_number: string;
  grade_target: string;
  images: File[];
};

export default function SubmissionForm({
  index,
  data,
  onChange,
}: {
  index: number;
  data: SubmissionData;
  onChange: (index: number, data: SubmissionData) => void;
}) {
  const updateField = (key: keyof SubmissionData, value: any) => {
    onChange(index, { ...data, [key]: value });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const validImages = Array.from(files).filter((file) =>
        file.type.startsWith("image/")
      );
      updateField("images", [...data.images, ...validImages]);
    }
  };

  return (
    <div className="border border-zinc-700 p-4 rounded">
      <div className="grid grid-cols-2 gap-4 mb-4 w-full">
        <Input
          id={`name${index}`}
          type="text"
          label="Card Name"
          name="name"
          required
          defaultValue={data.name}
          onChange={(e: ChangeEvent) => updateField("name", (e.target as HTMLInputElement).value)}
        />
        <Input
          id={`year${index}`}
          type="number"
          label="Year"
          name="year"
          required
          defaultValue={data.year}
          onChange={(e: ChangeEvent) => updateField("year", (e.target as HTMLInputElement).value)}
        />
        <Input
          id={`brand${index}`}
          type="text"
          label="Brand"
          name="brand"
          required
          defaultValue={data.brand}
          onChange={(e: ChangeEvent) => updateField("brand", (e.target as HTMLInputElement).value)}
        />
        <Input
          id={`serial_number${index}`}
          type="text"
          label="Serial Number"
          name="serial_number"
          required
          defaultValue={data.serial_number}
          onChange={(e: ChangeEvent) => updateField("serial_number", (e.target as HTMLInputElement).value)}
        />
        <select
          name="grade_target"
          value={data.grade_target}
          onChange={(e) => updateField("grade_target", e.target.value)}
          className="dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700 rounded outline-none h-10 px-1"
        >
          <option value="">Grade Target</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
        </select>
      </div>

      <div className="mb-4">
        {data.images?.map((item, i) => (
          <div
            key={i}
            className="w-full border border-neutral-700 rounded overflow-hidden mb-4"
          >
            <Image
              src={URL.createObjectURL(item)}
              width={500}
              height={500}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          </div>
        ))}
        <label
          htmlFor={`picture-${index}`}
          className="px-2 border border-neutral-200 dark:border-neutral-700 flex items-center rounded w-full h-10 gap-2 justify-center hover:bg-neutral-100 dark:hover:bg-neutral-800"
        >
          <LuUpload />
          Upload Picture
        </label>
        <input
          type="file"
          name="image"
          onChange={handleFileChange}
          id={`picture-${index}`}
          className="hidden"
          multiple
        />
      </div>
    </div>
  );
}
