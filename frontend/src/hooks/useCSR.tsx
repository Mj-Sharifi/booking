import { useEffect, useState } from "react";

export default function useCSR() {
  const [isInClient, setIsInClient] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsInClient(true);
    }
  }, []);
  return isInClient;
}
