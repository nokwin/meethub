"use client";

import { createEvent, updateEvent } from "@/actions/event";
import useRendered from "@/hooks/use-rendered.hook";
import { toBase64 } from "@/utils/files";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Button from "./button.component";
import ImageInput from "./image-input.component";
import Input from "./input.component";
import Textarea from "./textarea.component";

const createEventSchema = z.object({
  title: z.string().min(3).max(255),
  description: z.string().min(3).max(2550),
  date: z.string(),
  banner: z.any(),
  address: z.string().min(3).max(255),
});

type CreateEventFormValues = z.infer<typeof createEventSchema>;

interface CreateEventFormProps {
  defaultValues?: CreateEventFormValues;
  isUpdate?: boolean;
}

export default function CreateEventForm({
  defaultValues,
  isUpdate,
}: CreateEventFormProps = {}) {
  const isRendered = useRendered();

  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm<CreateEventFormValues>({
    defaultValues,
    resolver: zodResolver(createEventSchema),
  });

  const router = useRouter();
  const onSubmit = handleSubmit(async (data) => {
    if (!data.banner) {
      setError("banner", {
        message: "Banner is required",
      });
      return;
    }

    if (isUpdate) {
      if (typeof data.banner !== "string") {
        data.banner = await toBase64(data.banner[0]);
      }

      updateEvent({
        ...data,
        date: new Date(data.date),
        banner: data.banner,
        id: params.id,
      });
    } else {
      const fileBase64 = await toBase64(data.banner[0]);

      await createEvent({
        ...data,
        banner: fileBase64,
        date: new Date(data.date),
      });
    }

    router.replace("/");
  });

  return (
    <form onSubmit={onSubmit}>
      <ImageInput
        {...register("banner")}
        error={errors.banner?.message as string}
        disabled={!isRendered}
        defaultImage={defaultValues?.banner}
      />
      <Input
        placeholder="Event title"
        {...register("title")}
        error={errors.title?.message}
      />
      <Textarea
        placeholder="Event description"
        {...register("description")}
        error={errors.description?.message}
      />
      <Input
        placeholder="Event date"
        type="datetime-local"
        {...register("date")}
        error={errors.date?.message}
      />
      <Input
        placeholder="Event location"
        {...register("address")}
        error={errors.address?.message}
      />
      <Button type="submit" disabled={!isRendered || isSubmitting}>
        {isUpdate ? "Update event" : "Create event"}
      </Button>
    </form>
  );
}
