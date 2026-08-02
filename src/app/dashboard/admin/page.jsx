"use client"
import { useSession } from "@/lib/auth-client";

export default function AdminDashboardHome(){
    const {data: session} = useSession();
    const user = session?.user;
 return(
<div className="space-y-8">
    <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-white shadow-lg">
        <h1 className="text-3xl md:text-4xl font-bold">
          Welcome Back, {user?.name || "Admin"} 👋
        </h1>

        <p className="mt-2 text-red-100">
          Manage users, blood donation requests and platform activities.
        </p>
      </div>
</div>
 )   
}