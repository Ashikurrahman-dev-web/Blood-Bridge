"use client";
import districtsData from "@/data/districts.json";
import upazilasData from "@/data/upazilas.json";
import { useSession } from '@/lib/auth-client';
import React, { useEffect, useState } from 'react';
import toast from "react-hot-toast";

const CreatePage = () => {
  const  {data: session} = useSession();
  const user = session?.user;
  const [isRequest, setIsRequest] = useState(false)
const [selectedDistrict, setSelectedDistrict] = useState("");
const [filteredUpazilas, setFilteredUpazilas] = useState([]);
const [formData, setFormData] = useState({
     recipientName: "",
    recipientDistrict: "",
    recipientUpazila: "",
    hospitalName: "",
    fullAddress: "",
    bloodGroup: "",
    donationDate: "",
    donationTime: "",
    requestMessage: "",
});
const districts = districtsData.find((item)=> item.type === "table")?.data || [];
const upazilas = upazilasData.find((item) => item.type === "table" )?.data || [];
useEffect(()=>{
    if(selectedDistrict){
        const filtered = upazilas.filter((upazila)=> upazila.district_id === selectedDistrict);
        setFilteredUpazilas(filtered);
    }else{
        setFilteredUpazilas([]);
    }
}, [selectedDistrict]);
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
    recipientName : formData.recipientName,
    recipientDistrict : formData.recipientDistrict,
    recipientUpazila : formData.recipientUpazila,
    bloodGroup : formData.bloodGroup,
    hospitalName : formData.hospitalName,
    fullAddress : formData.fullAddress,
    requestMessage : formData.requestMessage,
    donationDate : formData.donationDate,
    donationTime : formData.donationTime,
    };
  try{
const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URI}/api/donation-requests`,
    {
        method : "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify(donationData),
    }
);
const data = await res.json();
console.log("response", data);
if(data.success){
    setIsRequest(true);
    setFormData({
        recipientName: "",
        recipientDistrict: "",
        recipientUpazila: "",
        hospitalName: "",
        fullAddress: "",
        bloodGroup: "",
        donationDate: "",
        donationTime: "",
        requestMessage: "",
    });
    
   toast.success("Request Successful"); 
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
<input 
type="text"
name="recipientName"
placeholder="Recipient Name"
onChange={handleChange}
value={formData.recipientName}
required
className="w-full border p-3 rounded"
/> 
<div className="grid md:grid-cols-2 gap-5">
    <select
 required
 name="recipientDistrict"
 value={selectedDistrict} 
 onChange={(e)=>{
    setSelectedDistrict(e.target.value);
  const districtName = districts.find((district)=>district.id === e.target.value )?.name || "";
  setFormData({
    ...formData,
    recipientDistrict: districtName,
    recipientUpazila: "",
  });
 }}
 className="w-full border p-3 rounded">
<option value="">Select District</option>
{districts.map((district)=>(
    <option key={district.id} value={district.id}>{district.name}</option>
))}
    </select>
  <select
  required
  disabled={!selectedDistrict}
  value={formData.recipientUpazila}
  onChange={(e)=>{
setFormData({
    ...formData,
    recipientUpazila: e.target.value,
});
  }}
className="w-full border p-3 rounded">
 <option value="">Select Upazila</option>
 {filteredUpazilas.map((upazila)=>(
<option key={upazila.id} value={upazila.name}>{upazila.name}</option>
 ))}   
    </select>  
</div>
<input
type="text"
name="hospitalName"
placeholder="Hospital Name"
value={formData.hospitalName}
onChange={handleChange}
required
className="w-full border p-3 rounded"
/>
<input
type="text"
name="fullAddress"
placeholder="Full Address"
value={formData.fullAddress}
onChange={handleChange}
required
className="w-full border p-3 rounded"
/>
<select
name="bloodGroup"
value={formData.bloodGroup}
onChange={handleChange}
required
className="w-full border p-3 rounded"
>
<option value="">Select Blood Group</option>
          <option>A+</option>
          <option>A-</option>
          <option>B+</option>
          <option>B-</option>
          <option>AB+</option>
          <option>AB-</option>
          <option>O+</option>
          <option>O-</option>
</select>
<div className="grid md:grid-cols-2 gap-5">
  <input 
  type="date"
  name="donationDate"
  value={formData.donationDate}
  onChange={handleChange}
  required
  className="w-full border p-3 rounded"
  /> 
  <input 
  type="time"
  name="donationTime"
  value={formData.donationTime}
  onChange={handleChange}
  required
  className="w-full border p-3 rounded"
  /> 
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