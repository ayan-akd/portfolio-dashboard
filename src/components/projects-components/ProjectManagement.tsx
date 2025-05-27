"use client";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CreateProjectForm from "@/components/forms/CreateProjectForm";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Trash2, Edit } from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import Image from "next/image";
import { TProject } from "@/types/types";
import ConfirmationBox from "@/components/ConfirmationBox";
import EditProjectForm from "@/components/forms/EditProjectForm";
import { Badge } from "@/components/ui/badge";
import { deleteProject } from "@/services/projects";

export type TProjectExtended = TProject & {
  _id: string;
};

export default function ProjectManagement({
  projects,
}: {
  projects: TProjectExtended[];
}) {
  const [selectedProject, setSelectedProject] =
    useState<TProjectExtended | null>(null);
  const [open, setOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isImagePreview, setIsImagePreview] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteProject(id);
      if (res.success) {
        toast.success("Project deleted successfully");
      } else {
        toast.error("Failed to delete project");
      }

    } catch (error) {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project");
    }
  };

  const handleViewProject = (project: TProjectExtended) => {
    setSelectedProject(project);
    setOpen(true);
  };

  return (
    <ContentLayout title="Manage Projects">
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">All Projects</h1>
          <CustomModal
            content={<CreateProjectForm />}
            trigger={
              <Button className="h-8" effect={"shine"}>
                Add Project
              </Button>
            }
            title="Add Project"
          />
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Technology</TableHead>
                <TableHead className="max-w-[300px]">Description</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((project) => (
                <TableRow key={project._id}>
                  <TableCell>
                    <Image
                      src={project.images[0]}
                      alt={project.title}
                      width={64}
                      height={64}
                      className="rounded"
                      priority
                    />
                  </TableCell>
                  <TableCell className="font-medium">{project.title}</TableCell>
                  <TableCell className="truncate max-w-[200px]">
                    {project.technology.slice(0, 3).map((tech, index) => (
                      <Badge key={index} variant="secondary" className="mr-1">
                        {tech}
                      </Badge>
                    ))}
                    {project.technology.length > 3 && (
                      <Badge variant="secondary">
                        +{project.technology.length - 3}
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="max-w-[300px] truncate">
                    {project.description}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewProject(project)}
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
                          <EditProjectForm
                            initialData={project}
                          />
                        }
                        title="Edit Project"
                      />
                      <ConfirmationBox
                        trigger={
                          <Button variant="destructive" size="sm">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        }
                        onConfirm={() => handleDelete(project._id)}
                        title="Are you sure you want to delete this project?"
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
          <DialogContent className="max-w-3xl max-h-[calc(100vh-4rem)] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{selectedProject?.title}</DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                {selectedProject?.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative group cursor-pointer"
                    onClick={() => {
                      setSelectedImageIndex(index);
                      setIsImagePreview(true);
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${selectedProject.title} - ${index + 1}`}
                      width={400}
                      height={300}
                      className="w-full h-[200px] object-cover rounded"
                      priority
                    />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/20">
                      <div className="bg-black/50 p-2 rounded-full">
                        <Eye className="h-8 w-8 text-white" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="font-semibold">Technology Stack:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject?.technology.map((tech, index) => (
                    <span
                      key={index}
                      className="bg-secondary px-2 py-1 rounded text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="font-semibold">Description:</p>
                <p className="whitespace-pre-wrap">
                  {selectedProject?.description}
                </p>
              </div>
              <div className="flex gap-4">
                <a
                  href={selectedProject?.liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">Live Link</Button>
                </a>
                <a
                  href={selectedProject?.clientRepo}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outline">Client Repo</Button>
                </a>
                {selectedProject?.serverRepo && (
                  <a
                    href={selectedProject.serverRepo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline">Server Repo</Button>
                  </a>
                )}
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
              src={selectedProject?.images[selectedImageIndex] || ""}
              alt={`${selectedProject?.title} - ${selectedImageIndex + 1}`}
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
