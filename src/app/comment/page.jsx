"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const CommentPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;

  const commentSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const commentData = {
      name: user?.name,
      email: user?.email,
      image: user?.image,
      comment: formData.get("comment"),
      createAt: new Date().toISOString(),
    };
    const {data: tokenData} = await authClient.token()
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/comment`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${tokenData?.token}`
          },
          body: JSON.stringify(commentData),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("Comment Send");
        router.push("/");
      } else {
        toast.error(data?.message || "Comment failed");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong");
    }
  };

  return (
    <div>
      <form
        onSubmit={commentSubmit}
        className="w-[40%] mt-10 text-center mx-90 relative"
      >
        <label className="block text-xl font-bold text-red-500 mb-2">
          Comment
        </label>

        <input
          type="text"
          name="comment"
          placeholder="Keep your comment"
className="w-full border border-red-300 rounded-xl px-4 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-red-500/50 transition"
          required
        />

        <div className="absolute right-1 bottom-1">
          <button
            type="submit"
            className="cursor-pointer text-blue-500"
          >
            <Send />
          </button>
        </div>
      </form>

      <div className="text-center mt-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 mt-2"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>
    </div>
  );
};

export default CommentPage;