"use client";

import { authClient, useSession } from "@/lib/auth-client";
import { XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const BookingPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const [bookingData, setBookingData] = useState([]);
  const [pending, setPending] = useState(true);

  useEffect(() => {
fetchData();
  }, [user]);
  const fetchData = async () => {
    const {data: tokenData} = await authClient.token()
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_SERVER_URI}/api/booking-donation?email=${user.email}`,
          {
            headers:{
              authorization: `Bearer ${tokenData?.token}`,
            }
          }
        );

        const data = await res.json();

        setBookingData(data);

        console.log("booking data:", data);
      } catch (error) {
        console.log(error);
      } finally {
        setPending(false);
      }
    };
const handleCancel = async(id)=>{
  const {data: tokenData} = await authClient.token()
try{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/booking-donation/${id}`,{
    method: "PATCH",
    headers:{
        'Content-Type': "application/json",
        authorization: `Bearer ${tokenData?.token}`,
    },
    body: JSON.stringify()
});
const data = await res.json();
if(res.ok){
    toast.success("Cancellation Confirmed")
    fetchData()
}
}catch(error){
   console.log(error);
   toast.error("Something Went Wrong"); 
}
};
  if (pending) {
    return <p>Loading...</p>;
  };
if (bookingData.length === 0) {
    return (
      <div className="text-3xl font-bold text-center py-20">
         No Booking
      </div>
    );
  }
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
        <div className="flex justify-between items-center gap-6 mb-8">
        <h2 className="text-3xl text-red-500 font-bold mx-auto">
         Donor Details
        </h2>
      </div>
  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
{bookingData.map((booking) => (
        <div
          key={booking._id}
className="bg-red-200 rounded-xl shadow border border-red-300 p-8">
          <div className="grid md:grid-cols-2 gap-6">
<div>
  <p className="font-semibold">Requester Name</p>
  <p>{booking.requesterName}</p>
</div>

<div>
  <p className="font-semibold">Requester Email</p>
  <p>{booking.requesterEmail}</p>
</div>
          <div>
            <p className="font-semibold">
              Blood Group
            </p>
            <p>{booking.bloodGroup}</p>
          </div>
            <div>
              <p className="font-semibold">
                District
              </p>
              <p>{booking.recipientDistrict}</p>
            </div>

            <div>
              <p className="font-semibold">
                Upazila
              </p>
              <p>{booking.recipientUpazila}</p>
            </div>

            <div>
              <p className="font-semibold">
                Hospital Name
              </p>
              <p>{booking.hospitalName}</p>
            </div>

            <div>
              <p className="font-semibold">
                Donation Date
              </p>
              <p>{booking.donationDate}</p>
            </div>

            <div>
              <p className="font-semibold">
                Donation Time
              </p>
              <p>{booking.donationTime}</p>
            </div>
</div>
<div className="grid md:grid-cols-2 gap-6">
          <div className="mt-6">
            <p className="font-semibold">
              Full Address
            </p>
            <p>{booking.fullAddress}</p>
          </div>
<div className="mt-6">
<button onClick={()=> handleCancel(booking._id)}
className="bg-gray-200 text-red-500 rounded-2xl p-2 cursor-pointer flex items-center gap-0.5">
   <XCircle className="w-3 h-3" />Cancel</button>
  </div>
          <div className="mt-6">
            <p className="font-semibold">
              Request Message
            </p>
            <p>{booking.requestMessage}</p>
          </div>
</div>
        </div>
      ))}    
    </div>    
    </div>
  );
};

export default BookingPage;
