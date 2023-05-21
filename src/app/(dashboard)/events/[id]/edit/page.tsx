import { getEventById } from "@/actions/event";
import Container from "@/components/container.component";
import EventForm from "@/components/event-form.component";
import { notFound } from "next/navigation";

interface EventPageParams {
  params: {
    id: string;
  };
}

export default async function EditEventPage({ params }: EventPageParams) {
  const event = await getEventById(params.id);

  if (!event) {
    notFound();
  }

  return (
    <Container>
      <EventForm
        defaultValues={{
          title: event.title,
          description: event.description,
          date: event.date.toISOString().slice(0, -1),
          banner: event.banner,
          address: event.address,
        }}
        isUpdate
      />
    </Container>
  );
}
