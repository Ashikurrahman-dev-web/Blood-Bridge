"use client"
import { authClient } from "@/lib/auth-client";
import { CheckCircle, ChevronLeft, ChevronRight, Eye, Trash2, XCircle } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AllBloodDonationVolunteer() {
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const limit = 5;

  useEffect(() => {
    fetchRequest();
  }, [statusFilter, page]);

  const fetchRequest = async () => {
    const { data: tokenData } = await authClient.token();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/all-blood-donation-requests?status=${statusFilter}&page=${page}&limit=${limit}`,
        {
          headers: {
            authorization: `Bearer ${tokenData?.token}`
          }
        }
      );
      const data = await res.json();
      setRequests(data.requests || []);
      setTotalPage(data.totalPage || 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState(null);

  const openDeleteModal = (id) => {
    setSelectedDeleteId(id);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    const { data: tokenData } = await authClient.token();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/donation-request/${selectedDeleteId}`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${tokenData?.token}`
          }
        }
      );

      const data = await res.json();

      if (data.deletedCount > 0) {
        setRequests((prev) => prev.filter((req) => req._id !== selectedDeleteId));
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
    const { data: tokenData } = await authClient.token();
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URI}/api/donation-request/status/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${tokenData?.token}`
          },
          body: JSON.stringify({ status })
        }
      );
      if (res.ok) {
        toast.success('Status Updated Successfully');
        fetchRequest();
      }
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Status Update Failed');
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded text-xs font-semibold border border-yellow-200 inline-block";
      case "approved":
        return "text-green-600 bg-green-50 px-2 py-0.5 rounded text-xs font-semibold border border-green-200 inline-block";
      case "canceled":
        return "text-red-600 bg-red-50 px-2 py-0.5 rounded text-xs font-semibold border border-red-200 inline-block";
      case "booked":
        return "text-blue-600 bg-blue-50 px-2 py-0.5 rounded text-xs font-semibold border border-blue-200 inline-block";
      default:
        return "bg-blue-500 text-white px-2 py-0.5 rounded text-xs font-semibold inline-block";
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="bg-red-200 p-4 sm:p-6 rounded-xl shadow w-full">
      {/* Header section with responsive flex layout */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
          All Blood Donation Requests
        </h2>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="border rounded-lg px-3 py-2 bg-white text-black text-sm w-full sm:w-auto shadow-sm focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <option value="all">All Requests</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Main Content Box */}
      <div className="bg-white rounded-xl shadow overflow-hidden">
        {requests.length === 0 ? (
          <div className="p-10 text-center text-gray-500 font-medium">
            No donation requests found
          </div>
        ) : (
          <>
            {/* Scrollable Container for Table */}
            <div className="overflow-x-auto w-full">
              <table className="w-full text-left border-collapse min-w-[750px]">
                <thead className="bg-gray-100 text-gray-700 text-xs sm:text-sm uppercase tracking-wider border-b">
                  <tr>
                    <th className="p-3 sm:p-4">Requester Name</th>
                    <th className="p-3 sm:p-4">Location</th>
                    <th className="p-3 sm:p-4">Blood</th>
                    <th className="p-3 sm:p-4">Date</th>
                    <th className="p-3 sm:p-4">Requester Email</th>
                    <th className="p-3 sm:p-4">Status</th>
                    <th className="p-3 sm:p-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 text-xs sm:text-sm text-gray-700">
                  {requests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-50 transition-colors">
                      <td className="p-3 sm:p-4 font-medium text-gray-900">{request.requesterName}</td>
                      <td className="p-3 sm:p-4">
                        {request.requesterDistrict}
                        <br />
                        <span className="text-gray-500 text-xs">{request.requesterUpazila}</span>
                      </td>
                      <td className="p-3 sm:p-4">
                        <span className="font-semibold text-red-600">{request.requesterBloodGroup}</span>
                      </td>
                      <td className="p-3 sm:p-4">
                        {new Date(request.createdAt).toLocaleDateString()}
                        <br />
                        <span className="text-gray-500 text-xs">
                          {new Date(request.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </td>
                      <td className="p-3 sm:p-4">{request.requesterEmail}</td>
                      <td className="p-3 sm:p-4">
                        <span className={getStatusClass(request.donationStatus)}>
                          {request.donationStatus}
                        </span>

                        {(request.donationStatus === "pending" || request.donationStatus === "canceled") && (
                          <div className="flex flex-wrap gap-1.5 mt-2">
                            <button
                              onClick={() => handleStatusChange(request._id, 'approved')}
                              className="cursor-pointer flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white text-[11px] font-medium px-2 py-1 rounded transition-colors shadow-sm"
                            >
                              <CheckCircle className="w-3 h-3" /> Approve
                            </button>
                            <button
                              onClick={() => handleStatusChange(request._id, 'canceled')}
                              className="cursor-pointer flex items-center gap-1 bg-rose-600 hover:bg-rose-700 text-white text-[11px] font-medium px-2 py-1 rounded transition-colors shadow-sm"
                            >
                              <XCircle className="w-3 h-3" /> Cancel
                            </button>
                          </div>
                        )}
                      </td>
                      <td className="p-3 sm:p-4">
                        <div className="flex justify-center items-center gap-3">
                          <Link
                            href={`/dashboard/donation-request/view/${request._id}`}
                            className="p-1 hover:bg-blue-50 rounded transition-colors"
                            title="View Request"
                          >
                            <Eye size={18} className="text-blue-600" />
                          </Link>
                          <button
                            onClick={() => openDeleteModal(request._id)}
                            className="p-1 hover:bg-red-50 rounded transition-colors"
                            title="Delete Request"
                          >
                            <Trash2 size={18} className="text-red-600 cursor-pointer" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex flex-col sm:flex-row justify-between items-center p-4 border-t gap-3">
              <p className="text-sm text-gray-600">
                Page <span className="font-semibold text-gray-800">{page}</span> of{" "}
                <span className="font-semibold text-gray-800">{totalPage}</span>
              </p>
              <div className="flex gap-2">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className={`px-3 py-1.5 rounded transition-colors flex items-center justify-center ${
                    page === 1
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600 cursor-pointer shadow-sm"
                  }`}
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  disabled={page === totalPage}
                  onClick={() => setPage(page + 1)}
                  className={`px-3 py-1.5 rounded transition-colors flex items-center justify-center ${
                    page === totalPage
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-red-500 text-white hover:bg-red-600 cursor-pointer shadow-sm"
                  }`}
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 transition-all transform">
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
  );
}