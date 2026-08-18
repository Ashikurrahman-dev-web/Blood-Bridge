"use client"
import { authClient, useSession } from "@/lib/auth-client";
import { DollarSign, Droplets, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaPerson, FaUsers } from "react-icons/fa6";
import { GiBlood } from "react-icons/gi";

export default function VolunteerDashboardHome(){
    const {data: session} = useSession();
    const user = session?.user;
    const [loading,setLoading] = useState(true);
    const [funding, setFunding] = useState([]);   
useEffect(() => {
  const fetchFunding = async () => {
    const {data: tokenData} = await authClient.token();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/donationDetails`,
      {
        headers:{
          authorization: `Bearer ${tokenData?.token}`
        }
      });

      if (!res.ok) {
        console.error("Request failed:", res.status);
        setLoading(false);
        return;
      }

      const data = await res.json();
      setFunding(data)
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  fetchFunding();
}, []); 
const total = funding.reduce((sum,f)=> sum + f.fundingAmount,0);
const [stats,setStats] = useState({
  total_users:0,
      total_requests:0,
      total_donor:0,
      total_patient:0,
      delivered_blood:0,
})
useEffect(() => {
  const fetchStats = async () => {
    const {data: tokenData} = await authClient.token();
    try { 
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/admin-stats`,
      {
        headers:{
          authorization: `Bearer ${tokenData?.token}`
        }
      });

      if (!res.ok) {
        console.error("Request failed:", res.status);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setStats({
        total_users: data.totalUsers || 0,
      total_requests: data.totalRequests || 0,
      total_donor: data.totalDonor || 0,
      total_patient: data.totalPatient || 0,
      delivered_blood : data.deliveredBlood || 0,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  fetchStats();
}, []);
if(loading){
return (
    <div className="flex justify-center items-center min-h-screen">
<div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin">
 </div>
    </div>
  );    
};   
 return(
<div className="space-y-8">
    <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold">
          Welcome Back, {user?.name || "Volunteer"} 👋
        </h1>

        <p className="mt-2 text-red-100">
          Manage users, blood donation requests and platform activities.
        </p>
      </div>
 <div className="grid md:grid-cols-3 gap-6">
          {/* Total Users */}
<div className="bg-white rounded-xl shadow border border-red-200 hover:border-red-400 p-6">
            <div className="flex items-center justify-between">
              <Users className="w-10 h-10 text-blue-600" />
              <span className="text-3xl font-bold">
                {stats.total_users}
              </span>
            </div>

            <h3 className="mt-4 text-gray-600 font-medium">
              Total Users
            </h3>
          </div>

          {/* Total Funding */}
<div className="bg-white rounded-xl shadow border border-red-200 hover:border-red-400 p-6">
            <div className="flex items-center justify-between">
              <DollarSign className="w-10 h-10 text-green-600" />
              <span className="text-3xl font-bold">
                 {total}
              </span>
            </div>

            <h3 className="mt-4 text-gray-600 font-medium">
              Total Funding
            </h3>
          </div>

          {/* Total Requests */}
<div className="bg-white rounded-xl shadow border border-red-200 hover:border-red-400 p-6">
            <div className="flex items-center justify-between">
              <Droplets className="w-10 h-10 text-red-600" />
              <span className="text-3xl font-bold">
                {stats.total_requests}
              </span>
            </div>

            <h3 className="mt-4 text-gray-600 font-medium">
              Blood Donation Requests
            </h3>
          </div>
<div className="bg-white rounded-xl shadow border border-red-200 hover:border-red-400 p-6">
            <div className="flex items-center justify-between">
              <FaUsers className="w-10 h-10 text-red-600" />
              <span className="text-3xl font-bold">
                {stats.total_donor}
              </span>
            </div>

            <h3 className="mt-4 text-gray-600 font-medium">
              Total Donor
            </h3>
          </div>
<div className="bg-white rounded-xl shadow border border-red-200 hover:border-red-400 p-6">
            <div className="flex items-center justify-between">
              <FaPerson className="w-10 h-10 text-red-600" />
              <span className="text-3xl font-bold">
                {stats.total_patient}
              </span>
            </div>

            <h3 className="mt-4 text-gray-600 font-medium">
              Total Patient
            </h3>
          </div>
<div className="bg-white rounded-xl shadow border border-red-200 hover:border-red-400 p-6">
            <div className="flex items-center justify-between">
              <GiBlood className="w-10 h-10 text-red-600" />
              <span className="text-3xl font-bold">
                {stats.delivered_blood}
              </span>
            </div>

            <h3 className="mt-4 text-gray-600 font-medium">
              Delivered Blood
            </h3>
          </div>
        </div> 
     <h3 className="mt-14 mb-4 text-red-500 text-3xl font-bold text-center">
              Funding Details
            </h3>   
<div className="bg-blue-200 rounded-xl shadow overflow-x-auto">
        <table className="w-full">
         <thead className="bg-gray-100">
  <tr>
    <th className="p-4 text-left">
      Avatar
    </th>
    <th className="p-4 text-left">
      Name
    </th>
    <th className="p-4 text-left">
      Email
    </th>
    <th className="p-4 text-left">
      Funding Time
    </th>
    <th className="p-4 text-left">
      Amount
    </th>
  </tr>
</thead>

          <tbody>
  {funding.map((fund)=>(
 <tr
      key={fund._id}
      className="border-b"
    >
      {/* Avatar */}
      <td className="p-4">
        <img
          src={
            fund.userImage ||
            "https://i.ibb.co/4pDNDk1/avatar.png"
          }
          alt={fund.userName}
          className="w-12 h-12 rounded-full object-cover"
        />
      </td>

      {/* Name */}
      <td className="p-4 font-medium">
        {fund.userName}
      </td>

      {/* Email */}
      <td className="p-4">
        {fund.userEmail}
      </td>

      {/* time */}
      <td className="p-4">
       {new Date(fund.createdAt).toLocaleString()}
      </td>

      {/* Amount */}
      <td className="p-4">
       {fund.fundingAmount}
      </td>         

    </tr>
  ))}
</tbody>
        </table>
      </div>            
<button>
    <Link className='bg-red-500 text-white rounded-2xl py-2 px-2' href={'/'}>Go Back Home</Link>
        </button>         
</div>
 )   
}