"use client";

import { useEffect, useState } from "react";

interface EventDateProps {
  date: Date;
}

export default function EventDate({ date }: EventDateProps) {
  const [viewDate, setViewDate] = useState<String>(date.toLocaleString());
  useEffect(() => {
    setViewDate(date.toLocaleString());
  }, []);

  return <span>{viewDate}</span>;
}
