'use client';

import { Button } from "@/components/ui/button";
import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-gray-950">
      <div className="relative">
        <h1 className="text-9xl font-extrabold text-gray-900 dark:text-gray-100">
          Oops!
        </h1>
        <div className="bg-red-500 px-2 text-sm rounded rotate-12 absolute top-[120px] right-[-35px] text-white">
          Something went wrong
        </div>
      </div>
      <div className="mt-8 text-center max-w-2xl px-4">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Don&apos;t worry, we&apos;re on it
        </h3>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-6">
          <p className="text-red-600 dark:text-red-400 font-mono text-sm">
            {error.message || "An unexpected error occurred"}
          </p>
        </div>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          Our team has been notified and we&apos;re working to fix the issue
        </p>
        <div className="flex gap-4 justify-center">
          <Button
            variant="default"
            onClick={reset}
            size="lg"
          >
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.href = '/'}
            size="lg"
          >
            Return Home
          </Button>
        </div>
      </div>
    </div>
  );
}
