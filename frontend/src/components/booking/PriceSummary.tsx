'use client';

import type { PriceBreakdown } from '@/lib/pricing';

export interface PriceSummaryProps {
  priceBreakdown: PriceBreakdown | null;
  showSummary?: boolean;
}

export default function PriceSummary({ priceBreakdown, showSummary = false }: PriceSummaryProps) {
  if (!showSummary || !priceBreakdown || priceBreakdown.totalPrice <= 0) {
    return null;
  }

  return (
    <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-200">
      <div className="flex justify-between items-center mb-2">
        <span className="text-emerald-800 font-medium">Estimated Service Price:</span>
        <span className="text-2xl font-bold text-emerald-600">₹{priceBreakdown.totalPrice}</span>
      </div>
      
      {priceBreakdown.breakdown && priceBreakdown.breakdown.length > 0 && (
        <div className="space-y-1 text-sm text-emerald-700">
          {priceBreakdown.breakdown.map((item, index) => (
            <div key={index} className="flex justify-between">
              <span>{item.label}:</span>
              <span className={item.type === 'discount' ? 'text-green-600' : ''}>
                {item.type === 'discount' ? '-' : '+'}₹{item.amount}
              </span>
            </div>
          ))}
        </div>
      )}
      
      <p className="text-xs text-emerald-700 mt-2">
        *Final price may vary based on site inspection and additional requirements
      </p>
    </div>
  );
}