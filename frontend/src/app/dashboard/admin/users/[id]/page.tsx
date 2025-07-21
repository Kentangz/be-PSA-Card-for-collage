import Input from "@/app/components/input";

export default function UserDetail() {
  return <div>
    <h4 className="mb-5 text-lg">User Detail</h4>
    <div>
      <div className="flex flex-col gap-4 w-80">
        <Input type="text" label="Card Name" name="name" defaultValue={"user 1"} required={true} />
        <Input type="email" label="Email" name="email" defaultValue="user1@gmail.com" required={true} />
        <Input type="text" label="Phone Number" name="phone_number" defaultValue="+62" required={true} />
        <button type="submit" className="bg-blue-600 h-10 hover:bg-blue-600/90 active:bg-blue-600/80 rounded cursor-pointer text-white">Save</button>
      </div>
      <div className="mt-4">
        <button type="submit" className="bg-red-700 h-10 hover:bg-red-700/90 active:bg-red-700/80 rounded cursor-pointer text-white w-80">Deactive Account</button>
      </div>
    </div>
  </div>
}
