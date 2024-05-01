import { Schedule } from "@/app/meus-horario/types";

export function isAvailable(date: Date, schedule: Schedule): boolean {
  const dayOfWeek = date.toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
  if (['saturday', 'sunday'].includes(dayOfWeek)) return false;

  const daySchedule = schedule[dayOfWeek];
  if (!daySchedule) return false;

  const time = `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;
  return daySchedule.some(period => time >= period.start && time <= period.end);
}

export function isHoliday(date: Date, holidays: string[]): boolean {
  const dateString = date.toISOString().slice(0, 10);
  return holidays.includes(dateString);
}
