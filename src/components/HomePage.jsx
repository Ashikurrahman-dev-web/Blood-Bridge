"use client";
import toast from "react-hot-toast";
import { FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function HomePage() {
 const messageSubmit = async(e)=>{
e.preventDefault();
const formData = new FormData(e.currentTarget);
const messageData = {
...Object.fromEntries(formData.entries()),
createdAt: new Date().toISOString(),  
};
try{
const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URI}/api/message`,{
  method: "POST",
  headers:{
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(messageData)
});
const data = await res.json()
toast.success("Message Send")
}catch(error){
  console.log(error)
toast.error("Something went Wrong")  
}
 } 
  return (
    <div className="min-h-screen overflow-hidden">
      
      {/* 1. BANNER / HERO SECTION */}
      <section className="relative relative-dot-grid py-24 px-6 max-w-7xl mx-auto flex flex-col items-center text-center justify-center min-h-[80vh]">
        {/* Glowing Ambient Background Details */}
<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
<div className="absolute bottom-1/4 left-1/3 w-96 h-96 bg-indigo-500/10 rounded-full blur-[150px] pointer-events-none" />

        {/* Small Tag */}
<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-red-500/30 bg-red-500/5 text-red-400 text-xs font-semibold uppercase tracking-wider mb-6 animate-fade-in">
          🩸 Save Lives, Give Blood
        </div>

        {/* Main Heading */}
<h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-3xl leading-[1.15] bg-clip-text text-red-500">
Connecting Heroes With Those In <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">Urgent Need</span>
        </h1>

        {/* Paragraph */}
        <p className="mt-6 text-base sm:text-lg text-slate-500 max-w-2xl leading-relaxed">
Your small act can write a big story for someone else. Register today as a donor or instantly search for verified blood savers available in your local district.
        </p>
     </section>

      <hr className="border-gray-300 max-w-7xl mx-auto" />

      {/* 3. CONTACT US SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5">
<h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-red-500">
              Get In Touch With Us
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-500 leading-relaxed">
Have questions about donating blood, funding safety, or account credentials? Drop us a message, our team or volunteers will reach out immediately.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-red-500 shrink-0">
                  <FaPhoneAlt className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Emergency Contact Number</p>
                  <p className="text-sm font-semibold text-slate-500 mt-0.5">+880 1700-000000</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-red-500 shrink-0">
                  <FaEnvelope className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-medium">Official Email Support</p>
                  <p className="text-sm font-semibold text-slate-500 mt-0.5">support@bloodflow.com</p>
                </div>
              </div>
            </div>
          </div>
<div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <form onSubmit={messageSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-2">Full Name</label>
                  <input 
                    type="text"
                    name="fullName" 
                    placeholder="Name" 
className="w-full border border-red-300 rounded-xl px-4 py-3 text-sm text-black placeholder-white focus:outline-none focus:border-red-500/50 transition"
                    required
                  />
                </div>
                <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    name="email"
                    placeholder="john@example.com" 
className="w-full border border-red-300 rounded-xl px-4 py-3 text-sm text-black placeholder-white focus:outline-none focus:border-red-500/50 transition"
                    required
                  />
                </div>
              </div>

              <div>
        <label className="block text-xs font-semibold text-slate-500 mb-2">Message Topic</label>
                <input 
                  type="text" 
                  name="topic"
                  placeholder="How can we help you?" 
className="w-full border border-red-300 rounded-xl px-4 py-3 text-sm text-black placeholder-white focus:outline-none focus:border-red-500/50 transition"
                  required
                />
              </div>

              <div>
    <label className="block text-xs font-semibold text-slate-500 mb-2">Your Detailed Message</label>
                <textarea 
                name="message"
                  rows="4" 
                  placeholder="Write your message here..." 
className="w-full border border-red-300 rounded-xl px-4 py-3 text-sm text-black placeholder-white focus:outline-none focus:border-red-500/50 transition resize-none"
                  required
                ></textarea>
              </div>

              <button 
                type="submit"
                className="w-full inline-flex items-center justify-center font-bold text-xs bg-gradient-to-r from-red-500 to-pink-600 text-white shadow-md shadow-pink-500/10 hover:shadow-pink-500/20 hover:scale-[1.01] active:scale-[0.99] transition h-11 px-6 rounded-xl cursor-pointer"
              >
                Send Message
              </button>
            </form>
          </div>

        </div>
      </section>

    </div>
  );
}