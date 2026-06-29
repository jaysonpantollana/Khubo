// @context: Review breakdown component — rating dimension bars
// @purpose: Shows detailed rating breakdown across 6 dimensions (cleanliness, accuracy, check-in, communication, location, value)
// @behavior: Displays overall rating with total count; progress bars for each dimension
// @dependencies: None (pure JSX with inline styles for bar widths)

import React from 'react';

interface ReviewBreakdownProps {
  rating: number;
  totalReviews: number;
  breakdown: {
    cleanliness: number;
    accuracy: number;
    checkIn: number;
    communication: number;
    location: number;
    value: number;
  };
}

const ReviewBreakdown: React.FC<ReviewBreakdownProps> = ({ 
  breakdown 
}) => {
  const categories = [
    { label: 'Cleanliness', score: breakdown.cleanliness },
    { label: 'Accuracy', score: breakdown.accuracy },
    { label: 'Move-in', score: breakdown.checkIn },
    { label: 'Communication', score: breakdown.communication },
    { label: 'Location', score: breakdown.location },
    { label: 'Value', score: breakdown.value },
  ];

  return (
    <div className="py-12 border-t border-neutral-100">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
        {/* Metrics Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-10 lg:gap-y-0">
            {categories.map((cat, idx) => (
              <div 
                key={cat.label}
                className={`flex flex-col items-center gap-5 px-4 lg:px-6 relative group ${idx === 0 ? 'pl-0' : ''}`}
              >
                {/* Visual Separator for Desktop */}
                {idx > 0 && (
                  <div className="hidden lg:block absolute left-0 top-0 bottom-0 w-px bg-neutral-100" />
                )}
                
                <div className="space-y-2 text-center">
                  <p className="text-[11px] font-bold text-neutral-800 leading-none">
                    {cat.label}
                  </p>
                  <p className="text-xl font-black text-[#17294F] leading-none">
                    {cat.score.toFixed(1)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewBreakdown;
