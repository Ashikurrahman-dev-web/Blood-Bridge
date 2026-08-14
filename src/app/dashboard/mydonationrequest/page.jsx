"use client"
import { useSession } from "@/lib/auth-client"
import { useCallback, useEffect, useState } from "react";
import { Pagination, Table} from "@heroui/react";
import { Edit, Eye, Trash2 } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
export default function MyDonationRequests(){
const {data: session} = useSession();
const user = session?.user;
const [totalPage, setTotalPage] = useState(1);
const [page, setPage] = useState(1)
const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
const [loading, setLoading] = useState(true);
const fetchRequest = useCallback(async()=>{
  if(!user?.email) return;
  try{
    setLoading(true)
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/my-donation-requests?email=${user.email}&status=${statusFilter}&page=${page}`)
const data = await res.json();
setRequests(data.requests);
setTotalPage(data.totalPage || 1)
console.log('total', data.totalPage)
  }catch(error){
console.log(error)
  } finally{
    setLoading(false)
  } 
},[user,statusFilter,page])
useEffect(()=>{
    fetchRequest()
},[fetchRequest]);
const [isModalOpen, setIsModalOpen] = useState(false);
const [selectedDeleteId, setSelectedDeleteId] = useState(null)
const openDeleteModal = (id)=>{
  setSelectedDeleteId(id)
  setIsModalOpen(true);
}
const handleDelete = async()=>{
try{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/donation-request/${selectedDeleteId}`,
  {
    method: 'DELETE',
  }
);
const data = await res.json()
if(data.deletedCount > 0){
setRequests((prev)=> prev.filter(
  (req) => req._id !== selectedDeleteId
));  
}
setIsModalOpen(false);
setSelectedDeleteId(null)
toast.success('Delete Confirmed');
}catch(error){
console.log(error);
toast.error('Delete Failed')
}
};
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
        return "text-black"  
  }
};
const pages = [];
for(let i=1; i<=totalPage; i++){
pages.push(i)
}
return(
<div className="max-w-6xl mx-auto p-5">
<div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
  <h1 className="text-3xl font-bold text-red-500">
          My Donation Requests
        </h1>
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
  {loading ?(
<div className="flex justify-center items-center min-h-screen">
<div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin">
 </div>
    </div>): requests.length === 0 ?(
<div className="p-10 text-center">No donation requests found</div>
    ):(
    <Table>
      <Table.ScrollContainer>
        <Table.Content aria-label="Table with pagination" className="min-w-[600px]">
          <Table.Header>
            <Table.Column isRowHeader>Requester Name</Table.Column>
            <Table.Column>Request Date</Table.Column>
            <Table.Column>Status</Table.Column>
            <Table.Column className={`text-center`}>Actions</Table.Column>
           </Table.Header>
          <Table.Body>
           {
          requests.map((request)=>(  <Table.Row key={request._id}>
                <Table.Collection>
                   <Table.Cell>{request.requesterName}</Table.Cell>
                   <Table.Cell>{new Date(request.createdAt).toLocaleString()}</Table.Cell>
<Table.Cell className={`${getStatusClass(request.donationStatus)}`}>{request.donationStatus}</Table.Cell>
<Table.Cell>
   <div className="flex justify-center gap-3">
                <Link href={`/dashboard/donation-request/view/${request._id}`}>
                          <Eye
                            size={18}
                            className="text-blue-600"
                          />
                        </Link>
     {request.donationStatus === "pending" && (
                          <>
                    <Link href={`/dashboard/donation-request/edit/${request._id}`}>
                              <Edit
                                size={18}
                                className="text-green-600"
                              />
                            </Link>
<button>
                        <Trash2 onClick={()=>openDeleteModal(request._id)}
                                size={18}
                                className="text-red-600 cursor-pointer"
                              />
                            </button>    </>)}
{request.donationStatus === "canceled" &&(
  <button>
                        <Trash2 onClick={()=>openDeleteModal(request._id)}
                                size={18}
                                className="text-red-600 cursor-pointer"
                              />
                            </button>
)}            
                          </div>
</Table.Cell>
                </Table.Collection>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer> 
   <Table.Footer>
        <Pagination size="sm">
          <Pagination.Summary>
          </Pagination.Summary>
          <Pagination.Content>
            <Pagination.Item>
<Pagination.Previous isDisabled={page===1} onClick={() => setPage(page - 1)}>
                <Pagination.PreviousIcon />
 Prev
              </Pagination.Previous>
            </Pagination.Item>
           {pages.map((p) => (
  <button
    key={p}
    onClick={() => setPage(p)}
    className={`px-3 py-1 rounded ${
p === page ? "bg-red-500 rounded-full cursor-pointer text-white" : "bg-gray-200 cursor-pointer"
    }`}
  >
    {p}
  </button>
))}
            <Pagination.Item>
<Pagination.Next isDisabled={page===totalPage} onClick={() => setPage(page + 1)}>
  Next    
                <Pagination.NextIcon />
              </Pagination.Next>
            </Pagination.Item>
          </Pagination.Content>
        </Pagination>
      </Table.Footer>    
  </Table>  )}
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