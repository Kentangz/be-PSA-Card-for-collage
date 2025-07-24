import { getUserById } from "@/actions/user";
import UserForm from "@/app/components/user-form";

export default async function UserDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await getUserById(id);

  if (!user) {
    return <div>404</div>
  }

  return <div>
    <h4 className="mb-5 text-lg">User Detail</h4>
    <div>
      <UserForm user={user.data} id={id} />
    </div>
  </div>
}
