import { authOptions } from "@/core/next-auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getServerSession(authOptions);

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <div>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}
