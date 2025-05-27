import AboutPageComponent from "@/components/about-components/AboutPageComponent";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import { getAbout } from "@/services/about";

export default async function AboutPage() {
    const {data} = await getAbout();
    return (
        <ContentLayout title="About">
            <AboutPageComponent about={data[0]} />
        </ContentLayout>
    );
}