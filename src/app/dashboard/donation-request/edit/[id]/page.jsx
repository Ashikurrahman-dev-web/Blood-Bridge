"use client"
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
useEffect(()=>{
if(!id)
return;
const fetchRequest = async()=>{
  try{
 const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/donation-request/${id}`)
 const data = await res.json();
 setFormData({
    recipientName: data.recipientName,
    recipientDistrict: data.recipientDistrict,
    recipientUpazila: data.recipientUpazila,
    hospitalName: data.hospitalName,
    fullAddress: data.fullAddress,
    bloodGroup: data.bloodGroup,
    donationDate: data.donationDate,
    donationTime: data.donationTime,
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
const handleUpdate = async()=>{
try{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/donation-request/${id}`,
    {
        method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
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
        <input
          type="text"
          name="recipientName"
          value={formData.recipientName}
          onChange={handleChange}
          placeholder="Recipient Name"
          className="w-full border p-3 rounded"
        />

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="text"
            name="recipientDistrict"
            value={formData.recipientDistrict}
            onChange={handleChange}
            placeholder="District"
            className="border p-3 rounded"
          />

          <input
            type="text"
            name="recipientUpazila"
            value={formData.recipientUpazila}
            onChange={handleChange}
            placeholder="Upazila"
            className="border p-3 rounded"
          />
        </div>

        <input
          type="text"
          name="hospitalName"
          value={formData.hospitalName}
          onChange={handleChange}
          placeholder="Hospital Name"
          className="w-full border p-3 rounded"
        />

        <input
          type="text"
          name="fullAddress"
          value={formData.fullAddress}
          onChange={handleChange}
          placeholder="Full Address"
          className="w-full border p-3 rounded"
        />

        <select
          name="bloodGroup"
          value={formData.bloodGroup}
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

        <div className="grid md:grid-cols-2 gap-5">
          <input
            type="date"
            name="donationDate"
            value={formData.donationDate}
            onChange={handleChange}
            className="border p-3 rounded"
          />

          <input
            type="time"
            name="donationTime"
            value={formData.donationTime}
            onChange={handleChange}
            className="border p-3 rounded"
          />
        </div>

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