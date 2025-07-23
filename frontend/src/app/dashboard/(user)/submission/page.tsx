"use client";

import SubmissionForm from "@/app/components/submission-form";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type SubmissionData = {
  name: string;
  year: string;
  brand: string;
  serial_number: string;
  grade_target: string;
  images: File[];
};

export default function Submission() {
  const [error, setError] = useState(false);
  const [submissions, setSubmissions] = useState<SubmissionData[]>([
    { name: "", year: "", brand: "", serial_number: "", grade_target: "", images: [] },
  ]);
  const router = useRouter();

  const addSubmission = () => {
    setSubmissions(prev => [...prev, { name: "", year: "", brand: "", serial_number: "", grade_target: "", images: [] }])
  }

  const updateForm = (index: number, data: SubmissionData) => {
    const updated = [...submissions];
    updated[index] = data;
    setSubmissions(updated);
  };

  const handleSubmitAll = async () => {
    for (const submission of submissions) {
      const formData = new FormData();
      formData.append("name", submission.name);
      formData.append("year", submission.year);
      formData.append("brand", submission.brand);
      formData.append("serial_number", submission.serial_number);
      formData.append("grade_target", submission.grade_target);
      submission.images.forEach((file: File) => {
        formData.append("images[]", file);
      });

      await axios.post("/api/card", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
        .then(response => {
          if (response.statusText == "OK") {
            router.push("/dashboard/");
          }
        })
        .catch(error => {
          if (error) {
            console.log(error);
            setError(true);
          }
        });
    }

  };

  return <div>
    <h4 className="mb-4 text-lg">Submission Form</h4>
    <button onClick={addSubmission} className="mb-4 bg-neutral-800 hover:bg-neutral-800/80 px-4 py-2 rounded border border-neutral-700">add more submission form</button>

    {error && <p className="text-red-500 text-center mb-4">error: make sure every fields is filled</p>}

    <div className="grid grid-cols-2 gap-4">
      {submissions.map((data, i) => (
        <SubmissionForm
          key={i}
          index={i}
          data={data}
          onChange={updateForm}
        />
      ))}
    </div>
    <button onClick={handleSubmitAll} type="submit" className="bg-blue-600 h-10 hover:bg-blue-600/90 active:bg-blue-600/80 rounded cursor-pointer text-white w-20 mt-4">Submit</button>
  </div>
}
