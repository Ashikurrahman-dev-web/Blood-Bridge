"use client"
import { useSession } from '@/lib/auth-client';
import Link from 'next/link';
import React from 'react';

const DonorPage = () => {
    const {data: session} = useSession()
    const user = session?.user; 
    return (
         <div className="space-y-8 w-full">
<div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 md:p-8 text-white shadow-lg">
 <h1 className="text-2xl md:text-4xl font-bold">Welcome Back, {user?.name}! 👋</h1>   
    </div>
    <button>
    <Link className='bg-red-500 text-white rounded-2xl py-2 px-2' href={'/'}>Go Back Home</Link>
        </button>            
         </div>
    );
};

export default DonorPage;