"use client"; // Error boundaries must be Client Components

import Container from "@/components/Container";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    // console.error(error);
  }, [error]);

  return (
    <Container className="text-center flex justify-center items-center mt-20">
      <div>
        <h2 className="text-2xl font-bold text-primary">
          Something went wrong!
        </h2>
      </div>
    </Container>
  );
}
