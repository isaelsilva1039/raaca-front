import { useState } from 'react';

import { isAvailable,isHoliday } from '@/utils/scheduleUtils';
const holidays = ['2024-01-01', '2024-12-25']; // Exemplo de feriados

const BookAppointment: React.FC = () => {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleBooking = (): void => {
    const dateTime = new Date(`${date}T${time}`);
    if (isHoliday(dateTime, holidays)) {
      setMessage('Booking on holidays is not allowed.');
      return;
    }

    if (!isAvailable(dateTime, defaultSchedule)) {
      setMessage('This time is not available for booking.');
      return;
    }

    setMessage('Booking successful!');
  };

  return (
    <div>
      <h1>Book an Appointment</h1>
      <input type="date" value={date} onChange={e => setDate(e.target.value)} />
      <input type="time" value={time} onChange={e => setTime(e.target.value)} />
      <button onClick={handleBooking}>Book</button>
      <p>{message}</p>
    </div>
  );
}

export default BookAppointment;
