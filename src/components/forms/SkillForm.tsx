"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TSkill } from "@/types/types";
import { toast } from "sonner";
import { createSkill, updateSkill } from "@/services/skill";

// Form validation schema without proficiency
const skillFormSchema = z.object({
  name: z.string().min(1, "Skill name is required"),
  category: z.enum(["frontend", "backend", "tools", "database"], {
    required_error: "Please select a category",
  }),
  icon: z.string().min(1, "Icon path is required"),
});

type SkillFormData = z.infer<typeof skillFormSchema>;

interface SkillFormProps {
  edit: boolean;
  data?: TSkill;
}

const SkillForm = ({ edit, data }: SkillFormProps) => {
  const form = useForm<SkillFormData>({
    resolver: zodResolver(skillFormSchema),
    defaultValues: {
      name: data?.name || "",
      category: data?.category || "frontend",
      icon: data?.icon || "",
    },
  });

  async function onSubmit(values: z.infer<typeof skillFormSchema>) {
    const toastId = toast.loading(
      edit ? "Updating skill..." : "Creating skill..."
    );

    const newData = {
      category: values.category,
      name: values.name,
      icon: values.icon,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Skill Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Skill Name</FormLabel>
              <FormControl>
                <Input placeholder="e.g., React, Node.js, MongoDB" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Category */}
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
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                  <SelectItem value="database">Database</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Icon Path */}
        <FormField
          control={form.control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Icon Path</FormLabel>
              <FormControl>
                <Input placeholder="e.g., /icons/react.png" {...field} />
              </FormControl>
              <FormMessage />
              <p className="text-sm text-muted-foreground">
                Enter the path to the icon image (e.g., /icons/skillname.png)
              </p>
            </FormItem>
          )}
        />

        {/* Submit Button */}
        <div className="flex justify-end space-x-2">
          <Button type="submit" className="min-w-[100px]">
            {edit ? "Update Skill" : "Create Skill"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default SkillForm;
