"use client";

import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { TSkill } from "@/types/types";
import { Loader2 } from "lucide-react";
import { DragDropUploader } from "../shared/DragDropUploader";
import { createSkill, updateSkill } from "@/services/skill";
import { Button } from "../ui/button";

const formSchema = z.object({
  category: z.enum(["frontend", "backend", "tools"], {
    required_error: "Please select a category",
  }),
  name: z.string().min(1, "Skill name is required"),
  icon: z.union([
    z.string().min(1, "Icon is required"),
    z.string().url("Please enter a valid icon URL").min(1, "Icon is required"),
  ]),
  proficiency: z
    .number()
    .min(1, "Proficiency must be at least 1")
    .max(100, "Proficiency cannot exceed 100"),
});

const categoryOptions = [
  { value: "frontend", label: "Frontend" },
  { value: "backend", label: "Backend" },
  { value: "tools", label: "Tools" },
] as const;

export default function SkillForm({
  data,
  edit = false,
}: {
  data?: TSkill;
  edit?: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: data?.category || undefined,
      name: data?.name || "",
      icon: data?.icon || "",
    },
  });

  const {
    formState: { isSubmitting },
    watch,
  } = form;

  const proficiencyValue = watch("proficiency");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading(
      edit ? "Updating skill..." : "Creating skill..."
    );

    const newData = {
      category: values.category,
      name: values.name,
      icon: values.icon,
      proficiency: values.proficiency,
    };

    try {
      const res = edit
        ? await updateSkill(newData, data?._id as string)
        : await createSkill(newData);

      if (res.success) {
        toast.success(res.message, {
          id: toastId,
        });
      } else {
        toast.error(res.message, {
          id: toastId,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Form submission error", error);
      toast.error(error.message, {
        id: toastId,
      });
    } finally {
      form.reset();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 w-full mx-auto"
      >
        {/* Category Selection */}
        <FormField
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categoryOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormDescription>
                Choose the category that best describes this skill
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Skill Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter skill name (e.g., React, Node.js, Docker)..."
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Icon URL */}
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon URL</FormLabel>
              <FormControl>
                <Input placeholder="Enter icon URL..." type="text" {...field} />
              </FormControl>
              <FormDescription>
                Provide a URL to an icon representing this skill
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Drag and drop uploader for icon */}
        <DragDropUploader
          name="icon"
          label="Upload skill icon"
          multiple={false}
        />

        {/* Proficiency Level */}
        <FormField
          control={form.control}
          name="proficiency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proficiency Level ({proficiencyValue}%)</FormLabel>
              <FormControl>
                <div className="px-3">
                  <Slider
                    min={1}
                    max={100}
                    step={1}
                    value={[field.value]}
                    onValueChange={(value) => field.onChange(value[0])}
                    className="w-full"
                  />
                </div>
              </FormControl>
              <FormDescription>
                Rate your proficiency level from 1% to 100%
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Proficiency Level Alternative Input */}
        <FormField
          control={form.control}
          name="proficiency"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Proficiency Level (Manual Input)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter proficiency level (1-100)..."
                  type="number"
                  min={1}
                  max={100}
                  {...field}
                  onChange={(e) =>
                    field.onChange(parseInt(e.target.value) || 0)
                  }
                />
              </FormControl>
              <FormDescription>
                You can also manually enter the proficiency level
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-start pt-4">
          <Button type="submit">
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
