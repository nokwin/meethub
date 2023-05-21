import ButtonLink from "@/components/button-link.component";
import Container from "@/components/container.component";
import { authOptions } from "@/core/next-auth.config";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const user = await getServerSession(authOptions);

  if (!user) {
    redirect("/sign-in");
  }

  return (
    <Container>
      <div className="flex justify-between">
        <h1 className="text-4xl text-white font-bold">My events</h1>
        <ButtonLink href="/events/create">+ Create event</ButtonLink>
      </div>
    </Container>
  );
}
