// @context: Date scroll picker — month/day/year scrolling selector
// @purpose: Three-column scrollable date picker (Month, Day, Year) with snap-to-item behavior
// @behavior: Each column scrolls independently; items snap to center via scroll padding; calls onDateChange with selected values
// @behavior: Highlights the centered/selected item in each column; viewport height configurable
// @performance: useMemo for day generation (accounts for selected month/year for correct day count)
// @dependencies: react (useRef, useEffect, useState, useMemo)

import React, { useRef, useEffect, useState, useMemo } from "react";

interface DateScrollPickerProps {
  viewportHeight: number; // e.g. 156 or 180
  onDateChange?: (month: string, day: string, year: string) => void;
  onMonthClick?: (month: string) => void;
  onInvalidYear?: (invalid: boolean) => void;
}

const ALL_MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const DateScrollPicker: React.FC<DateScrollPickerProps> = ({
  viewportHeight,
  onDateChange,
  onMonthClick,
  onInvalidYear,
}) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonthIdx = currentDate.getMonth();
  const currentDay = currentDate.getDate();

  const tomorrowDate = new Date(currentDate);
  tomorrowDate.setDate(currentDay + 1);
  const tomorrowYear = tomorrowDate.getFullYear();
  const tomorrowMonthIdx = tomorrowDate.getMonth();
  const tomorrowDay = tomorrowDate.getDate();

  const YEARS = useMemo(() => {
    const years: string[] = [];
    for (let i = currentYear - 3; i <= currentYear + 3; i++) {
      years.push(String(i));
    }
    return years;
  }, [currentYear]);

  const SELECTABLE_YEARS = useMemo(
    () => new Set([String(currentYear), String(currentYear + 1)]),
    [currentYear],
  );

  // Set default initial selection to tomorrow
  const [selectedYear, setSelectedYear] = useState(String(tomorrowYear));
  const [selectedMonth, setSelectedMonth] = useState(
    ALL_MONTHS[tomorrowMonthIdx],
  );
  const [selectedDay, setSelectedDay] = useState(
    String(tomorrowDay).padStart(2, "0"),
  );

  // Scroll container refs
  const monthRef = useRef<HTMLDivElement>(null);
  const dayRef = useRef<HTMLDivElement>(null);
  const yearRef = useRef<HTMLDivElement>(null);

  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const MONTHS = useMemo(() => ALL_MONTHS, []);

  const DAYS = useMemo(() => {
    const monthIdx = ALL_MONTHS.indexOf(selectedMonth);
    const yearNum = parseInt(selectedYear, 10);
    // Number of days in the month (monthIdx + 1, day 0 gets the last day of monthIdx)
    const daysInMonth = new Date(yearNum, monthIdx + 1, 0).getDate();

    let startDay = 1;
    if (selectedYear === String(currentYear) && monthIdx === currentMonthIdx) {
      startDay = currentDay;
    }

    return Array.from({ length: daysInMonth - startDay + 1 }, (_, i) =>
      String(startDay + i).padStart(2, "0"),
    );
  }, [selectedYear, selectedMonth, currentYear, currentMonthIdx, currentDay]);

  useEffect(() => {
    if (!MONTHS.includes(selectedMonth)) {
      setSelectedMonth(MONTHS[0]);
    }
  }, [MONTHS, selectedMonth]);

  useEffect(() => {
    if (!DAYS.includes(selectedDay)) {
      const selectedDayNum = parseInt(selectedDay, 10);
      if (DAYS.length > 0) {
        const firstAvailableDay = parseInt(DAYS[0], 10);
        const lastAvailableDay = parseInt(DAYS[DAYS.length - 1], 10);
        if (selectedDayNum < firstAvailableDay) {
          setSelectedDay(DAYS[0]);
        } else if (selectedDayNum > lastAvailableDay) {
          setSelectedDay(DAYS[DAYS.length - 1]);
        } else {
          setSelectedDay(DAYS[0]);
        }
      }
    }
  }, [DAYS, selectedDay]);

  // Standard high precision target row sizing
  const itemHeight = isMobile ? 42 : 44;

  // Center the highlight in the viewport
  const topSpacerHeight = (viewportHeight - itemHeight) / 2;
  const bottomSpacerHeight = viewportHeight - itemHeight - topSpacerHeight;

  // Use a Ref lock to block programmatic layout scrolls from triggering state updates
  const isInitializing = useRef(true);

  useEffect(() => {
    isInitializing.current = true;

    const scrollToCenter = (
      ref: React.RefObject<HTMLDivElement | null>,
      items: string[],
      targetValue: string,
    ) => {
      const container = ref.current;
      if (!container) return;

      const index = items.indexOf(targetValue);
      if (index === -1) return;

      const targetScroll = index * itemHeight;
      container.scrollTop = targetScroll;
    };

    // Scroll to targets
    scrollToCenter(monthRef, MONTHS, selectedMonth);
    scrollToCenter(dayRef, DAYS, selectedDay);
    scrollToCenter(yearRef, YEARS, selectedYear);

    // Release lock only after the browser has layouted and completed initial scrolling events
    const timer = setTimeout(() => {
      isInitializing.current = false;
    }, 120);

    return () => clearTimeout(timer);
  }, [
    itemHeight,
    viewportHeight,
    selectedMonth,
    selectedDay,
    selectedYear,
    MONTHS,
    DAYS,
    YEARS,
  ]);

  useEffect(() => {
    if (onDateChange && SELECTABLE_YEARS.has(selectedYear)) {
      onDateChange(selectedMonth, selectedDay, selectedYear);
    }
  }, [selectedMonth, selectedDay, selectedYear, onDateChange, SELECTABLE_YEARS]);

  useEffect(() => {
    if (onInvalidYear) {
      onInvalidYear(!SELECTABLE_YEARS.has(selectedYear));
    }
  }, [selectedYear, onInvalidYear, SELECTABLE_YEARS]);

  // Handle Scroll to update selection state
  const handleScrollColumn = (
    ref: React.RefObject<HTMLDivElement | null>,
    items: string[],
    updateState: (val: string) => void,
    type: "month" | "day" | "year",
  ) => {
    // Ignore updates during programmatic initial scrolling
    if (isInitializing.current) return;

    const container = ref.current;
    if (!container) return;

    const scrollPos = container.scrollTop;
    const index = Math.round(scrollPos / itemHeight);

    if (items[index] !== undefined) {
      const selectedValue = items[index];
      const isYearBlocked = type === "year" && !SELECTABLE_YEARS.has(selectedValue);

      updateState(selectedValue);

      if (onDateChange && !isYearBlocked) {
        const m = type === "month" ? selectedValue : selectedMonth;
        const d = type === "day" ? selectedValue : selectedDay;
        const y = type === "year" ? selectedValue : selectedYear;
        onDateChange(m, d, y);
      }
    }
  };

  return (
    <div
      className="relative flex justify-between bg-white py-0 px-4 shadow-[inset_0_1px_3px_rgba(0,0,0,0.02)] select-none"
      style={{
        height: `${viewportHeight}px`,
      }}
    >
      {/* Visual Selection Highlight box - pill bar matching the grey background in reference */}
      <div
        className="absolute left-2 right-2 bg-neutral-100 pointer-events-none rounded-[16px] border-0 outline-none ring-0 select-none"
        style={{
          top: `${topSpacerHeight}px`,
          height: `${itemHeight}px`,
        }}
      />

      {/* Month Column */}
      <div
        ref={monthRef}
        onScroll={() =>
          handleScrollColumn(monthRef, MONTHS, setSelectedMonth, "month")
        }
        className="flex-[1.2] h-full overflow-y-auto no-scrollbar relative z-10 scroll-smooth overscroll-contain"
      >
        <div
          style={{ height: `${topSpacerHeight}px` }}
          className="shrink-0 pointer-events-none"
        />
        {MONTHS.map((m) => {
          const isActive = m === selectedMonth;
          return (
            <div
              key={m}
              style={{ height: `${itemHeight}px` }}
              onClick={() => {
                if (isInitializing.current) return;
                setSelectedMonth(m);
                if (monthRef.current) {
                  monthRef.current.scrollTop = MONTHS.indexOf(m) * itemHeight;
                }
                if (onMonthClick) onMonthClick(m);
              }}
              className={`flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer rounded-xl whitespace-nowrap font-medium ${
                isActive
                  ? "text-neutral-800 text-[15px] md:text-[17px] scale-100"
                  : "text-neutral-800/70 hover:text-neutral-800 text-[14px] md:text-[16px] scale-98"
              }`}
            >
              {m}
            </div>
          );
        })}
        <div
          style={{ height: `${bottomSpacerHeight}px` }}
          className="shrink-0 pointer-events-none"
        />
      </div>

      {/* Day Column */}
      <div
        ref={dayRef}
        onScroll={() => handleScrollColumn(dayRef, DAYS, setSelectedDay, "day")}
        className="flex-1 h-full overflow-y-auto no-scrollbar relative z-10 scroll-smooth overscroll-contain text-center"
      >
        <div
          style={{ height: `${topSpacerHeight}px` }}
          className="shrink-0 pointer-events-none"
        />
        {DAYS.map((d) => {
          const isActive = d === selectedDay;
          return (
            <div
              key={d}
              style={{ height: `${itemHeight}px` }}
              onClick={() => {
                if (isInitializing.current) return;
                setSelectedDay(d);
                if (dayRef.current) {
                  dayRef.current.scrollTop = DAYS.indexOf(d) * itemHeight;
                }
              }}
              className={`flex items-center justify-center transition-all duration-200 shrink-0 cursor-pointer rounded-xl whitespace-nowrap font-medium ${
                isActive
                  ? "text-neutral-800 text-[15px] md:text-[17px] scale-100"
                  : "text-neutral-800/70 hover:text-neutral-800 text-[14px] md:text-[16px] scale-98"
              }`}
            >
              {d}
            </div>
          );
        })}
        <div
          style={{ height: `${bottomSpacerHeight}px` }}
          className="shrink-0 pointer-events-none"
        />
      </div>

      {/* Year Column */}
      <div
        ref={yearRef}
        onScroll={() =>
          handleScrollColumn(yearRef, YEARS, setSelectedYear, "year")
        }
        className="flex-1 h-full overflow-y-auto no-scrollbar relative z-10 scroll-smooth overscroll-contain text-center"
      >
        <div
          style={{ height: `${topSpacerHeight}px` }}
          className="shrink-0 pointer-events-none"
        />
        {YEARS.map((y) => {
          const isActive = y === selectedYear;
          const isSelectable = SELECTABLE_YEARS.has(y);
          return (
            <div
              key={y}
              style={{ height: `${itemHeight}px` }}
              onClick={() => {
                if (isInitializing.current || !isSelectable) return;
                setSelectedYear(y);
                if (yearRef.current) {
                  yearRef.current.scrollTop = YEARS.indexOf(y) * itemHeight;
                }
              }}
              className={`flex items-center justify-center transition-all duration-200 shrink-0 rounded-xl whitespace-nowrap font-medium ${
                isSelectable ? "cursor-pointer" : "cursor-default"
              } ${
                isActive
                  ? "text-neutral-800 text-[15px] md:text-[17px] scale-100"
                  : isSelectable
                    ? "text-neutral-800/70 hover:text-neutral-800 text-[14px] md:text-[16px] scale-98"
                    : "text-neutral-300 text-[14px] md:text-[16px] scale-98"
              }`}
            >
              <span className="flex flex-col items-center leading-tight">
                <span>{y}</span>
                {isActive && !isSelectable && (
                  <span className="text-[9px] text-amber-500 font-normal tracking-wide">
                    Unavailable
                  </span>
                )}
              </span>
            </div>
          );
        })}
        <div
          style={{ height: `${bottomSpacerHeight}px` }}
          className="shrink-0 pointer-events-none"
        />
      </div>
    </div>
  );
};
