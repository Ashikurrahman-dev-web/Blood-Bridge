"use client";


import { FaHeart, FaHandHoldingHeart, FaUsers, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

export default function HomePage() {
  return (
    <div className="bg-red-300 text-white min-h-screen overflow-hidden">
      
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
<h1 className="text-4xl sm:text-6xl font-black tracking-tight max-w-3xl leading-[1.15] bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400">
Connecting Heroes With Those In <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-pink-500">Urgent Need</span>
        </h1>

        {/* Paragraph */}
        <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl leading-relaxed">
Your small act can write a big story for someone else. Register today as a donor or instantly search for verified blood savers available in your local district.
        </p>
     </section>

      <hr className="border-white/5 max-w-7xl mx-auto" />

      {/* 2. FEATURED SECTION (Our Impact & Process) */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
<h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
            Why Choose Our Platform?
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400">
            We bridge the gap between voluntary blood donors and medical emergencies with a fast, reliable, and completely transparent system.
          </p>
        </div>

        {/* Grid Cards (Equal height and width ensured) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="group relative bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between">
            <div>
<div className="w-12 h-12 rounded-xl bg-pink-500/10 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                <FaHandHoldingHeart className="text-xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Real-time Requests</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
Post blood requests instantly. Nearby donors matching the required group get notified immediately to act fast.
              </p>
            </div>
          </div>

          {/* Card 2 */}
<div className="group relative bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6 group-hover:scale-110 transition-transform">
                <FaUsers className="text-xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3">Role-Based Dashboard</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Donors, Volunteers, and Admins get a dedicated workspace to smoothly track statuses, approvals, and history logs.
              </p>
            </div>
          </div>

          {/* Card 3 */}
<div className="group relative bg-gradient-to-b from-white/[0.03] to-transparent border border-white/5 rounded-2xl p-8 hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <FaHeart className="text-xl" />
              </div>
              <h3 className="text-lg font-bold text-white mb-3"> Secure Logs</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                Protected via JWT and strict environment controls. Your privacy, addresses, and transaction security remain uncompromised.
              </p>
            </div>
          </div>
        </div>
      </section>

      <hr className="border-white/5 max-w-7xl mx-auto" />

      {/* 3. CONTACT US SECTION */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Contact Left - Information */}
          <div className="lg:col-span-5">
<h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              Get In Touch With Us
            </h2>
            <p className="mt-4 text-sm sm:text-base text-slate-400 leading-relaxed">
              Have questions about donating blood, funding safety, or account credentials? Drop us a message, our team or volunteers will reach out immediately.
            </p>

            <div className="mt-8 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-red-500 shrink-0">
                  <FaPhoneAlt className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Emergency Contact Number</p>
                  <p className="text-sm font-semibold text-white mt-0.5">+880 1700-000000</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
<div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-red-400 shrink-0">
                  <FaEnvelope className="text-sm" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">Official Email Support</p>
                  <p className="text-sm font-semibold text-white mt-0.5">support@bloodflow.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Right - Beautiful Contact Form */}
<div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
            <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Full Name</label>
                  <input 
                    type="text" 
                    placeholder="John Doe" 
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="john@example.com" 
                    className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 transition"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Message Topic</label>
                <input 
                  type="text" 
                  placeholder="How can we help you?" 
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-400 mb-2">Your Detailed Message</label>
                <textarea 
                  rows="4" 
                  placeholder="Write your message here..." 
                  className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 focus:outline-none focus:border-red-500/50 transition resize-none"
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