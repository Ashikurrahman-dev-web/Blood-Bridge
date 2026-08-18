"use client"
import { authClient } from '@/lib/auth-client';
import { Avatar } from '@heroui/react';
import { Trash2 } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CommentAdmin = () => {
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
  useEffect(() => {
    fetchData();
  }, []);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedDeleteId, setSelectedDeleteId] = useState(null)
const openDeleteModal = (id)=>{
  setSelectedDeleteId(id)
  setIsModalOpen(true);
} 
  const handleDelete = async () => {
    const {data: tokenData} = await authClient.token();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/comment/${selectedDeleteId}`,
        {
          method: "DELETE",
          headers:{
            authorization: `Bearer ${tokenData?.token}`
          }
        }
      );
      const data = await res.json();

      if (data.deletedCount > 0) {
  setComments((prev)=> prev.filter(
    (comm)=> comm._id !== selectedDeleteId
  )) 
  setIsModalOpen(false);
  setSelectedDeleteId(null);     
        toast.success("Comment Deleted");      
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }    
    return (
<div className="max-w-7xl mx-auto mt-8 mb-8">
      <p className="font-semibold px-4">Comments ({comments.length})</p>
      <div className="grid lg:grid-cols-2 gap-8 p-4">
        {Array.isArray(comments)&&
 comments.map((comment) => (
          <div
            key={comment._id}
            className="bg-gray-300 rounded-2xl p-4"
          >
            <div className="flex items-center gap-2">
              <div className="flex flex-col gap-4 items-center">
                <Avatar size="sm">
                  <Avatar.Image
                    alt={comment?.name || "User"}
                    src={comment?.image}
                    referrerPolicy="no-referrer"
                  />
                </Avatar>
    <span className="text-green-500 shadow-sm font-medium">{comment?.name || "Loading..."}</span>
    <span className="text-green-500 shadow-sm font-medium">{comment?.email || "Loading..."}</span>
                <p className="text-xs text-gray-500">
                  {new Date(comment.createAt).toLocaleString()}
                </p>
              </div>
              <p className="ml-4 text-gray-800">{comment.comment}</p>
            </div>

            <div className="flex gap-2 mt-3">
<button
                  onClick={() => openDeleteModal(comment._id)}
                  className="text-red-500 bg-gray-200 rounded-2xl p-2 flex gap-1 cursor-pointer"
                >
                  <Trash2 size={16} className='mt-1' />
                  Delete
                </button>              
            </div>
          </div>
        ))       
        }
      </div>
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
};

export default CommentAdmin;