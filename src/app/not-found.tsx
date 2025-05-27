import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-white dark:bg-gray-950">
      <h1 className="text-9xl font-extrabold text-gray-900 dark:text-gray-100">404</h1>
      <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>
      <div className="mt-8 text-center">
        <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-4">
          Oops! Looks like you&apos;re lost
        </h3>
        <p className="text-gray-500 dark:text-gray-400 mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link href="/">
          <Button variant="default" size="lg">
            Return Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
