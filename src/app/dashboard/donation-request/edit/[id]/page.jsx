"use client"
import { authClient } from "@/lib/auth-client";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast";

export default function EditDonationRequest(){
const {id}= useParams();
const router = useRouter()
const [loading,setLoading]=useState(true);
const [formData, setFormData] = useState({ 
     requesterDistrict: "",
    requesterUpazila: "",
    fullAddress: "",
    requesterBloodGroup: "",
    requestMessage: "",
});
useEffect(()=>{
if(!id)
return;
const fetchRequest = async()=>{
  const {data: tokenData} = await authClient.token();
  try{
 const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/donation-request/${id}`,
  {
    headers:{
      authorization: `Bearer ${tokenData?.token}`
    }
  }
 )
 const data = await res.json();
 setFormData({
    requesterDistrict: data.requesterDistrict,
    requesterUpazila: data.requesterUpazila,   
    fullAddress: data.fullAddress,
    requesterBloodGroup: data.requesterBloodGroup,
    requestMessage: data.requestMessage,
 })   
  }catch(error){
   console.log(error);
   toast.error('Loading Failed'); 
  }finally{
    setLoading(false);
  }  
}    
fetchRequest() },[id]);
const handleChange = (e)=>{
setFormData((oldData)=>({
    ...oldData,
    [e.target.name]: e.target.value,
}));
};
const handleUpdate = async(e)=>{
  e.preventDefault();
  const {data: tokenData} = await authClient.token();
try{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/donation-request/${id}`,
    {
        method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${tokenData?.token}`
      },
      body: JSON.stringify(formData),  
    }
);
const data = await res.json()
if(res.ok){
 toast.success('Donation Request Updated Successfully');
 router.push("/dashboard/mydonationrequest")   
}else{
    toast.error(data.message || "Update Failed");
};
}catch(error){
console.log(error)
toast.error('Something went wrong')
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
    return(
 <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow">
 <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold">
          Edit Donation Request
        </h2>
<Link href="/dashboard/mydonationrequest"
          className="inline-flex items-center gap-2 text-red-600 hover:text-red-700">
            <ArrowLeft size={18} />
          Back
        </Link>
      </div> 
<form onSubmit={handleUpdate} className="space-y-5">

        <div className="grid md:grid-cols-2 gap-5">
       <div className="grid">
<label className="block mb-2">Requester District</label>
          <input
            type="text"
            name="requesterDistrict"
            value={formData.requesterDistrict}
            onChange={handleChange}
            placeholder="District"
            className="border p-3 rounded"
          />        
        </div>   
         <div className="grid">
   <label className="block mb-2">Requester Upazila</label>
          <input
            type="text"
            name="requesterUpazila"
            value={formData.requesterUpazila}
            onChange={handleChange}
            placeholder="Upazila"
            className="border p-3 rounded"
          />       
          </div> 
        </div>
<label className="block mb-2">Full Address</label>
        <input
          type="text"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleChange}
          placeholder="Full Address"
          className="w-full border p-3 rounded"
        />
<label className="block mb-2">Requester BloodGroup</label>
        <select
          name="requesterBloodGroup"
          value={formData.requesterBloodGroup}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        >
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>
<label className="block mb-2">Requester Message</label>
        <textarea
          name="requestMessage"
          rows={5}
          value={formData.requestMessage}
          onChange={handleChange}
          placeholder="Request Message"
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded cursor-pointer">
          Update Donation Request
        </button>
      </form>       
 </div>
    )
}