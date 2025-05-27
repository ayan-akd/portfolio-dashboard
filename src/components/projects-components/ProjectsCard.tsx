import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import Link from "next/link";
import { TProjectExtended } from "@/app/(dashboardLayout)/dashboard/projects/page";

export default function ProjectCard({
  project,
}: {
  project: TProjectExtended;
}) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 flex flex-col h-full">
      <CardHeader className="p-0">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={project.images[0]}
            alt={project.title}
            width={1280}
            height={720}
            className="object-cover group-hover:scale-110 transition-transform duration-300"
            priority
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="mb-4 line-clamp-1">{project.title}</CardTitle>
        <div className="space-y-4">
          <p className="text-muted-foreground line-clamp-2 min-h-[2.5rem]">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.technology.slice(0, 3).map((tech, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {tech}
              </Badge>
            ))}
            {project.technology.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{project.technology.length - 3}
              </Badge>
            )}
          </div>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0 flex flex-col gap-2">
        <div className="flex gap-2 w-full">
          <Link href={project?.liveLink} className="flex-1" target="_blank">
            <Button variant="outline" className="w-full">
              Live Site
            </Button>
          </Link>
          <Link href={project?.clientRepo} className="flex-1" target="_blank">
            <Button variant="outline" className="w-full">
              Client
            </Button>
          </Link>
          {project?.serverRepo && (
            <Link href={project?.serverRepo} className="flex-1" target="_blank">
              <Button variant="outline" className="w-full">
                Server
              </Button>
            </Link>
          )}
        </div>
        <Link href={`/projects/${project._id}`} className="w-full">
          <Button effect={"shine"} className="w-full" variant="default">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
