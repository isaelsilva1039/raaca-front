export interface TimeSlot {
    start: string;
    end: string;
  }
  
  export interface WeeklySchedule {
    [key: string]: TimeSlot[];
  }
  