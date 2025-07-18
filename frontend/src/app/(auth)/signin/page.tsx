import Input from "@/app/components/input";
import Link from "next/link";

export default function Signin() {
  return <form className="flex flex-col gap-4">
    <h4 className="text-center text-lg font-medium">Signin to your account</h4>
    <Input type="email" label="Email" name="email" required={true} />
    <Input type="password" label="Password" name="password" required={true} />
    <button type="submit" className="bg-blue-600 h-10 hover:bg-blue-600/90 active:bg-blue-600/80 rounded cursor-pointer">Signin</button>
    <p className="text-center text-sm text-neutral-400">don't have account yet? <Link href={"/signup"} className="text-blue-400 italic">signup</Link></p>
  </form>
}
