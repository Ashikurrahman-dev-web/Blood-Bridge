"use client";
import { authClient, useSession } from "@/lib/auth-client";
import { Avatar } from "@heroui/react";
import { MoreVertical, Send } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function HomePage() {
  const scrollRef = useRef(null);
  const dropdownRef = useRef(null);
  const [dropdownOpen, setDropdownOpen] = useState(null);
  const [editing, setEditing] = useState(null);
  const [editComment, setEditComment] = useState("");
  const {data: session} = useSession();
  const user = session?.user;
 useEffect(() => {
     fetchData();
   }, []);  
  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.7;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };
 const messageSubmit = async(e)=>{
e.preventDefault();
const formData = new FormData(e.currentTarget);
const messageData = {
...Object.fromEntries(formData.entries()),
createdAt: new Date().toISOString(),  
};
try{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/message`,{
  method: "POST",
  headers:{
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(messageData)
});
const data = await res.json()
toast.success("Message Send")
}catch(error){
  console.log(error)
toast.error("Something went Wrong")  
}
 };
 const [comments, setComments] = useState([]);
   const [loading, setLoading] = useState(true);
   const fetchData = async () => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URI}/api/comment/admin`);

    const data = await res.json();

    console.log("Comment API response:", data);
    console.log("Status:", res.status);
    if (!res.ok) {
      console.log("Comment API error:", data);
      setComments([]);
      return;
    }
    if (Array.isArray(data)) {
      setComments(data);
    } else {
      setComments([]);
    }

  } catch (error) {
    console.log("Fetch comments error:", error);
    setComments([]);
  } finally {
    setLoading(false);
  }
};
const handleEdit = async(id)=>{
  const {data: tokenData} = await authClient.token()
try{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/comment/${id}`,{
    method: "PATCH",
    headers:{
        'Content-Type': "application/json",
        authorization: `Bearer ${tokenData?.token}`,
    },
    body: JSON.stringify({
      comment: editComment,
    })
});
const data = await res.json();
if(res.ok){
    toast.success("Comment Edited")
    setEditing(null);
      setEditComment("");
    fetchData()
}
}catch(error){
   console.log(error);
   toast.error("Something Went Wrong"); 
}
}; 
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedDeleteId, setSelectedDeleteId] = useState(null)
const openDeleteModal = (id)=>{
  setSelectedDeleteId(id)
  setIsModalOpen(true);
} 
const handleDelete = async () => {
  const {data: tokenData} = await authClient.token()
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/comment/${selectedDeleteId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${tokenData?.token}`,
          },
        }
      );
      const data = await res.json();
      if (data.deletedCount > 0) {
setComments((pre)=> pre.filter(
  (comm)=> comm._id !== selectedDeleteId
));
setIsModalOpen(false);
setSelectedDeleteId(null)        
toast.success("Comment Deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };
  return (
    <div className="min-h-screen overflow-hidden">
<section className="relative relative-dot-grid py-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center justify-center min-h-[80vh]">
<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
<div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5 text-red-400 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
          🩸 Save Lives, Give Blood
        </div>
<h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-3xl leading-[1.15] bg-clip-text text-red-500">
Connecting Heroes With Those In <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">Urgent Need</span>
        </h1>
        <p className="mt-6 text-base sm:text-lg text-slate-500 max-w-2xl leading-relaxed">
Your small act can write a big story for someone else. Register today as a donor or instantly search for verified blood savers available in your local district.
        </p>
     </section>
      <hr className="border-gray-300 max-w-7xl mx-auto" />
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
<h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-red-500">
              Get In Touch With Us
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed">
Have questions about donating blood, funding safety, or account credentials? Drop us a message, our team or volunteers will reach out immediately.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-red-500 shrink-0">
                  <FaPhoneAlt className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Emergency Contact Number</p>
                  <p className="text-sm font-semibold text-slate-500 mt-0.5">+880 1700-000000</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-red-500 shrink-0">
                  <FaEnvelope className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Official Email Support</p>
                  <p className="text-sm font-semibold text-slate-500 mt-0.5">support@bloodflow.com</p>
                </div>
              </div>
            </div>
          </div>
<div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <form onSubmit={messageSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
               <label className="block text-xs font-semibold text-slate-500 mb-2">Full Name</label>
                  <input 
                    type="text"
                    name="fullName" 
                    placeholder="Name" 
className="w-full border border-red-300 rounded-xl px-4 py-3 text-sm text-black placeholder-white focus:outline-none focus:border-red-500/50 transition"
                    required
                  />
                </div>
                <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="john@example.com" 
className="w-full border border-red-300 rounded-xl px-4 py-3 text-sm text-black placeholder-white focus:outline-none focus:border-red-500/50 transition"
                    required
                  />
                </div>
              </div>

              <div>
        <label className="block text-xs font-semibold text-slate-500 mb-2">Message Topic</label>
                <input 
                  type="text" 
                  name="topic"
                  placeholder="How can we help you?" 
className="w-full border border-red-300 rounded-xl px-4 py-3 text-sm text-black placeholder-white focus:outline-none focus:border-red-500/50 transition"
                  required
                />
              </div>

              <div>
    <label className="block text-xs font-semibold text-slate-500 mb-2">Your Detailed Message</label>
                <textarea 
                name="message"
                  rows="4" 
                  placeholder="Write your message here..." 
className="w-full border border-red-300 rounded-xl px-4 py-3 text-sm text-black placeholder-white focus:outline-none focus:border-red-500/50 transition resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
className="w-full inline-flex items-center justify-center font-bold text-xs bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md shadow-pink-500/10 hover:shadow-pink-500/20 hover:scale-[1.01] active:scale-[0.99] transition h-11 px-6 rounded-xl cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
<section className="py-24 px-6 max-w-7xl mx-auto">
  <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-red-500 text-center">
              User's Comment ({comments.length})
            </h2>
<div className="relative group max-w-6xl mx-auto px-4 py-6">
      <button
        onClick={() => handleScroll('left')}
        aria-label="Previous"
className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 bg-red-200 hover:bg-red-300 text-gray-800 w-11 h-11 rounded-full shadow-lg border border-red-400 items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:outline-none"
      >
        &#10094;
      </button>
{loading ?(
<div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>  
):(
<div
        ref={scrollRef}
className="flex gap-4 overflow-x-auto snap-x snap-mandatory p-2 scrollbar-none scroll-smooth touch-pan-x select-none"
      >
{Array.isArray(comments) &&
 comments.map((comment) => (
          <div
            key={comment._id}
            className="min-w-[320px] h-36 flex flex-col justify-between border border-red-300 p-3 hover:border-red-500 rounded-2xl snap-start flex-shrink-0 shadow-xl bg-white"
          >
            <div className="flex gap-2 items-center rounded">
              <Avatar size="sm">
                <Avatar.Image
                  alt={comment?.name || "User"}
                  src={comment?.image}
                  referrerPolicy="no-referrer"
                />
              </Avatar>

              <div className="flex-1 min-w-0">
                <p className="text-green-500 text-xs font-bold truncate">
                  {comment?.name || "Loading..."}
                </p>
                <p className="text-green-500 text-xs font-bold truncate">
                  {comment?.email || "Loading..."}
                </p>
                
              </div>

              <p className="text-gray-500 text-[10px] whitespace-nowrap">
      {new Date(comment.createAt).toLocaleString()}
              </p>
            </div>

<div className="w-full h-full flex overflow-hidden">
  <textarea
className="text-gray-800 text-xs w-full h-20 resize-none outline-none overflow-y-auto break-words whitespace-normal"
value={editing === comment._id ? editComment : comment.comment || ""}
  onChange={(e) => setEditComment(e.target.value)}
  disabled={editing !== comment._id}
/>
  {editing === comment._id && user?.email === comment.email && (
    <button
      onClick={() => handleEdit(comment._id)}
      className="mt-10 cursor-pointer">
      <Send className={editComment.trim() ?"text-blue-500" :"text-gray-400"} />

    </button>
  )}

  <div className="relative w-[3%] h-[4%]"
    ref={dropdownRef}>
    <button
      className="cursor-pointer"
      onClick={() =>
        setDropdownOpen(
          dropdownOpen === comment._id ? null : comment._id
        )
      }
      disabled={!session}>
      <MoreVertical size={14} />
    </button>

    {dropdownOpen === comment._id && (
<div className="absolute right-1 w-20 bg-white border border-red-200 rounded-2xl shadow-xl grid">

        {user?.email === comment.email && (
          <>
            {editing !== comment._id ? (
<button
onClick={() => {setEditing(comment._id);setEditComment(comment.comment);setDropdownOpen(null);}}
                className="cursor-pointer text-green-500 rounded-lg mb-1">
                Edit
              </button>
            ):(
 <button
  onClick={() => {setEditing(null);setDropdownOpen(null);}}
                className="cursor-pointer text-pink-500 rounded-lg mb-1">
                cancel
              </button>             
            )}

          <button onClick={()=>{ openDeleteModal(comment._id); setDropdownOpen(null)}}
              className="cursor-pointer text-red-500 rounded-lg mb-1 mr-2"
            >
              Delete
            </button>
          </>
        )}

      </div>
    )}
  </div>
</div>
          </div>
        ))}

      </div>  
)}      
      <button
        onClick={() => handleScroll('right')}
        aria-label="Next"
className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 bg-red-200 hover:bg-red-300 text-gray-800 w-11 h-11 rounded-full shadow-lg border border-red-400 items-center justify-center transition-all opacity-0 group-hover:opacity-100 focus:outline-none"
      >
        &#10095;
      </button>
    </div>
    <div className="text-center">
      <Link
        href="/comment"
        className="w-[40%] inline-flex items-center justify-center font-bold text-xs bg-gray-300 shadow-md hover:scale-[1.01] active:scale-[0.99] transition h-11 px-6 rounded-xl cursor-pointer"
      >
        Keep Your Comment
      </Link>
    </div>
  </section>
  {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 dynamic-modal">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Donation Request?</h3>
            <p className="text-gray-600 text-sm mb-5">
        Are you sure you want to delete this donation request? This action cannot be reverted.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm rounded-lg transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}