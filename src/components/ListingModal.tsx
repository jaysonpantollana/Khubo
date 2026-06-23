// @context: Listing booking modal — date selection and reserve
// @purpose: Calendar-based date picker for move-in date selection; shows monthly calendar with navigation
// @behavior: Inline calendar with prev/next month; selects start date; calls onSelect callback
// @behavior: Uses date-fns for all date calculations; styled to match listing detail design
// @dependencies: motion, date-fns, cn utility, lucide-react
// @known-issues: Only supports single date selection (no range); inline version in ListingDetail duplicates this

import React from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

import { 
  format, 
  getMonth,
  getYear,
  getDate,
  startOfMonth,
  endOfMonth,
  getDay,
  isBefore,
  startOfDay,
  addMonths,
  subMonths,
  isSameDay,
} from 'date-fns';
import { cn } from '../lib/utils';

interface ListingModalProps {
  isOpen: boolean;
  onClose: () => void;
  startDate: Date | null;
  endDate: Date | null;
  onSelect: (date: Date) => void;
}

const DAY_LABELS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const CalendarGrid = ({
  tempDate,
  onDateChange,
}: {
  tempDate: Date;
  onDateChange: (date: Date) => void;
}) => {
  const today = startOfDay(new Date());
  const monthStart = startOfMonth(tempDate);
  const monthEnd = endOfMonth(tempDate);
  const startDow = getDay(monthStart);
  const totalDays = getDate(monthEnd);

  const cells: (number | null)[] = [];
  for (let i = 0; i < startDow; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  const isPast = (d: number) => {
    const date = new Date(getYear(tempDate), getMonth(tempDate), d);
    return isBefore(date, today);
  };

  const isToday = (d: number) =>
    isSameDay(new Date(getYear(tempDate), getMonth(tempDate), d), today);

  const isSelected = (d: number) =>
    isSameDay(new Date(getYear(tempDate), getMonth(tempDate), d), tempDate);

  return (
    <div>
      <div className="flex items-center justify-between mb-3 px-1">
        <button
          onClick={() => onDateChange(subMonths(tempDate, 1))}
          className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
          aria-label="Previous month"
        >
          <ChevronLeft size={18} className="text-neutral-600" />
        </button>
        <span className="text-sm font-bold text-neutral-800">
          {format(tempDate, 'MMMM yyyy')}
        </span>
        <button
          onClick={() => onDateChange(addMonths(tempDate, 1))}
          className="p-1.5 rounded-lg hover:bg-neutral-100 transition-colors"
          aria-label="Next month"
        >
          <ChevronRight size={18} className="text-neutral-600" />
        </button>
      </div>

      <div className="grid grid-cols-7 mb-1">
        {DAY_LABELS.map((label) => (
          <div
            key={label}
            className="text-center text-[10px] md:text-xs font-semibold text-neutral-400 py-1"
          >
            {label}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-0.5">
        {cells.map((d, i) => {
          if (d === null) return <div key={`empty-${i}`} className="aspect-square" />;

          const past = isPast(d);
          const todayCell = isToday(d);
          const selected = isSelected(d);

          return (
            <button
              key={d}
              onClick={() => onDateChange(new Date(getYear(tempDate), getMonth(tempDate), d))}
              disabled={past}
              className={cn(
                "aspect-square flex items-center justify-center rounded-full text-xs md:text-sm font-medium transition-all",
                selected
                  ? "bg-[#17294F] text-white shadow-md"
                  : todayCell
                    ? "bg-neutral-100 text-[#17294F] font-bold"
                    : past
                      ? "text-neutral-300 cursor-not-allowed"
                      : "text-neutral-700 hover:bg-neutral-100 cursor-pointer"
              )}
            >
              {d}
            </button>
          );
        })}
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
                <CalendarGrid tempDate={tempDate} onDateChange={setTempDate} />
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
