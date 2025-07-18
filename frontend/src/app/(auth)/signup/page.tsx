import Input from "@/app/components/input";
import Link from "next/link";

export default function Signup() {
  return <form className="flex flex-col gap-4">
    <h4 className="text-center text-lg font-medium">Create Account Now</h4>
    <Input type="text" label="Name" name="name" required={true} />
    <Input type="email" label="Email" name="email" required={true} />
    <Input type="number" label="Phone Number" name="phone_number" required={true} />
    <Input type="password" label="Password" name="password" required={true} />
    <Input type="password" label="Repeat Password" name="repeat_password" required={true} />
    <button type="submit" className="bg-blue-600 h-10 hover:bg-blue-600/90 active:bg-blue-600/80 rounded cursor-pointer">Signin</button>
    <p className="text-center text-sm text-neutral-400">already have account? <Link href={"/signin"} className="text-blue-400 italic">signin</Link></p>
  </form>
}
