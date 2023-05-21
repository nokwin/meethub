import { useEffect, useState } from "react";

export default function useRendered() {
  const [rendered, setRendered] = useState(false);
  useEffect(() => {
    setRendered(true);
  }, []);

  return rendered;
}
