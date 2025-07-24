"use client";

import Input from "@/app/components/input";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import axios from "axios";
import { API_URL } from "@/lib/api";

export default function Signup() {
  const [error, setError] = useState<Record<string, string>>();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSignup = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone_number: formData.get("phone_number"),
      password: formData.get("password"),
      password_confirmation: formData.get("password_confirmation"),
    } as Record<string, string>;

    setLoading(true);
    const data = await axios.post(API_URL + '/register', user)
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
    <h2 className="text-2xl font-light mb-1">Welcome to PSA Card Submission</h2>
    <form onSubmit={handleSignup} className="flex flex-col gap-4 w-80 m-auto">
      <h4 className="text-center text-lg font-medium">Create Account</h4>
      <Input type="text" label="Name" name="name" required={true} error={error?.name} />
      <Input type="email" label="Email" name="email" required={true} error={error?.email} />
      <Input type="text" label="Phone Number" name="phone_number" required={true} defaultValue="+62" error={error?.phone_number} />
      <Input type="password" label="Password" name="password" required={true} error={error?.password} />
      <Input type="password" label="Confirm Password" name="password_confirmation" required={true} />
      <button type="submit" className="bg-blue-600 h-10 hover:bg-blue-600/90 active:bg-blue-600/80 rounded cursor-pointer text-white">Signin</button>
      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">already have account? <Link href={"/signin"} className="text-blue-600 dark:text-blue-400 italic">signin</Link></p>
    </form>
  </>
}
