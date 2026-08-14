"use client";
import { useSession } from "@/lib/auth-client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CiBookmarkPlus } from "react-icons/ci";

export default function DonationRequestDetailsPage() {
  const { id } = useParams();
  const {data: session} = useSession()
  const user = session?.user;
  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter()
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
const handleBooking = async ()=>{
try{
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/booking/${id}`,
  {method: "PATCH",
headers:{
  'Content-Type': 'application/json'
},
body: JSON.stringify({
  patientName: user?.name,
  patientEmail: user?.email
})
});
const data = res.json()
if(res.ok){
  toast.success("Booking Confirmed")
  router.push('/myBooking')
}
}catch(error){
  console.log(error)
  toast.error("Something Went Wrong")
}
};
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
            <p>{request.requesterBloodGroup}</p>
          </div>

          <div>
            <p className="font-semibold">
              District
            </p>
            <p>{request.requesterDistrict}</p>
          </div>

          <div>
            <p className="font-semibold">
              Upazila
            </p>
            <p>{request.requesterUpazila}</p>
          </div>

          <div>
            <p className="font-semibold">
              Donation Date
            </p>
            <p>{new Date(request.createdAt).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="font-semibold">
              Donation Time
            </p>
            <p>{new Date(request.createdAt).toLocaleTimeString()}</p>
          </div>
        </div>
<div className="grid md:grid-cols-2 gap-6">
        <div className="mt-6">
          <p className="font-semibold">
            Full Address
          </p>

          <p>{request.fullAddress}</p>
        </div>
{user?.email !== request.requesterEmail &&(
  <div className="mt-6">
<button onClick={handleBooking}
className="bg-gray-200 text-blue-500 rounded-2xl p-2 cursor-pointer flex gap-0.5">
  Booking<CiBookmarkPlus className="mt-0.5 text-2xl" /></button>
  </div>
)}
        <div className="mt-6">
          <p className="font-semibold">
            Request Message
          </p>

          <p>{request.requestMessage}</p>
        </div>
        </div>
      </div>
       <Link
          href="/request"
className="inline-flex items-center gap-1 text-red-600 hover:text-red-700 mt-2">
            <ArrowLeft size={18} />
          Back
        </Link>
    </div>
  );
}