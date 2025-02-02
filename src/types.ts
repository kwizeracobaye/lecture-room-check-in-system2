export interface Lecturer {
  id: string;
  name: string;
  className: string;
  roomNumber: string;
  numberOfDays: number;
  checkInDate: string;
}

export interface Room {
  number: string;
  isOccupied: boolean;
}

export type LecturerFormData = Omit<Lecturer, 'id' | 'checkInDate'>;

export function calculateRemainingDays(checkInDate: string, numberOfDays: number): number {
  const checkIn = new Date(checkInDate);
  const now = new Date();
  const diffTime = numberOfDays * 24 * 60 * 60 * 1000 - (now.getTime() - checkIn.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(0, diffDays);
}