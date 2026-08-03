"use client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DonationRequestDetailsPage() {
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
        console.error("Request Failed:", res.status);
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
      <div className="text-center py-20">
        Loading...
      </div>
    );
  };

  if (!request) {
    return (
      <div className="text-center py-20">
        Request Not Found
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
<div className="flex justify-between items-center gap-6 mb-8">
        <h2 className="text-3xl text-red-500 font-bold">
         Donation Request Details
        </h2>

        <Link
          href="/request"
          className="inline-flex items-center gap-1 text-red-600 hover:text-red-700">
            <ArrowLeft size={18} />
          Back
        </Link>
      </div>
      <div className="bg-red-200 rounded-xl shadow border border-red-300 p-8">

        <div className="grid md:grid-cols-2 gap-6">
<div>
  <p className="font-semibold">Requester Name</p>
  <p>{request.requesterName}</p>
</div>

<div>
  <p className="font-semibold">Requester Email</p>
  <p>{request.requesterEmail}</p>
</div>
          <div>
            <p className="font-semibold">
              Blood Group
            </p>
            <p>{request.bloodGroup}</p>
          </div>

          <div>
            <p className="font-semibold">
              District
            </p>
            <p>{request.recipientDistrict}</p>
          </div>

          <div>
            <p className="font-semibold">
              Upazila
            </p>
            <p>{request.recipientUpazila}</p>
          </div>

          <div>
            <p className="font-semibold">
              Hospital Name
            </p>
            <p>{request.hospitalName}</p>
          </div>

          <div>
            <p className="font-semibold">
              Donation Date
            </p>
            <p>{request.donationDate}</p>
          </div>

          <div>
            <p className="font-semibold">
              Donation Time
            </p>
            <p>{request.donationTime}</p>
          </div>

          <div>
            <p className="font-semibold">
              Status
            </p>

            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                request.donationStatus === "approved"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"}`}>
              {request.donationStatus}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <p className="font-semibold">
            Full Address
          </p>

          <p>{request.fullAddress}</p>
        </div>

        <div className="mt-6">
          <p className="font-semibold">
            Request Message
          </p>

          <p>{request.requestMessage}</p>
        </div>
      </div>
    </div>
  );
}