"use client"
import { useSession } from '@/lib/auth-client';
import { Columns4, GitPullRequest, Home, Menu, Send, Settings, UserRoundPlus, UsersRound, X } from 'lucide-react';
import React, { useState } from 'react';
import Logo from './Logo';
import { MdMessage } from 'react-icons/md';

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {data: session} = useSession();
  const user = session?.user
  const toggleSidebar = ()=>{
    setIsOpen(!isOpen); 
  };
  const dashboardItems = {
    "donor":[
  {name: 'Home', icon: <Home className='w-5 h-5'/>, href: '/dashboard/donor'},
  {name: 'ProfileSettings', icon: <Settings className='w-5 h-5'/>, href: '/dashboard/profile'},
{name:'My Donation Request', icon: <GitPullRequest className='w-5 h-5'/>, href:'/dashboard/mydonationrequest'},
{name: 'Create Donation Request', icon:<UserRoundPlus className='w-5 h-5'/>, href:'/dashboard/createdonationrequest'},     
    ],
   "volunteer":[
{name: 'Home', icon: <Home className='w-5 h-5'/>, href: '/dashboard/volunteer'},
  {name: 'ProfileSettings', icon: <Settings className='w-5 h-5'/>, href: '/dashboard/profile'},
{name: 'All Blood Donation', icon: <Columns4 className="w-5 h-5" />, href: '/dashboard/allblooddonationvolunteer' },
{ name: 'Comment', icon: <Send className="w-5 h-5" />, href: '/dashboard/commentAdmin'},  
   ], 
"admin":[
  { name: 'Home', icon: <Home className="w-5 h-5" />, href: '/dashboard/admin' }, 
  { name: 'ProfileSettings', icon: <Settings className="w-5 h-5" />, href: '/dashboard/profile' },
      { name: 'All Users', icon: <UsersRound className="w-5 h-5" />, href: '/dashboard/allusers' }, 
{ name: 'All Blood Donation', icon: <Columns4 className="w-5 h-5" />, href: '/dashboard/allblooddonationadmin'},               
{ name: 'Message', icon: <MdMessage className="w-5 h-5" />, href: '/dashboard/message'},               
{ name: 'Comment', icon: <Send className="w-5 h-5" />, href: '/dashboard/commentAdmin'},               
    ]   
  };
 const menuItems = dashboardItems[user?.role] || [];  
    return (
        <div className="flex bg-red-100 min-h-screen mr-8">
          <div className="lg:hidden p-4 absolute top-0 left-0 z-50">
   <button onClick={toggleSidebar}
className="p-2 rounded-md bg-white shadow-md text-gray-700 hover:bg-gray-50 focus:outline-none">
{isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}  
    </button>         
            </div>
{isOpen && (
     <div 
          className="fixed inset-0 bg-red-200 z-40 lg:hidden transition-opacity"
          onClick={toggleSidebar}
        />
)}  
 <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 text-black p-5 flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:h-screen`}>
<div>
          
          <div className="flex items-center gap-3 px-2 py-4 mb-6 border-b border-slate-800">
            <Logo />
          </div>
<nav className="space-y-1">
  {menuItems.map((item, index)=>(
    <a key={index}
    href={item.href}
className="flex items-center gap-4 px-4 py-3 rounded-lg text-slate-300 hover:bg-red-500 hover:text-white transition-all group">
<div className="text-slate-500 group-hover:text-white transition-colors flex gap-1">
    {item.icon}
    <span className="font-medium">{item.name}</span>
</div>
    </a>
  ))}  
</nav>
    </div>        
        </aside>            
        </div>
    );
};

export default SideBar;