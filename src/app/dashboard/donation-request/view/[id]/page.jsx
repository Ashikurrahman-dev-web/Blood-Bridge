"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function DonationRequestDetails() {
  const { id } = useParams();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  const fetchRequest = async () => {
    try {
      if (!id) return;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/donation-request/${id}`);

      if (!res.ok) {
        console.error(
          "Request failed:",
          res.status
        );
        setLoading(false);
        return;
      }

      const data = await res.json();

      setRequest(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  fetchRequest();
}, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

 if (!request || request.message) {
    return (
      <div className="text-center py-10">
        <h2 className="text-xl font-semibold text-red-500">
          Donation Request Not Found
        </h2>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">

      <div className="mb-6">
        <Link
          href="/dashboard/mydonationrequest"
          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
        >
          <ArrowLeft size={18} />
          Back
        </Link>
      </div>

      <div className="bg-red-200 rounded-xl shadow border p-8">

        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">
            Donation Request Details
          </h1>

          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold
            ${
              request.donationStatus === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : ""
            }
            ${
              request.donationStatus === "inprogress"
                ? "bg-blue-100 text-blue-700"
                : ""
            }
            ${
              request.donationStatus === "done"
                ? "bg-green-100 text-green-700"
                : ""
            }
            ${
              request.donationStatus === "canceled"
                ? "bg-red-100 text-red-700"
                : ""
            }`}
          >
            {request.donationStatus}
          </span>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div>
            <p className="text-sm text-gray-500">Requester Name</p>
            <p className="font-semibold">
              {request.requesterName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Requester Email</p>
            <p className="font-semibold">
              {request.requesterEmail}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Recipient Name</p>
            <p className="font-semibold">
              {request.recipientName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Blood Group</p>
            <p className="font-semibold text-red-600">
              {request.bloodGroup}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">District</p>
            <p className="font-semibold">
              {request.recipientDistrict}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Upazila</p>
            <p className="font-semibold">
              {request.recipientUpazila}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Hospital Name</p>
            <p className="font-semibold">
              {request.hospitalName}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Donation Date</p>
            <p className="font-semibold">
              {request.donationDate}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Donation Time</p>
            <p className="font-semibold">
              {request.donationTime}
            </p>
          </div>

        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-1">
            Full Address
          </p>

          <p className="font-medium">
            {request.fullAddress}
          </p>
        </div>

        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-1">
            Request Message
          </p>

          <div className="bg-gray-50 p-4 rounded-lg">
            {request.requestMessage}
          </div>
        </div>

        {request.donationStatus === "inprogress" &&
          request.donorName && (
            <div className="mt-8 border-t pt-6">
              <h3 className="font-bold text-lg mb-4">
                Donor Information
              </h3>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Donor Name
                  </p>
                  <p className="font-semibold">
                    {request.donorName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Donor Email
                  </p>
                  <p className="font-semibold">
                    {request.donorEmail}
                  </p>
                </div>
              </div>
            </div>
          )}

      </div>
    </div>
  );
}