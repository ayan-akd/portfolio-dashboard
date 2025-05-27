import BlogManagement from "@/components/blog-components/BlogManagement";
import { getBlogsData } from "@/services/blogs";
import { TBlog } from "@/types/types";

export const metadata = {
    title: "Portfolio | Manage Blogs",
    description: "Manage Blogs",
};
export type TExtendedBlog = TBlog & {
  _id: string;
};
export default async function ManageBlogs() {
    const { data } = await getBlogsData();
    return (
        <BlogManagement blogs= {data} />
    );
}