"use client";
import { MoreVertical } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

export default function AllUsersPage(){
const [users, setUsers] = useState([]);
const [statusFilter, setStatusFilter] = useState('all');
const [roleStatus, setRoleStatus] = useState('all')
const [loading, setLoading] = useState(true);
const [dropdownOpen, setDropdownOpen] = useState(null);
const dropdownRef = useRef(null);
const fetchUsers = async () => {
 try{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/users?status=${statusFilter}&roleVisitor=${roleStatus}`);
const data = await res.json();
setUsers(data);
console.log('users', data);
 }catch(error){
    console.error("Error fetching users:", error);
 } finally{
    setLoading(false);
 }  
};
useEffect(() => {
    fetchUsers();
}, [statusFilter] [roleStatus]);
const updateStatus = async (id, status) => {
try{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/users/status/${id}`,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ status })
    });
  const data = await res.json();
  if(data){
    toast.success("Status updated successfully");
    fetchUsers();
  }
}catch(error){
    console.error("Error updating status:", error);
    toast.error("Failed to update status");
}
};

const updateRole = async (id, role) => {
try{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/users/role/${id}`,
    {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ role})
    });
  const data = await res.json();
    if(data){
    toast.success("Role updated successfully");
    fetchUsers();
  }; 
}catch(error){
  console.error("Error updating role:", error);
    toast.error("Failed to update role");  
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
    return (
<div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl text-red-500 font-bold">
          All Users
        </h1>
<div className='flex gap-3'>
  <select
  value={roleStatus}
  onChange={(e)=>
setRoleStatus(e.target.value)}
className="border px-4 py-2 rounded-lg"
  >
<option value='all'>All Users</option>
<option value='volunteer'>Volunteer</option>
<option value='donor'>Donor</option>
  </select>
        <select
          value={statusFilter}
          onChange={(e) =>
            setStatusFilter(e.target.value)
          }
          className="border px-4 py-2 rounded-lg"
        >
          <option value="all">All Users</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
        </div>
      </div>

      <div className="bg-red-200 rounded-xl shadow overflow-x-auto">
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
      Role
    </th>
    <th className="p-4 text-left">
      Status
    </th>
    <th className="p-4 text-center">
      Actions
    </th>
  </tr>
</thead>

          <tbody>
  {users.map((user) => (
    <tr
      key={user._id}
      className="border-b"
    >
      {/* Avatar */}
      <td className="p-4">
        <img
          src={
            user.image ||
            "https://i.ibb.co/4pDNDk1/avatar.png"
          }
          alt={user.name}
          className="w-12 h-12 rounded-full object-cover"
        />
      </td>

      {/* Name */}
      <td className="p-4 font-medium">
        {user.name}
      </td>

      {/* Email */}
      <td className="p-4">
        {user.email}
      </td>

      {/* Role */}
      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            user.role === "admin"
              ? "bg-purple-100 text-purple-700"
              : user.role === "volunteer"
              ? "bg-blue-100 text-blue-700"
              : user.role === "donor" ? "bg-orange-100 text-orange-500"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          {user.role}
        </span>
      </td>

      {/* Status */}
      <td className="p-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            user.status === "active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {user.status}
        </span>
      </td>

      {/* Actions */}
      <td className="p-4 text-center">
        <div className="relative" ref={dropdownRef}>
<button className='cursor-pointer' onClick={() => setDropdownOpen(dropdownOpen === user._id ? null : user._id)}
 disabled={user.role === "admin"}>
            <MoreVertical size={18} />
          </button>
{dropdownOpen === user._id && (
<div className="absolute right-0 mt-3 w-56 bg-white border border-white/10 rounded-2xl shadow-xl">
         {user.status === "active" && user.role !== "admin" ? (
    <button className='cursor-pointer bg-red-500 text-white px-4 py-2 rounded-lg mb-1'
                key='block'
                onClick={() =>
                  updateStatus(
                    user._id,
                    "blocked"
                  )
                }
              >
                Block User
              </button>
            ) : user.role !== "admin" ? (
              <button
                className='cursor-pointer bg-green-500 text-white px-4 py-2 rounded-lg mb-1'
                key='unblock'
                onClick={() =>
                  updateStatus(
                    user._id,
                    "active"
                  )
                }
              >
                Unblock User
              </button>
            ): null}

            {user.role !== "admin" && (
  <>
    {user.role !== "volunteer" && (
      <button
        className='cursor-pointer bg-blue-500 text-white px-4 py-2 rounded-lg mb-1 mr-2'
        key='volunteer'
        onClick={() => updateRole(user._id, "volunteer")}
      >
        Make Volunteer
      </button>
    )}

    {user.role !== "donor" && (
      <button
        className='cursor-pointer bg-yellow-500 text-white px-4 py-2 rounded-lg mb-1 mr-2'
        key='donor'
        onClick={() => updateRole(user._id, "donor")}
      >
        Make Donor
      </button>
    )}

    {user.role !== "patient" && (
      <button
        className='cursor-pointer bg-purple-500 text-white px-4 py-2 rounded-lg mb-1'
        key='patient'
        onClick={() => updateRole(user._id, "patient")}
      >
        Make Patient
      </button>
    )}
  </>
)}
     </div>)}       
</div>
      </td>
    </tr>
  ))}
</tbody>
        </table>
      </div>
    </div>        
    );    
}

