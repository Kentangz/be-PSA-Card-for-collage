"use client";

import Input from "@/app/components/input";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import axios from "axios";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [error, setError] = useState<Record<string, string>>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const body = {
      token: formData.get("token"),
      email: formData.get("email"),
      password: formData.get("password"),
      password_confirmation: formData.get("password_confirmation"),
    } as Record<string, string>;

    setLoading(true);
    const data = await axios.post('/api/auth/reset-password', body)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error.response.status == 422) {
          setError(error.response.data.errors);
        }
      })
      .finally(() => {
        setLoading(false);
      })

    if (data) {
      router.push("/signin");
    }
  }

  return <>
    <form onSubmit={handleSignup} className="flex flex-col gap-4 w-80 m-auto">
      <h4 className="text-center text-lg font-medium">Reset Password</h4>
      <input type="hidden" name="token" value={token!!} />
      <input type="hidden" name="email" value={email!!} />
      <Input type="email" label="Email" name="email" required={true} error={error?.email} defaultValue={email} disabled />
      <Input type="password" label="Password" name="password" required={true} error={error?.password} />
      <Input type="password" label="Confirm Password" name="password_confirmation" required={true} />
      <button type="submit" className="bg-blue-600 h-10 hover:bg-blue-600/90 active:bg-blue-600/80 rounded cursor-pointer text-white">Reset Password</button>
    </form>
  </>
}
