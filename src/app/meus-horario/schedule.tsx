import { useState } from 'react';
import { Schedule, TimePeriod } from './types';

const defaultSchedule: Schedule = {
  monday: [{ start: '09:00', end: '11:00' }, { start: '14:00', end: '17:00' }],
  tuesday: [],
  wednesday: [],
  thursday: [],
  friday: [],
};

const ScheduleConfigurator: React.FC = () => {
  const [schedule, setSchedule] = useState<Schedule>(defaultSchedule);

  const handleTimeChange = (day: string, index: number, period: keyof TimePeriod, value: string): void => {
    const updatedSchedule = { ...schedule };
    if (!updatedSchedule[day][index]) {
      updatedSchedule[day][index] = { start: '', end: '' };
    }
    updatedSchedule[day][index][period] = value;
    setSchedule(updatedSchedule);
  };

  const days = Object.keys(defaultSchedule);

  return (
    <div>
      <h1>Configure Your Weekly Schedule</h1>
      {days.map(day => (
        <div key={day}>
          <h2>{day.charAt(0).toUpperCase() + day.slice(1)}</h2>
          {schedule[day].map((period, index) => (
            <div key={index}>
              <input
                type="time"
                value={period.start}
                onChange={(e) => handleTimeChange(day, index, 'start', e.target.value)}
              />
              <input
                type="time"
                value={period.end}
                onChange={(e) => handleTimeChange(day, index, 'end', e.target.value)}
              />
            </div>
          ))}
          <button onClick={() => handleTimeChange(day, schedule[day].length, 'start', '00:00')}>
            Add Time Slot
          </button>
        </div>
      ))}
    </div>
  );
}

export default ScheduleConfigurator;
