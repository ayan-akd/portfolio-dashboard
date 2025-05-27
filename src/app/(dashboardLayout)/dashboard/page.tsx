import { ContentLayout } from "@/components/admin-panel/content-layout";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getProjectsData } from "@/services/projects";
import { getMessagesData } from "@/services/messages";
import { getCurrentUser } from "@/lib/verifyToken";

export const metadata = {
  title: "Portfolio | Dashboard",
  description: "Dashboard",
};
async function getDashboardData() {
  const projects = await getProjectsData();
  const messages = await getMessagesData();

  return {
    projects: projects?.data?.length,
    messages: messages?.data?.length,
  };
}

export default async function Dashboard() {
  const stats = await getDashboardData();
  const user = await getCurrentUser();

  return (
    <ContentLayout title="Dashboard">
      <div className="space-y-8 lg:mt-20">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary/20">
            <Image
              src={
                "https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o="
              }
              alt={"User"}
              className="object-cover"
              width={128}
              height={128}
              priority
            />
          </div>
          <div className="text-center">
            <p className="text-muted-foreground">{user?.email}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Projects</CardTitle>
              <CardDescription>Manage your portfolio projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.projects}</div>
              <p className="text-xs text-muted-foreground">Total projects</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Messages</CardTitle>
              <CardDescription>View contact messages</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.messages}</div>
              <p className="text-xs text-muted-foreground">Total messages</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </ContentLayout>
  );
}
