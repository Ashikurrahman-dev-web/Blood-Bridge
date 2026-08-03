"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

export default function DonationRequestsPage() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/public-donation-requests`)
      .then((res) => res.json())
      .then((data) => {
        setRequests(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading donation requests...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Blood Donation Requests
      </h1>

      {requests.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          No Pending Donation Requests Found
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((request) => (
            <div
              key={request._id}
              className="bg-white rounded-xl shadow border p-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-bold text-lg">
                  {request.recipientName}
                </h2>

        <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                  {request.bloodGroup}
                </span>
              </div>

              <div className="space-y-2 text-gray-600 text-sm">
                <p>
                  <strong>Location:</strong>{" "}
                  {request.recipientDistrict},{" "}
                  {request.recipientUpazila}
                </p>

                <p>
                  <strong>Date:</strong>{" "}
                  {request.donationDate}
                </p>

                <p>
                  <strong>Time:</strong>{" "}
                  {request.donationTime}
                </p>
              </div>

              <Link
                href={`/request/${request._id}`}
className="mt-5 inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
              >
                <Eye size={18} />
                View Details
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}