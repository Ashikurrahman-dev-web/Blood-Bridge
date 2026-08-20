"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { ArrowLeft, Send } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const CommentPage = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const user = session?.user;
  const [comment,setComment] = useState("")
  const commentSubmit = async (e) => {
    e.preventDefault();

    const commentData = {
      name: user?.name,
      email: user?.email,
      image: user?.image,
      comment: comment,
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
    <div className="w-full max-w-md mx-auto px-4 mt-10">
  <form onSubmit={commentSubmit} className="w-full">
    <label className="block text-xl font-bold text-red-500 mb-2">
      Comment
    </label>

    {/* Input & Button Container */}
    <div className="relative flex items-center">
      <input
        type="text"
        name="comment"
        value={comment}
        onChange={(e)=> setComment(e.target.value)}
        placeholder="Keep your comment"
        className="w-full border border-red-300 rounded-xl pl-4 pr-12 py-3 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition"
        required
      />

      <button
        type="submit"
className={`absolute right-3 cursor-pointer transition p-1${
comment.trim() ? "text-blue-500 hover:text-blue-600" : "text-gray-400"
}`}
        aria-label="Send comment"
      >
        <Send size={20} />
      </button>
    </div>
  </form>

  {/* Back Link */}
  <div className="text-center mt-6">
    <Link
      href="/"
      className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 transition"
    >
      <ArrowLeft size={18} />
      Back
    </Link>
  </div>
</div>
  );
};

export default CommentPage;