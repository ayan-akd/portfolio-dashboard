"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CreateBlogForm from "@/components/forms/CreateBlogForm";
import { CustomModal } from "@/components/modals/CustomModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import { TBlog } from "@/types/types";
import ConfirmationBox from "@/components/ConfirmationBox";
import EditBlogForm from "@/components/forms/EditBlogForm";
import { DialogDescription } from "@radix-ui/react-dialog";
import { Badge } from "@/components/ui/badge";

type TExtendedBlog = TBlog & {
  _id: string;
};

export default function BlogManagement({blogs}: {blogs: TExtendedBlog[]}) {
  const [selectedBlog, setSelectedBlog] = useState<TExtendedBlog | null>(null);
  const [open, setOpen] = useState(false);
  const [isImagePreview, setIsImagePreview] = useState(false);


  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/blogs/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("Blog deleted successfully");
      } else {
        toast.error("Failed to delete blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog");
    }
  };

  const handleViewBlog = (blog: TExtendedBlog) => {
    setSelectedBlog(blog);
    setOpen(true);
  };

  return (
    <ContentLayout title="Manage Blogs">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Blogs</h1>
          <CustomModal
            content={<CreateBlogForm />}
            trigger={
              <Button className="h-8" effect={"shine"}>
                Add Blog
              </Button>
            }
            title="Add Blog"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="max-w-[300px]">Content</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog._id}>
                  <TableCell>
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      className="object-cover rounded"
                      width={64}
                      height={64}
                    />
                  </TableCell>
                  <TableCell className="font-medium">{blog.title}</TableCell>
                  <TableCell>
                   <Badge variant="secondary">
                   {blog.category}
                   </Badge>
                    </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {blog.content}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewBlog(blog)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <CustomModal
                        trigger={
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                        }
                        content={
                          <EditBlogForm
                            initialData={blog}
                          />
                        }
                        title="Edit Blog"
                      />
                      <ConfirmationBox
                        trigger={
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        }
                        onConfirm={() => handleDelete(blog._id)}
                        title="Are you sure you want to delete this blog?"
                        description="This action cannot be undone."
                      />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-h-[calc(100vh-4rem)] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedBlog?.title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div
                className="relative group cursor-pointer"
                onClick={() => setIsImagePreview(true)}
              >
                <Image
                  src={selectedBlog?.image as string}
                  alt={selectedBlog?.title as string}
                  className="rounded cursor-pointer"
                  width={800}
                  height={400}
                  priority
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="bg-black/50 p-2 rounded-full">
                    <Eye className="h-8 w-8 text-white" />
                  </div>
                </div>
              </div>
              <div>
                <p className="font-semibold">Category:</p>
                <p>{selectedBlog?.category}</p>
              </div>
              <div>
                <p className="font-semibold">Content:</p>
                <p className="whitespace-pre-wrap">{selectedBlog?.content}</p>
              </div>
            </div>
          </DialogContent>
        </Dialog>
        <Dialog open={isImagePreview} onOpenChange={setIsImagePreview}>
          <DialogContent className="max-w-[90vw] max-h-[calc(100vh-4rem)] overflow-y-auto">
            <DialogHeader>
              <DialogTitle></DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <Image
              src={selectedBlog?.image as string}
              alt={selectedBlog?.title as string}
              className="object-contain"
              width={1920}
              height={1080}
              priority
            />
          </DialogContent>
        </Dialog>
      </div>
    </ContentLayout>
  );
}
