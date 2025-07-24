"use client";

import { FormEvent } from "react";
import Input from "./input"
import axios from "axios";
import { useRouter } from "next/navigation";

type UserType = {
  name: string,
  email: string,
  phone_number: string,
  role: string,
  is_active: boolean,
}

export default function UserForm({ user, id }: { user: UserType, id: string }) {
  const route = useRouter();

  const handleUpdate = async (e: FormEvent) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const user = {
      name: formData.get("name"),
      email: formData.get("email"),
      phone_number: formData.get("phone_number"),
      password: formData.get("role"),
    } as Record<string, string>;

    // setLoading(true);
    const data = await axios.put('/api/users/' + id, user)
      .then(response => {
        return response.data;
      })
      .catch(error => {
        if (error.response.status == 422) {
          // setError(error.response.data.errors);
        }
      })
      .finally(() => {
        // setLoading(false);
      })

    if (data) {
      // router.push("/dashboard/admin");
    }
  }

  const handleToggleAccount = async () => {
    const data = await axios.put('/api/users/toggle/' + id, { is_active: user.is_active })
    if (data.status == 200) {
      route.refresh();
    }
  }

  return <form onSubmit={handleUpdate}>
    <div className="flex flex-col gap-4 w-80">
      <Input type="text" label="Card Name" name="name" defaultValue={user.name} required={true} />
      <Input type="email" label="Email" name="email" defaultValue={user.email} required={true} />
      <Input type="text" label="Phone Number" name="phone_number" defaultValue={user.phone_number} required={true} />
      <select name="role" className="dark:bg-neutral-900 border dark:border-neutral-700 h-10 px-2 rounded" defaultValue={user.role}>
        <option value="user">user</option>
        <option value="admin">admin</option>
      </select>
      <button type="submit" className="bg-blue-600 h-10 hover:bg-blue-600/90 active:bg-blue-600/80 rounded cursor-pointer text-white">Save</button>
    </div>
    <div className="mt-4">
      <button
        type="submit"
        onClick={handleToggleAccount}
        className={`h-10 rounded cursor-pointer text-white w-80 ${user.is_active ? "bg-red-700 hover:bg-red-700/90 active:bg-red-700/80" : "bg-green-700 hover:bg-green-700/90 active:bg-green-700/80"}`}>
        {user.is_active ? "Deactive" : "Activate"} Account
      </button>
    </div>
  </form>
}
