"use client";
import { Button } from "@/components/ui/button";
import { TProject } from "@/types/types";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function ProjectDetailsCard({ project }: { project: TProject }) {
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
      <h1 className="text-4xl font-bold text-center">{project.title}</h1>

      <div className="w-full px-3 md:px-0">
        <Carousel className="w-full"
          plugins={[
            Autoplay({
              delay: 2000,
            }),
          ]}
        >
          <CarouselContent>
            {project.images.map((image, index) => (
              <CarouselItem key={index}>
                <div className="relative w-full">
                  <Image
                    src={image}
                    alt={`${project.title} - ${index + 1}`}
                    width={1280}
                    height={720}
                    className="object-cover rounded-lg"
                    priority
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-semibold mb-3">Technology Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.technology.map((tech, index) => (
              <Badge key={index} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-3">Project Description</h2>
          <p className="text-muted-foreground whitespace-pre-wrap">
            {project.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button className="w-full" variant="default">
              <ExternalLink className="mr-2 h-4 w-4" />
              Live Site
            </Button>
          </a>
          <a
            href={project.clientRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button className="w-full" variant="outline">
              <Github className="mr-2 h-4 w-4" />
              Client Repository
            </Button>
          </a>
          {project.serverRepo && (
            <a
              href={project.serverRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1"
            >
              <Button className="w-full" variant="outline">
                <Github className="mr-2 h-4 w-4" />
                Server Repository
              </Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
