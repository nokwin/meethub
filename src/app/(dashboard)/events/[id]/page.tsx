import { getEventById } from "@/actions/event";
import Button from "@/components/button.component";
import Container from "@/components/container.component";
import { notFound } from "next/navigation";
import Image from "next/image";
import EventDate from "@/components/event-date.component";
import ButtonLink from "@/components/button-link.component";

interface EventPageParams {
  params: {
    id: string;
  };
}

export default async function EventPage({ params }: EventPageParams) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <Container>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-white text-3xl">{event.title}</h1>
        <div className="flex gap-4">
          <ButtonLink href={`/events/${event.id}/edit`}>Edit</ButtonLink>
          <Button>Delete</Button>
        </div>
      </div>
      <div className="w-full h-80 relative mb-8">
        <Image
          src={event.banner}
          fill
          alt="banner"
          style={{ objectFit: "cover" }}
        />
      </div>
      <div>
        <h2 className="text-white text-2xl">Details</h2>
        <p className="text-white">{event.description}</p>
      </div>
      <hr className="my-4" />
      <div className="text-white">
        <h2>Location</h2>
        <p>{event.address}</p>
        <p>
          <EventDate date={event.date} />
        </p>
      </div>
    </Container>
  );
}
