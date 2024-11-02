// src/app/components/Calendar.js
"use client";

import { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isToday } from 'date-fns';

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  return (
    <div className="calendar p-4 sm:p-6 lg:p-8 bg-gray-50 shadow-lg rounded-lg">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-4">{format(currentMonth, 'MMMM yyyy')}</h2>
      <div className="grid grid-cols-7 gap-2 text-center mb-4">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
          <div key={day} className="font-semibold text-gray-700 text-xs sm:text-sm">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-2 sm:gap-4">
        {daysInMonth.map((day) => (
          <div key={day} className={`relative p-2 border rounded-lg transition-all duration-300 ease-in-out ${isToday(day) ? 'bg-blue-200 border-blue-400' : 'bg-white hover:bg-blue-50'}`}>
            <div className="text-lg sm:text-xl font-semibold">{format(day, 'd')}</div>
            <div className="text-xs text-gray-500">{format(day, 'EEEE').slice(0, 3)}</div> {/* Show abbreviated day names */}
          </div>
        ))}
      </div>
      <div className="flex flex-col sm:flex-row justify-between mt-4">
        <button 
          className="mb-2 sm:mb-0 px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
        >
          Previous
        </button>
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 transition"
          onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Calendar;
