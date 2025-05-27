import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { TExtendedBlog } from "@/app/(dashboardLayout)/dashboard/blogs/page";

export default function BlogCard({ blog }: { blog: TExtendedBlog }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={blog.image}
            alt={blog.title}
            width={1280}
            height={720}
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            priority
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="mb-4 line-clamp-1">{blog.title}</CardTitle>
        <div className="space-y-4">
          <p className="text-muted-foreground line-clamp-2 min-h-[2.5rem]">
            {blog.content}
          </p>
          <Badge variant="secondary" className="text-xs">
            {blog.category}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Link href={`/blog/${blog._id}`} className="w-full">
          <Button effect={"shine"} className="w-full" variant="default">
            Read More
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
