"use client";

import { deleteEvent } from "@/actions/event";
import { useParams, useRouter } from "next/navigation";
import Button from "./button.component";

export default function DeleteEvent() {
  const router = useRouter();
  const params = useParams();

  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this event?")) {
      await deleteEvent(params.id);
      router.push("/");
    }
  };

  return <Button onClick={handleDelete}>Delete</Button>;
}
