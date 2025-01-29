"use client";
import { useRouter } from "next/navigation";
import { useFormStatus } from "react-dom";

const EditPostButton = ({ slug }) => {
  const { pending } = useFormStatus()
    const router = useRouter();
  const handleEdit = async (e) => {
    e.preventDefault();

    router.push(`/admin/edit?slug=${slug}`);
    try {
      // You can add additional handling here, such as refreshing the page or state
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  return (
    <button disabled={pending} onClick={handleEdit} type="button">
      Edit
    </button>
  );
};

export default EditPostButton;