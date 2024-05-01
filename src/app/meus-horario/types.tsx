export interface TimePeriod {
    start: string;
    end: string;
  }
  
  export interface Schedule {
    [day: string]: TimePeriod[];
  }