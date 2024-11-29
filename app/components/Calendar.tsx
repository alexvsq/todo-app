import React, { useState, useEffect } from 'react';

export default function Calendar() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const getDaysInMonth = (date: Date) => {
        const year = date.getFullYear();
        const month = date.getMonth();

        const firstDay = new Date(year, month, 1).getDay();

        const lastDate = new Date(year, month + 1, 0).getDate();

        const daysArray = Array.from({ length: firstDay }, () => '');

        for (let day = 1; day <= lastDate; day++) {
            daysArray.push((day).toString());
        }

        return daysArray;
    };

    const days = getDaysInMonth(currentDate);

    return (
        <div className='h-full flex flex-col gap-4 items-center'>
            <header className='text-center'>
                <p className='text-textGray font-semibold'>
                    {currentDate.toLocaleDateString('es-ES', { month: 'long' })}
                </p>
                <p className='text-bluePrimary text-5xl font-semibold'>
                    {currentDate.toLocaleDateString('es-ES', { day: '2-digit' })}
                </p>
            </header>

            <footer className='hidden lg:block'>
                <div className='grid grid-cols-7 gap-3 font-medium'>
                    {['D', 'L', 'M', 'M', 'J', 'V', 'S'].map((day, index) => (
                        <p key={index} className='text-textGray'>{day}</p>
                    ))}
                    {days.map((day, index) => {
                        const currentDay = currentDate.getDate().toString();
                        return (
                            <div
                                key={index}
                                className={`rounded-full p-1 aspect-square flex justify-center items-center ${day == currentDay ? 'bg-bluePrimary' : ''}`}
                            >
                                <p
                                    className={` ${day == currentDay ? 'text-white' : 'text-black '}`}
                                >
                                    {day || ''}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </footer>
        </div>
    );
}
