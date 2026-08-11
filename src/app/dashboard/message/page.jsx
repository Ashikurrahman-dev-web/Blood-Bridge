"use client";

import { Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const MessagePage = () => {
  const [message, setMessage] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/message/admin`
      );

      const data = await res.json();

      setMessage(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "Are you sure you want to delete this message?"
    );

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/message/admin/${id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();

      if (data.deletedCount > 0) {
        toast.success("Message Deleted");
        fetchData();
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
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">Message</h1>

      {message.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No Message Found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {message.map((m) => (
            <div
              key={m._id}
              className="bg-red-200 rounded-xl shadow border p-6 mb-4"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">{m.fullName}</h2>
              </div>

              <div className="space-y-2 text-gray-600 text-sm">
                <p>
                  <strong>Email:</strong> {m.email}
                </p>

                <p>
                  <strong>Topic:</strong> {m.topic}
                </p>

                <p>
                  <strong>Message:</strong> {m.message}
                </p>

                <p>
                  <strong>Sending Time:</strong>{" "}
                  {new Date(m.createdAt).toLocaleString()}
                </p>

                <button
                  onClick={() => handleDelete(m._id)}
                  className="text-red-500 bg-gray-200 rounded-2xl p-2 flex gap-1 cursor-pointer"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessagePage;

