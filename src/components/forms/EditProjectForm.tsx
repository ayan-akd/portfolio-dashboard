"use client";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash } from "lucide-react";
import { TProjectExtended } from "@/app/(dashboardLayout)/dashboard/projects/page";
import { updateProject } from "@/services/projects";

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  images: z
    .array(z.object({ url: z.string().url("Invalid URL") }))
    .min(1, "At least one image URL is required"),
  technology: z.string().min(1, "At least one technology is required"),
  liveLink: z
    .string()
    .url("Please enter a valid URL")
    .min(1, "Live link is required"),
  clientRepo: z
    .string()
    .url("Please enter a valid repository URL")
    .min(1, "Client repository link is required"),
  serverRepo: z.string().optional(),
  description: z.string().min(1, "Description is required"),
});

type EditProjectFormProps = {
  initialData: TProjectExtended;
  onSuccess?: () => void;
};

export default function EditProjectForm({
  initialData,
}: EditProjectFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: initialData.title,
      images: initialData.images.map((img) => ({ url: img })), // Convert string[] to { url: string }[]
      technology: initialData.technology.join(", "), // Keep as comma-separated string
      liveLink: initialData.liveLink,
      clientRepo: initialData.clientRepo,
      serverRepo: initialData.serverRepo || "",
      description: initialData.description,
    },
  });

  const { control, handleSubmit } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "images",
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formattedData = {
      ...values,
      images: values.images.map((img) => img.url), // Convert { url: string }[] to string[]
      technology: values.technology.split(",").map((tech) => tech.trim()), // Convert to array
    };

    try {
      const res = await updateProject(initialData._id, formattedData);
      if (res.success) {
        toast.success("Project updated successfully!");
      } else {
        toast.error("Failed to update project.");
      }
    } catch {
      toast.error("Failed to update project.");
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-3 w-full mx-auto"
      >
        {/* Title */}
        <FormField
          control={control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter project title..."
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Dynamic Image Inputs */}
        <div>
          <FormLabel>Images</FormLabel>
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-2">
              <FormField
                control={control}
                name={`images.${index}.url`}
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        placeholder="Enter image URL..."
                        type="text"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
                disabled={fields.length === 1}
              >
                <Trash size={18} />
              </Button>
            </div>
          ))}
          <Button
            type="button"
            variant="secondary"
            className="mt-2 flex items-center gap-2"
            onClick={() => append({ url: "" })}
          >
            <Plus size={18} /> Add Image
          </Button>
        </div>

        {/* Technology */}
        <FormField
          control={control}
          name="technology"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Technology</FormLabel>
              <FormControl>
                <Input
                  placeholder="technology1, technology2, technology3..."
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Live Link */}
        <FormField
          control={control}
          name="liveLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Live Link</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter project live link..."
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Client Repo */}
        <FormField
          control={control}
          name="clientRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Client Repo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter project client repository link..."
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Server Repo */}
        <FormField
          control={control}
          name="serverRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Server Repo</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter project server repository link..."
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Description */}
        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter project description..."
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="text-end">
          <Button type="submit" effect="shine">
            Update Project
          </Button>
        </div>
      </form>
    </Form>
  );
}
