'use client';

import { useState } from 'react';
import { Button, Input, Card } from '@heroui/react';
import { Heart, DollarSign, ShieldCheck, HeartHandshake } from 'lucide-react';

const PRESET_AMOUNTS = [10, 25, 50, 100];

export default function FundingPage() {
  const [selectedAmount, setSelectedAmount] = useState('');

  const handlePresetClick = (amount) => {
    setSelectedAmount(amount.toString());
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <Card className="max-w-md w-full shadow-xl border border-slate-100 rounded-2xl bg-white overflow-hidden">
        
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center pt-8 pb-4 px-6 text-center bg-red-50/60">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-3">
            <Heart className="w-8 h-8 text-red-600 fill-red-600 animate-pulse" />
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-red-600 bg-red-100/80 px-3 py-1 rounded-full mb-2">
            Support Blood Donation
          </span>
          <h1 className="text-2xl font-bold text-slate-800">
            Make a Donation
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Your contribution helps save lives every day.
          </p>
        </div>

        <hr className="border-gray-300 max-w-7xl mx-auto" />

        {/* Form Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <form method="POST" action="/api/funding" className="space-y-6">
            
            {/* Quick Presets */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
                Select Amount ($)
              </label>
              <div className="grid grid-cols-4 gap-2">
                {PRESET_AMOUNTS.map((amt) => (
                  <Button
                    key={amt}
                    type="button"
                    variant={selectedAmount === amt.toString() ? 'solid' : 'flat'}
                    color={selectedAmount === amt.toString() ? 'danger' : 'default'}
                    className={`font-semibold rounded-xl text-sm transition-all ${
                      selectedAmount === amt.toString() 
                        ? 'bg-red-600 text-white shadow-md shadow-red-200' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                    onClick={() => handlePresetClick(amt)}
                  >
                    ${amt}
                  </Button>
                ))}
              </div>
            </div>

            {/* Custom Amount Input */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">
                Or Enter Custom Amount
              </label>
              <Input
                name="amount"
                type="number"
                min="1"
                step="any"
                required
                placeholder="0.00"
                value={selectedAmount}
                onChange={(e) => setSelectedAmount(e.target.value)}
                startcontent={
                  <DollarSign className="w-4 h-4 text-slate-400 shrink-0 pointer-events-none" />
                }
                variant="bordered"
                radius="lg"
                size="lg"
                className={{
inputWrapper: 'border-slate-200 hover:border-red-400 focus-within:!border-red-600 bg-white shadow-sm',
                  input: 'text-slate-800 font-semibold text-base placeholder:text-slate-400',
                }}
              />
            </div>

            {/* Trust Badge */}
<div className="flex items-center justify-center gap-2 text-xs text-slate-500 bg-slate-50 py-2.5 px-3 rounded-xl border border-slate-100">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Secure payment powered by Stripe</span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              color="danger"
              size="lg"
              radius="lg"
className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold shadow-lg shadow-red-200 transition-all duration-200 flex items-center justify-center gap-2"
            >
              <HeartHandshake className="w-5 h-5" />
              Give Fund Now
            </Button>
          </form>
        </div>
      </Card>
    </main>
  );
}