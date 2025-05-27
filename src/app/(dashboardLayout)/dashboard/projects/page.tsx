import ProjectManagement from "@/components/projects-components/ProjectManagement";
import { getProjectsData } from "@/services/projects";
import { TProject } from "@/types/types";
export const metadata = {
  title: 'Portfolio | Manage Projects',
  description: 'Manage your projects',
};

export type TProjectExtended = TProject & {
  _id: string;
};
export default async function ManageProjects() {
  const {data} = await getProjectsData();
    return (
        <ProjectManagement projects={data} />
    );
}