"use client";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { TExtendedBlog } from "@/app/(dashboardLayout)/dashboard/blogs/page";
import { updateBlog } from "@/services/blogs";
import Tiptap from "../shared/TipTap";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  image: z
    .string()
    .url("Please enter a valid image URL")
    .min(1, "Image URL is required"),
  content: z.string().min(1, "Content is required"),
});
type EditBlogFormProps = {
  initialData: TExtendedBlog;
};
export default function EditBlogForm({
  initialData,
}: EditBlogFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
     const res = await updateBlog(initialData._id, values);
     if (res.success) {
        toast.success("Blog updated successfully!");
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to update the blog. Please try again.");
    }
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mx-auto"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter blog title..."
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter blog category..."
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter blog image..."
                  type="text"
                  {...field}
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
               <div className="min-h-[200px] w-full">
                  <Tiptap content={field.value} onChange={field.onChange} />
                </div>
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <div className="text-end">
          <Button effect={"shine"} type="submit">
            Update
          </Button>
        </div>
      </form>
    </Form>
  );
}
