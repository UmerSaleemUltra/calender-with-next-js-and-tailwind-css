"use client";

import { useState, useEffect } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday, isSameDay } from 'date-fns';
import { ArrowRightFromLine, ArrowLeftFromLine } from 'lucide-react';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [savedDate, setSavedDate] = useState(null);

  useEffect(() => {
    const storedDate = localStorage.getItem('selectedDate');
    if (storedDate) {
      setSavedDate(new Date(storedDate));
    }
  }, []);

  const handleDateClick = (day) => {
    setSavedDate(day);
    localStorage.setItem('selectedDate', day.toISOString());
  };

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  return (
    <div className="calendar p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4 text-black">{format(currentMonth, 'MMMM yyyy')}</h2>
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-semibold text-black text-xs sm:text-sm">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">
        {daysInMonth.map((day) => (
          <div 
            key={day} 
            className={`relative p-2 border rounded-lg transition-all duration-300 ease-in-out 
              ${isToday(day) ? 'bg-white text-black border-blue-400 font-semibold' : 
                savedDate && isSameDay(savedDate, day) ? 'bg-gray-400 text-white border-gray-600' : 
                'bg-white text-black hover:bg-gray-300 hover:text-black'}`}
            onClick={() => handleDateClick(day)}
          >
            <div className="text-lg sm:text-xl font-semibold">{format(day, 'd')}</div>
            <div className="text-xs text-black">{format(day, 'EEEE').slice(0, 3)}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between mt-4">
        <button 
          className="mb-2 sm:mb-0 px-3 py-1 bg-blue-500 text-black rounded-lg hover:bg-light-blue-400 transition flex items-center"
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
        >
          <ArrowLeftFromLine className="mr-2 text-black" />
          Previous
        </button>
        <button 
          className="px-3 py-1 bg-blue-500 text-black rounded-lg hover:bg-light-blue-400 transition flex items-center"
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
        >
          <ArrowRightFromLine className="mr-2 text-black" />
          Next
        </button>
      </div>
    </div>
  );
};

export default Calendar;
