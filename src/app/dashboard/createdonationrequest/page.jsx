"use client";

import { authClient, useSession } from '@/lib/auth-client';
import { useRouter } from "next/navigation";
import React, { useState } from 'react';
import toast from "react-hot-toast";

const CreatePage = () => {
  const  {data: session} = useSession();
  const user = session?.user;
  const router = useRouter();
  const [isRequest, setIsRequest] = useState(false)
const [formData, setFormData] = useState({fullAddress: "",requestMessage: "",});

const handleChange = (e)=>{
setFormData({
    ...formData,
    [e.target.name]: e.target.value,
});
};
const handleSubmit = async(e)=>{
    e.preventDefault();
    const donationData = {
    requesterName : user?.name,
    requesterEmail : user?.email,
    requesterDistrict : user?.district,
    requesterUpazila : user?.upazila,
    requesterBloodGroup : user?.bloodGroup,
    fullAddress : formData.fullAddress,
    requestMessage : formData.requestMessage,
    };
    const {data: tokenData} = await authClient.token();
  try{
const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/api/donation-requests`,
    {
        method : "POST",
        headers: {
            "content-type": "application/json",
         authorization: `Bearer ${tokenData?.token}`   
        },
        body: JSON.stringify(donationData),
    }
);
const data = await res.json();
console.log("response", data);
if(data.success){
    setIsRequest(true);
    setFormData({
        fullAddress: "",
        requestMessage: "",
    });
    toast.success("Request Successful");
   router.push('/dashboard/mydonationrequest') 
}
  } catch(error){
console.log(error);
  } 
};
return (
<div className="max-w-4xl mx-auto bg-gray-200 p-8 rounded-xl shadow">
<h2 className="text-3xl font-bold mb-8">
        Create Donation Request
      </h2> 
    <form onSubmit={handleSubmit} className="space-y-5">
<div className="grid md:grid-cols-2 gap-5">
 <div>
 <label className="block mb-2">Requester Name</label>
 <input defaultValue={user?.name}
 readOnly
 className="w-full border p-3 rounded" />   
    </div> 
 <div>
 <label className="block mb-2">Requester Email</label> 
 <input defaultValue={user?.email}
 readOnly
 className="w-full border p-3 rounded" />  
    </div>        
    </div> 
<div className="grid md:grid-cols-2 gap-5">
<div>
 <label className="block mb-2">Requester District</label>
 <input defaultValue={user?.district}
 readOnly
 className="w-full border p-3 rounded" />   
    </div>
  <div>
 <label className="block mb-2">Requester Upazila</label>
 <input defaultValue={user?.upazila}
 readOnly
 className="w-full border p-3 rounded" />   
    </div>    
</div>
<input
type="text"
name="fullAddress"
placeholder="Full Address"
value={formData.fullAddress}
onChange={handleChange}
required
className="w-full border p-3 rounded"
/>
<div>
 <label className="block mb-2">Requester BloodGroup</label>
 <input defaultValue={user?.bloodGroup}
 readOnly
 className="w-full border p-3 rounded" />   
    </div> 
<textarea
name="requestMessage"
rows="5"
placeholder="Message"
value={formData.requestMessage}
onChange={handleChange}
required
className="w-full border p-3 rounded"
/>
<button type="submit" 
className="bg-red-600 text-white px-8 py-3 rounded hover:bg-red-700 cursor-pointer">
{isRequest ? 'Request Accepted' : 'Request'}
</button>
</form>
    
</div>        
    );
};

export default CreatePage;