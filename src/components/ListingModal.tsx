// @context: Listing booking modal — date selection and reserve
// @purpose: Calendar-based date picker for move-in date selection; shows monthly calendar with navigation
// @behavior: Inline calendar with prev/next month; selects start date; calls onSelect callback
// @behavior: Uses date-fns for all date calculations; styled to match listing detail design
// @dependencies: motion, date-fns, cn utility, lucide-react
// @known-issues: Only supports single date selection (no range); inline version in ListingDetail duplicates this

import React from 'react';
import { X } from 'lucide-react';

import { 
  format, 
  getMonth,
  getYear,
  getDate,
  getDaysInMonth,
  setMonth as setDateMonth,
  setYear as setDateYear,
  setDate as setDateDay,
} from 'date-fns';
import { cn } from '../lib/utils';

interface ListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: Date | null;
  endDate: Date | null;
  onSelect: (date: Date) => void;
}

const WheelPicker = ({ 
  items, 
  value, 
  onChange,
  label
}: { 
  items: readonly string[] | readonly number[], 
  value: string | number, 
  onChange: (val: string | number) => void,
  label: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [itemHeight, setItemHeight] = React.useState(40);

  React.useEffect(() => {
    const updateHeight = () => {
      setItemHeight(window.innerWidth >= 768 ? 40 : 32);
    };
    updateHeight();
    window.addEventListener('resize', updateHeight);
    return () => window.removeEventListener('resize', updateHeight);
  }, []);

  React.useEffect(() => {
    const index = (items as readonly (string | number)[]).indexOf(value);
    if (index !== -1 && containerRef.current) {
      containerRef.current.scrollTop = index * itemHeight;
    }
  }, [value, items, itemHeight]);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const scrollPos = containerRef.current.scrollTop;
    const index = Math.round(scrollPos / itemHeight);
    if (items[index] !== undefined && items[index] !== value) {
      onChange(items[index]);
    }
  };

  return (
    <div className="flex flex-col items-center flex-1">
      <span className="text-[8px] md:text-[10px] font-black text-neutral-400 uppercase tracking-widest mb-2 md:mb-3">{label}</span>
      <div className={cn(
        "relative w-full overflow-hidden transition-all duration-300",
        "h-[96px] md:h-[140px]"
      )}>
        {/* Selection Mask */}
        <div className="absolute top-1/2 left-0 right-0 -translate-y-1/2 border-y border-neutral-100 pointer-events-none z-10 bg-neutral-100/20 h-[32px] md:h-[40px]" />
        
        {/* Edge Gradients */}
        <div className="absolute top-0 left-0 right-0 h-[24px] md:h-[40px] bg-gradient-to-b from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-[24px] md:h-[40px] bg-gradient-to-t from-white to-transparent z-10 pointer-events-none" />
        
        <div 
          ref={containerRef}
          onScroll={handleScroll}
          className={cn(
            "h-full overflow-y-scroll scroll-smooth snap-y snap-mandatory no-scrollbar",
            "pb-[64px] pt-[32px] md:pb-[100px] md:pt-[50px]"
          )}
        >
          {items.map((item, i) => (
            <div 
              key={i}
              style={{ height: `${itemHeight}px` }}
              className={cn(
                "flex items-center justify-center snap-center transition-all duration-200",
                item === value 
                  ? "text-[#17294F] font-black text-sm md:text-lg" 
                  : "text-neutral-300 font-bold text-[10px] md:text-xs scale-90"
              )}
            >
              {typeof item === 'number' && item < 10 ? `0${item}` : item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const ListingModal: React.FC<ListingModalProps> = ({ 
  isOpen, 
  onClose, 
  startDate, 
  onSelect 
}) => {
  const [tempDate, setTempDate] = React.useState<Date>(startDate || new Date());

  React.useEffect(() => {
    if (isOpen) {
      setTempDate(startDate || new Date());
    }
  }, [isOpen, startDate]);

  if (!isOpen) return null;

  const years = Array.from({ length: 10 }, (_, i) => getYear(new Date()) + i);
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const daysInMonth = getDaysInMonth(tempDate);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);

  const handleYearChange = (year: string | number) => {
    const y = typeof year === 'string' ? parseInt(year, 10) : year;
    setTempDate(setDateYear(tempDate, y));
  };

  const handleMonthChange = (monthName: string | number) => {
    const m = typeof monthName === 'number' ? monthName : months.indexOf(monthName);
    setTempDate(setDateMonth(tempDate, m));
  };

  const handleDayChange = (day: string | number) => {
    const d = typeof day === 'string' ? parseInt(day, 10) : day;
    setTempDate(setDateDay(tempDate, d));
  };

  const handleConfirm = () => {
    onSelect(tempDate);
    onClose();
  };

  return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        <div
           onClick={onClose}
           className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />
        
        <div
          className="relative bg-white w-full max-w-[340px] md:max-w-[440px] rounded-2xl md:rounded-[2rem] shadow-2xl overflow-hidden p-5 md:p-8"
        >
          <div className="flex items-center justify-between mb-4 md:mb-6">
            <div>
              <h2 className="text-xl md:text-3xl font-extrabold font-display text-[#17294F]">Check Availability</h2>
            </div>
            <button 
              onClick={onClose}
              className="p-2 md:p-2.5 hover:bg-neutral-100 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:gap-6">
            <div className="flex flex-col gap-3 md:gap-5">
              <div className="border border-neutral-200 rounded-xl md:rounded-2xl p-3 md:p-4 bg-neutral-50">
                <div className="px-2 md:px-3">
                  <div className="text-[8px] md:text-[10px] font-extrabold uppercase tracking-widest text-[#17294F] mb-0.5">Move-in Date</div>
                  <div className="font-bold text-neutral-800 text-xs md:text-base">
                    {format(tempDate, 'MMMM d, yyyy')}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-neutral-100 p-3">
                <div className="flex gap-1.5">
                  <WheelPicker 
                    label="Month"
                    items={months} 
                    value={months[getMonth(tempDate)]} 
                    onChange={handleMonthChange} 
                  />
                  <WheelPicker 
                    label="Day"
                    items={days} 
                    value={getDate(tempDate)} 
                    onChange={handleDayChange} 
                  />
                  <WheelPicker 
                    label="Year"
                    items={years} 
                    value={getYear(tempDate)} 
                    onChange={handleYearChange} 
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 md:mt-7 flex gap-2 md:gap-3">
            <button 
              onClick={() => setTempDate(new Date())}
              className="flex-1 py-2.5 md:py-3.5 text-xs md:text-sm text-neutral-500 font-bold hover:bg-neutral-50 rounded-xl transition"
            >
              Today
            </button>
            <button 
              onClick={handleConfirm}
              className="flex-[2] py-2.5 md:py-3.5 bg-[#17294F] text-white text-xs md:text-sm font-bold rounded-xl shadow-lg shadow-indigo-100 hover:bg-[#1e3566] transition"
            >
              Confirm Move-in
            </button>
          </div>
        </div>
      </div>
  );
};
