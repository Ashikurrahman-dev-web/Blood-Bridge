import { redirect } from 'next/navigation'

import { stripe } from '../../lib/stripe'
import { donation } from '@/lib/action/donation'
import { ArrowLeft, CheckCircle2, Heart, Mail, ShieldCheck } from 'lucide-react'
import Link from 'next/link'

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams

  if (!session_id)
    throw new Error('Please provide a valid session_id (`cs_test_...`)')

  const {
    status,
     metadata,
    customer_details: { email: customerEmail }
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ['line_items', 'payment_intent']
  })

  if (status === 'open') {
    return redirect('/')
  }

  if (status === 'complete') {
    await donation({ ...metadata, SessionId: session_id })
    return (
      <section id="success">
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden text-center transition-all">
          
          {/* Header Badge & Icon */}
          <div className="bg-red-50 p-8 pb-6 flex flex-col items-center justify-center relative">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mb-4 relative">
              <Heart className="w-10 h-10 text-red-600 fill-red-600 animate-pulse" />
<div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 text-white border-2 border-white">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <span className="text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-100/80 px-3 py-1 rounded-full">
              Donation Successful
            </span>
            <h1 className="text-2xl font-bold text-slate-800 mt-3">
              Thank You for Your Support!
            </h1>
          </div>

          {/* Card Body */}
          <div className="p-6 sm:p-8 space-y-6 text-slate-600">
            <p className="text-sm sm:text-base leading-relaxed">
              We deeply appreciate your funding for our blood donation initiative. A confirmation email has been sent to:
            </p>

            {/* Email Highlight Box */}
            <div className="flex items-center justify-center gap-2 bg-slate-50 border border-slate-200/80 rounded-xl p-3 text-slate-700 font-medium text-sm">
              <Mail className="w-4 h-4 text-red-500 shrink-0" />
              <span className="truncate">{customerEmail}</span>
            </div>

            {/* Information / Support Section */}
            <div className="border-t border-slate-100 pt-5 text-xs text-slate-500 space-y-2">
              
              <p>
                If you have any questions, please email{' '}
                <a
                  href="mailto:orders@example.com"
                  className="text-red-600 font-medium hover:underline focus:outline-none"
                >
                  orders@example.com
                </a>
              </p>
            </div>

            {/* Action Button */}
            <div className="pt-2">
              <Link
                href="/"
className="inline-flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 px-6 rounded-xl shadow-md shadow-red-200 transition-all duration-200 hover:shadow-lg focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home Page               
              </Link>
            </div>
          </div>
        </div>
      </main>
      </section>
    )
  }
}