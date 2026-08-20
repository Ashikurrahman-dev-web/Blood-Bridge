"use client"
import { useSession } from '@/lib/auth-client';
import { HandPointLeft } from '@gravity-ui/icons';
import {  Droplet } from 'lucide-react';
import Link from 'next/link';
import React from 'react';
import { FaHeart } from 'react-icons/fa';

const DonorPage = () => {
    const {data: session} = useSession()
    const user = session?.user; 
    return (
         <div className="space-y-8 w-full">
 <button className='ml-10'>
<Link className='bg-red-500 text-white rounded-2xl py-2 px-2' href={'/'}>Go Back Home</Link>
        </button>
 <main className=" flex items-center justify-center">
<div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden text-center transition-all">
          
          {/* Header Badge & Icon */}
          <div className="bg-red-50 p-8 pb-6 flex flex-col items-center justify-center relative">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4 relative">
            <Droplet className="w-10 h-10 text-red-600 fill-red-600 animate-pulse" />
<div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1 text-green-500 border-2 border-white">
                <FaHeart className="w-5 h-5" />
              </div>
            </div>
            <span className="text-xs font-semibold tracking-wider text-red-600 bg-red-100/80 px-3 py-1 rounded-full">
   Welcome Back, {user?.name}! 👋
            </span>
            <h1 className="text-2xl font-bold text-slate-800 mt-3">
              Thank You for being a Donor!
            </h1>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-6 text-slate-600">
            <p className="text-sm sm:text-base leading-relaxed">
If you want to donate blood, go to the SideBar on the left 
and click on the option named Create Donation Request.
            </p>
          </div>
<div className='mb-16'><HandPointLeft size={18} className='mx-auto text-red-500'/></div>
        </div>
      </main>               
         </div>
    );
};

export default DonorPage;