"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { TExtendedBlog } from "@/app/(dashboardLayout)/dashboard/blogs/page";
import ReactMarkdown from 'react-markdown';

export default function BlogDetailsCard({ blog }: { blog: TExtendedBlog }) {
  const router = useRouter();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center">
        <Button 
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
      </div>

      <h1 className="text-4xl font-bold text-center">{blog.title}</h1>

      <div className="w-full">
        <div className="relative w-full">
          <Image
            src={blog.image}
            alt={blog.title}
            width={1280}
            height={720}
            className="object-cover rounded-lg"
            priority
          />
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <Badge variant="secondary" className="text-sm">
            {blog.category}
          </Badge>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>{blog.content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
