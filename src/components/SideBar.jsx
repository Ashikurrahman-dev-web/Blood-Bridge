"use client"
import { useSession } from '@/lib/auth-client';
import { Columns4, GitPullRequest, Home, Menu, Send, Settings, UserRoundPlus, UsersRound, X } from 'lucide-react';
import React, { useState } from 'react';
import Logo from './Logo';
import { MdMessage } from 'react-icons/md';
import Link from 'next/link';

const dashboardItems = {
  "donor": [
    { name: 'Home', icon: <Home className='w-5 h-5' />, href: '/dashboard/donor' },
    { name: 'ProfileSettings', icon: <Settings className='w-5 h-5' />, href: '/dashboard/profile' },
    { name: 'My Donation Request', icon: <GitPullRequest className='w-5 h-5' />, href: '/dashboard/mydonationrequest' },
    { name: 'Create Donation Request', icon: <UserRoundPlus className='w-5 h-5' />, href: '/dashboard/createdonationrequest' },
  ],
  "volunteer": [
    { name: 'Home', icon: <Home className='w-5 h-5' />, href: '/dashboard/volunteer' },
    { name: 'ProfileSettings', icon: <Settings className='w-5 h-5' />, href: '/dashboard/profile' },
    { name: 'All Blood Donation', icon: <Columns4 className="w-5 h-5" />, href: '/dashboard/allblooddonationvolunteer' },
    { name: 'Comment', icon: <Send className="w-5 h-5" />, href: '/dashboard/commentAdmin' },
  ],
  "admin": [
    { name: 'Home', icon: <Home className="w-5 h-5" />, href: '/dashboard/admin' },
    { name: 'ProfileSettings', icon: <Settings className="w-5 h-5" />, href: '/dashboard/profile' },
    { name: 'All Users', icon: <UsersRound className="w-5 h-5" />, href: '/dashboard/allusers' },
    { name: 'All Blood Donation', icon: <Columns4 className="w-5 h-5" />, href: '/dashboard/allblooddonationadmin' },
    { name: 'Message', icon: <MdMessage className="w-5 h-5" />, href: '/dashboard/message' },
    { name: 'Comment', icon: <Send className="w-5 h-5" />, href: '/dashboard/commentAdmin' },
  ]
};

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session, isPending } = useSession();

  if (isPending) {
    return (
      <div className="w-1/2 lg:w-64 min-h-screen bg-red-100" />
    );
  }

  const user = session?.user;
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = dashboardItems[user?.role] || [];

  return (
    <>
      {/* Mobile Menu Toggle Button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={toggleSidebar}
className="p-2 rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-50 focus:outline-none"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

  
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`
fixed inset-y-0 left-0 z-40 w-1/2 min-w-[220px] lg:w-64 bg-red-100 text-black p-5 flex flex-col justify-between
          transform transition-transform duration-300 ease-in-out shadow-2xl lg:shadow-none
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0 lg:static lg:h-screen
        `}
      >
        <div>
          <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-red-200">
            <Logo />
          </div>

          <nav className="space-y-1">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                onClick={() => setIsOpen(false)} 
className="flex items-center gap-3 px-3 py-3 rounded-lg text-slate-700 hover:bg-red-500 hover:text-white transition-all group"
              >
<div className="text-slate-600 group-hover:text-white transition-colors flex gap-2 items-center">
                  {item.icon}
                  <span className="font-medium text-sm">{item.name}</span>
                </div>
              </Link>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};

export default SideBar;