"use client";

import Input from "@/app/components/input";
import axios from "axios";
import { FormEvent, useState } from "react";

export default function ForgotPassword() {
  const [successMessage, setSuccessMessage] = useState<string | null>()
  const [error, setError] = useState<string | null>(null);
  const handleForgotPassword = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const body = {
      email: formData.get("email"),
    } as Record<string, string>;

    const data = await axios.post('/api/auth/forgot-password', body)
      .then(response => {
        setSuccessMessage(response.data.status);
        return response.data;
      })
      .catch(error => {
        console.log(error);
        if (error.response.status == 422) {
          setError(error.response.data.message);
        }
      })
      .finally(() => {
        // setLoading(false);
      })
  }

  return <div className="w-80">
    <h4 className="text-center text-lg font-medium mb-4">Forgot Password?</h4>
    {successMessage && <p className="text-sm text-green-500 mb-5 text-center">{successMessage}</p>}
    {error && <p className="text-sm text-red-500 mb-5 text-center">{error}</p>}
    <form onSubmit={handleForgotPassword} className="flex flex-col gap-4">
      <Input type="email" label="Email" name="email" required={true} />
      <button type="submit" className="bg-blue-600 h-10 hover:bg-blue-600/90 active:bg-blue-600/80 rounded cursor-pointer text-white">Submit</button>
    </form>
  </div>
}
