"use client";

import { toast } from "sonner";
import { useFieldArray, useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TAbout } from "@/types/types";
import { Loader2, MinusCircle, Plus } from "lucide-react";
import { Button } from "../ui/button";
import { updateAbout } from "@/services/about";
import { DragDropUploader } from "../shared/DragDropUploader";

const educationSchema = z.object({
  degree: z.string().min(1, "Degree is required"),
  institution: z.string().min(1, "Institution is required"),
  department: z.string().optional(),
  year: z.string().optional(),
});

const experienceSchema = z.object({
  title: z.string().min(1, "Title is required"),
  company: z.string().min(1, "Company is required"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(1, "Description is required"),
  technologies: z.string().optional(),
});

const formSchema = z.object({
  image: z
    .string()
    .url("Please enter a valid image URL")
    .min(1, "Image is required"),
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  bio: z.string().min(1, "Bio is required"),
  education: z
    .array(educationSchema)
    .min(1, "At least one education entry is required"),
  experience: z.array(experienceSchema).optional(),
  address: z.string().min(1, "Address is required"),
  resumeLink: z.string().url("Please enter a valid URL").optional(),
});

export default function AboutForm({
  data,
}: {
  data?: TAbout;
  edit?: boolean;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      image: data?.image || "",
      name: data?.name || "",
      title: data?.title || "",
      bio: data?.bio || "",
      education: data?.education?.map((edu) => {
        return {
          degree: edu.degree,
          institution: edu.institution,
          department: edu.department,
          year: edu.year,
        };
      }) || [{ degree: "", institution: "", department: "", year: "" }],
      experience: data?.experience?.map((exp) => {
        return {
          title: exp.title,
          company: exp.company,
          duration: exp.duration,
          description: exp.description,
          technologies: exp.technologies?.join(", ") || "",
        };
      }) || [
        {
          title: "",
          company: "",
          duration: "",
          description: "",
          technologies: "",
        },
      ],
      address: data?.address || "",
      resumeLink: data?.resumeLink || "",
    },
  });

  const {
    formState: { isSubmitting },
  } = form;

  const {
    fields: educationFields,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
  });

  const {
    fields: experienceFields,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control: form.control,
    name: "experience",
  });

  const addEducation = () => {
    appendEducation({ degree: "", institution: "", department: "", year: "" });
  };

  const addExperience = () => {
    appendExperience({
      title: "",
      company: "",
      duration: "",
      description: "",
      technologies: "",
    });
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const toastId = toast.loading("Updating about information...");

    // Transform the experience array to include technologies as string array
    const formattedExperience = values.experience?.map((exp) => ({
      ...exp,
      technologies: exp.technologies
        ? exp.technologies.split(",").map((tech) => tech.trim())
        : undefined,
    }));

    const newData = {
      image: values.image,
      name: values.name,
      title: values.title,
      bio: values.bio,
      education: values.education,
      experience: formattedExperience,
      address: values.address,
      resumeLink: values.resumeLink,
    };

    try {
      const res = await updateAbout(newData, data?._id as string);

      if (res.success) {
        toast.success(res.message, {
          id: toastId,
        });
      } else {
        toast.error(res.message, {
          id: toastId,
        });
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.", {
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
        {/* Profile Image */}
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Profile Image</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter profile image URL..."
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Drag and drop uploader for image */}
        <DragDropUploader
          name="image"
          label="Upload your profile image"
          multiple={false}
        />

        {/* Name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your full name..."
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Title */}
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your professional title..."
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Bio */}
        <FormField
          control={form.control}
          name="bio"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bio</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your professional bio..."
                  className="resize-none min-h-32"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Education Section */}
        <div>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Education</p>
            <Button
              variant="outline"
              className="size-10"
              onClick={addEducation}
              type="button"
            >
              <Plus className="text-primary" />
            </Button>
          </div>

          {educationFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md mb-4 relative">
              <Button
                variant="ghost"
                className="absolute top-2 right-2 hover:bg-base cursor-pointer"
                onClick={() => removeEducation(index)}
                type="button"
                disabled={educationFields.length === 1}
              >
                <MinusCircle className="text-red-500 size-5" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`education.${index}.degree`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Degree</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter degree..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.institution`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Institution</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter institution name..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.department`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Department (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter department..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`education.${index}.year`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter graduation year..."
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Experience Section */}
        <div>
          <div className="flex justify-between items-center border-t border-b py-3 my-5">
            <p className="text-primary font-bold text-xl">Experience</p>
            <Button
              variant="outline"
              className="size-10"
              onClick={addExperience}
              type="button"
            >
              <Plus className="text-primary" />
            </Button>
          </div>

          {experienceFields.map((field, index) => (
            <div key={field.id} className="p-4 border rounded-md mb-4 relative">
              <Button
                variant="ghost"
                className="absolute top-2 right-2 hover:bg-base cursor-pointer"
                onClick={() => removeExperience(index)}
                type="button"
              >
                <MinusCircle className="text-red-500 size-5" />
              </Button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name={`experience.${index}.title`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter job title..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.company`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter company name..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.duration`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Duration</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="E.g., Jan 2020 - Present"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name={`experience.${index}.technologies`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Technologies (Optional)</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="React, Node.js, MongoDB..."
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        For multiple technologies, use commas to separate
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormField
                    control={form.control}
                    name={`experience.${index}.description`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe your responsibilities and achievements..."
                            className="resize-none min-h-24"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your address..."
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Resume Link */}
        <FormField
          control={form.control}
          name="resumeLink"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Resume Link (Optional)</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter link to your resume..."
                  type="text"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="text-start pt-4">
          <Button variant={"outline"} type="submit">
            {isSubmitting ? <Loader2 className="animate-spin" /> : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
