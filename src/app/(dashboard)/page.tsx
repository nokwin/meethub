import { getUserEvents } from "@/actions/event";
import ButtonLink from "@/components/button-link.component";
import Container from "@/components/container.component";
import EventDate from "@/components/event-date.component";
import { authOptions } from "@/core/next-auth.config";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    redirect("/sign-in");
  }

  const events = await getUserEvents(session.user.email!);

  return (
    <Container>
      <div className="flex justify-between mb-8">
        <h1 className="text-4xl text-white font-bold">My events</h1>
        <ButtonLink href="/events/create">+ Create event</ButtonLink>
      </div>
      <div className="flex flex-col gap-4">
        {events.map((event) => (
          <Link
            href={`/events/${event.id}`}
            key={`event-${event.id}`}
            className="flex bg-black/30 p-4 border-0 rounded justify-between items-center"
          >
            <h2 className="text-white text-2xl">{event.title}</h2>
            <p className="text-white">
              <EventDate date={event.date} />
            </p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
