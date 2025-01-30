import AdminPostForm from "@/components/adminPostForm/adminPostForm";
import { getPost } from "@/lib/data";






const EditPostPage = async ({ searchParams }) => {
  const { slug } = searchParams
  console.log(`${slug}`)
  const post = await getPost(slug);
  const parsedPost = JSON.parse(JSON.stringify(post))
  console.log(post)
  return (
    <div>
      <AdminPostForm post={parsedPost} />
    </div>
  );
};

export default EditPostPage;