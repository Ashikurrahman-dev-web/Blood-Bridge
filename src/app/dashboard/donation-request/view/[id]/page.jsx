"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { CheckCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function DonationRequestDetails() {
  const { id } = useParams();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
useEffect(() => {
  fetchRequest();
}, [id]);
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
const handleDone = async(id)=>{
try{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/booking-donation/done/${id}`,{
    method: "PATCH",
    headers:{
        'Content-Type': "application/json"
    },
    body: JSON.stringify()
});
const data = await res.json();
if(res.ok){
    toast.success("Donation Confirmed")
    fetchRequest()
}
}catch(error){
   console.log(error);
   toast.error("Something Went Wrong"); 
}
};  
if(loading){
return (
    <div className="flex justify-center items-center min-h-screen">
<div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin">
 </div>
    </div>
  );    
};  

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
            <p className="text-sm text-gray-500">Blood Group</p>
            <p className="font-semibold text-red-600">
              {request.requesterBloodGroup}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">District</p>
            <p className="font-semibold">
              {request.requesterDistrict}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Upazila</p>
            <p className="font-semibold">
              {request.requesterUpazila}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Request Date</p>
            <p className="font-semibold">
              {new Date(request.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Request Time</p>
            <p className="font-semibold">
              {new Date(request.createdAt).toLocaleTimeString()}
            </p>
          </div>
<div className="mt-6">
          <p className="text-sm text-gray-500 mb-1">
            Full Address
          </p>

          <p className="font-medium">
            {request.fullAddress}
          </p>
        </div>
        </div>   

        <div className="mt-6">
          <p className="text-sm text-gray-500 mb-1">
            Request Message
          </p>

          <div className="bg-gray-50 p-4 rounded-lg">
            {request.requestMessage}
          </div>
        </div>
{request.donationStatus === "booked" &&
          request.patientName && (
            <div className="mt-8 border-t pt-6">
              <h3 className="font-bold text-lg mb-4 text-center">
                Patient Information
              </h3>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Patient Name
                  </p>
                  <p className="font-semibold">
                    {request.patientName}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-gray-500">
                    Patient Email
                  </p>
                  <p className="font-semibold">
                    {request.patientEmail}
                  </p>
                </div>
                <div>
                  <p className="font-bold text-red-500">
If you donate Blood, click this button, otherwise not.
                  </p>
<button onClick={()=>handleDone(request._id)}
className="bg-gray-200 text-green-500 rounded-2xl p-2 cursor-pointer flex items-center gap-0.5">
   <CheckCircle className="w-3 h-3" />Done</button>                  
                </div>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}