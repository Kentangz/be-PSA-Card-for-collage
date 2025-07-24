"use client";

import Input from "@/app/components/input";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export default function Signin() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignin = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const user = {
      email: formData.get("email"),
      password: formData.get("password"),
    } as Record<string, string>;

    setLoading(true);
    const data = await axios.post('/api/auth/login', user)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error.response.status == 401 || error.response.status == 400) {
          setError(error.response.data.message);
        }
      })
      .finally(() => {
        setLoading(false);
      })

    if (data) {
      router.push("/dashboard");
    }
  }

  return <>
    <h2 className="text-2xl font-light mb-1">Welcome to PSA Card Submission</h2>
    <form onSubmit={handleSignin} className="flex flex-col gap-4 w-80 m-auto">
      <h4 className="text-center text-lg font-medium">Signin to your account</h4>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <Input type="email" label="Email" name="email" required={true} />
      <div>
        <Input type="password" label="Password" name="password" required={true} />
        <Link href={"/forgot-password"} className="inline-block mt-1 text-blue-500 text-sm">Forgot Password?</Link>
      </div>
      <button type="submit" className="bg-blue-600 h-10 hover:bg-blue-600/90 active:bg-blue-600/80 rounded cursor-pointer text-white">Signin</button>
      <p className="text-center text-sm text-neutral-700 dark:text-neutral-400">don't have account yet? <Link href={"/signup"} className="text-blue-600 dark:text-blue-400 italic">signup</Link></p>
    </form>
  </>
}
