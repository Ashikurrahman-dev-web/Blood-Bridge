"use client"
import { CheckCircle, ChevronLeft, ChevronRight, Eye, Trash2, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AllBloodDonationAdmin(){
const [totalPage, setTotalPage] = useState(1);
const [page, setPage] = useState(1)
const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
const [loading, setLoading] = useState(true);
const limit = 5;
useEffect(()=>{
  fetchRequest();
}, [statusFilter, page]);
const fetchRequest = async()=>{
try{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/all-blood-donation-requests?status=${statusFilter}&page=${page}&limit=${limit}`)
const data = await res.json();
setRequests(data.requests);
setTotalPage(data.totalPage || 1)
console.log('total', data.totalPage)
}catch(error){
    console.log(error)
}finally{
    setLoading(false)
}
};
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedDeleteId, setSelectedDeleteId] = useState(null);
const openDeleteModal = (id)=>{
  setSelectedDeleteId(id);
  setIsModalOpen(true);
}
const handleDelete = async (id) => {
try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/donation-request/${selectedDeleteId}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
setRequests((prev)=> prev.filter((req)=> req._id !== selectedDeleteId));
setSelectedDeleteId(null);
setIsModalOpen(false);        
        toast.success("Request Deleted");
      }
    } catch (error) {
      console.log(error);
      toast.error("Delete Failed");
    }
  };
const handleStatusChange = async (id, status) => {
try{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/donation-request/status/${id}`, {
    method: 'PATCH',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ status }),
});
const data = await res.json();
if(res.ok){
    toast.success('Status Updated Successfully');
    fetchRequest();
};    
}catch(error){
    console.error('Error updating status:', error);
    toast.error('Status Update Failed');
}};
const getStatusClass = (status)=>{
  switch(status){
    case "pending":
      return "text-yellow-600"
    case "approved":
      return "text-green-500"
    case "canceled":
      return "text-red-500"
      case "booked":
        return "text-blue-500"
      default:
        return "bg-blue-500 text-white"
  }
};
if(loading){
    return(<div className="flex justify-center items-center min-h-screen">
<div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin">
 </div>
    </div>)}
return(
<div className="bg-red-200 p-6 rounded-xl shadow">
 <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          All Blood Donation Requests
        </h2>
<select
  value={statusFilter}
  onChange={(e)=>{
setStatusFilter(e.target.value);
setPage(1)
  }}
 className="border rounded-lg px-3 py-2 bg-white text-black">
<option value="all">All Requests</option>
<option value="pending">Pending</option>
<option value="approved">Approved</option>
<option value="canceled">Canceled</option>
    </select>        
        </div>
<div className="bg-white rounded-xl shadow overflow-hidden">
{requests.length === 0 ? (
    <div className="p-10 text-center">
            No donation requests found
          </div>
):(
<>
<table className="table w-full">
 <thead>
            <tr>
              <th>Requester Name</th>
              <th>Location</th>
              <th>Blood</th>
              <th>Date</th>
              <th>Requester Email</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
       <tbody>
{requests.map((request)=>(
    <tr key={request._id}>
<td>{request.requesterName}</td>
<td>{request.requesterDistrict}
    <br/>
    <span>{request.requesterUpazila}</span>
</td>
<td>{request.requesterBloodGroup}</td>
<td>{new Date(request.createdAt).toLocaleDateString()}
    <br/>
    <span>{new Date(request.createdAt).toLocaleTimeString()}</span></td>
 <td>{request.requesterEmail}
 </td>
<td>
 <span className={getStatusClass(request.donationStatus)}>{request.donationStatus}</span>   
 {request.donationStatus === "pending" && (
    <div className="flex gap-1.5 mt-1">
<button 
                            onClick={() => handleStatusChange(request._id, 'approved')}
className="cursor-pointer flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-[11px] font-medium px-2 py-1 rounded transition-colors"
                          >
                            <CheckCircle className="w-3 h-3" /> Approve
                          </button> 
<button 
                            onClick={() => handleStatusChange(request._id, 'canceled')}
className="cursor-pointer flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-medium px-2 py-1 rounded transition-colors"
                          >
                            <XCircle className="w-3 h-3" /> Cancel
                          </button>          
    </div>
 )}   
 {request.donationStatus === "canceled" && (
    <div className="flex gap-1.5 mt-1">
<button 
                            onClick={() => handleStatusChange(request._id, 'approved')}
className="cursor-pointer flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-[11px] font-medium px-2 py-1 rounded transition-colors"
                          >
                            <CheckCircle className="w-3 h-3" /> Approve
                          </button> 
<button 
                            onClick={() => handleStatusChange(request._id, 'canceled')}
className="cursor-pointer flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-medium px-2 py-1 rounded transition-colors"
                          >
                            <XCircle className="w-3 h-3" /> Cancel
                          </button>          
    </div>
 )}   
</td>
<td>
    <div className="flex justify-center gap-3">
<Link href={`/dashboard/donation-request/view/${request._id}`}>
                          <Eye
                            size={18}
                            className="text-blue-600"
                          />
                          </Link>
<button>
<Trash2 onClick={()=> openDeleteModal(request._id)}
size={18}
className="text-red-600 cursor-pointer"
/> 
    </button>                          
    </div>
</td>
    </tr>
))}        
        </tbody>       
</table>
<div className="flex justify-between items-center p-4 border-t">
   <p className="text-sm">
   Page {page} of {" "} {totalPage} 
    </p>
<div className="flex gap-2">
 <button
  disabled={page === 1}
  onClick={() => setPage(page - 1)}
  className={`px-3 py-1 rounded ${
    page === 1 ? "bg-gray-200 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"}`}>
    <ChevronLeft
        size={18}
     />
    </button>
<button
  disabled={page === totalPage}
  onClick={() => setPage(page + 1)}
  className={`px-3 py-1 rounded ${
    page === totalPage ? "bg-gray-200 cursor-not-allowed" : "bg-red-500 text-white hover:bg-red-600"
  }`}
>
  <ChevronRight size={18} />
</button>
    </div>     
    </div> 
</>    
)}    
    </div>
{isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 dynamic-modal">
            <h3 className="text-lg font-bold text-gray-900 mb-1">Delete Donation Request?</h3>
            <p className="text-gray-600 text-sm mb-5">
        Are you sure you want to delete this donation request? This action cannot be reverted.
            </p>
            <div className="flex justify-end gap-3">
              <button 
                onClick={() => setIsModalOpen(false)}
className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm rounded-lg transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button 
                onClick={handleDelete}
className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm rounded-lg transition-colors cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}               
</div>
)    
}