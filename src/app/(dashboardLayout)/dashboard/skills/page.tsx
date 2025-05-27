import { ContentLayout } from "@/components/admin-panel/content-layout";
import AdminSkillPage from "@/components/skill-component/AdminSkillPage";
import { getAllSkills } from "@/services/skill";

export default async function SkillsPage() {
    const {data} = await getAllSkills();
    return (
        <ContentLayout title="Skills">
           <AdminSkillPage skillData={data} />
        </ContentLayout>
    );
}