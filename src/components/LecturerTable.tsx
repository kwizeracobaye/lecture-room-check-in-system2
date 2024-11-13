import React from 'react';
import { Lecturer, Room, calculateRemainingDays } from '../types';
import { Edit2, LogOut } from 'lucide-react';

interface Props {
  lecturers: Lecturer[];
  onCheckOut: (id: string) => void;
  onEditRoom: (id: string, newRoom: string) => void;
  rooms: Room[];
}

export function LecturerTable({ lecturers, onCheckOut, onEditRoom, rooms }: Props) {
  const [editingId, setEditingId] = React.useState<string | null>(null);
  const [newRoom, setNewRoom] = React.useState('');
  const [, forceUpdate] = React.useReducer((x) => x + 1, 0);

  React.useEffect(() => {
    const timer = setInterval(() => forceUpdate(), 60000);
    return () => clearInterval(timer);
  }, []);

  const handleEditSubmit = (id: string) => {
    onEditRoom(id, newRoom);
    setEditingId(null);
    setNewRoom('');
  };

  const availableRooms = rooms.filter(room => !room.isOccupied);

  if (lecturers.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500 text-sm">
        No lecturers checked in
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lecturers.map((lecturer) => {
        const remainingDays = calculateRemainingDays(lecturer.checkInDate, lecturer.numberOfDays);
        return (
          <div 
            key={lecturer.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 p-4"
          >
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium text-gray-900">{lecturer.name}</h3>
                <p className="text-sm text-gray-500">{lecturer.className}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    setEditingId(lecturer.id);
                    setNewRoom(lecturer.roomNumber);
                  }}
                  className="p-1 text-gray-400 hover:text-gray-600"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onCheckOut(lecturer.id)}
                  className="p-1 text-red-400 hover:text-red-600"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
              <div>
                <span className="text-gray-500">Room:</span>
                {editingId === lecturer.id ? (
                  <div className="mt-1 flex items-center space-x-2">
                    <select
                      className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
                      value={newRoom}
                      onChange={(e) => setNewRoom(e.target.value)}
                    >
                      <option value={lecturer.roomNumber}>{lecturer.roomNumber}</option>
                      {availableRooms.map(room => (
                        <option key={room.number} value={room.number}>
                          {room.number}
                        </option>
                      ))}
                    </select>
                    <button
                      onClick={() => handleEditSubmit(lecturer.id)}
                      className="text-indigo-600 hover:text-indigo-900 text-sm font-medium"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <span className="ml-1 font-medium">{lecturer.roomNumber}</span>
                )}
              </div>
              <div>
                <span className="text-gray-500">Days:</span>
                <span className="ml-1 font-medium">{lecturer.numberOfDays}</span>
              </div>
              <div>
                <span className="text-gray-500">Remaining:</span>
                <span className={`ml-1 font-medium ${
                  remainingDays <= 1 ? 'text-red-600' : 'text-green-600'
                }`}>
                  {remainingDays}d
                </span>
              </div>
              <div>
                <span className="text-gray-500">Check-in:</span>
                <span className="ml-1 font-medium">
                  {new Date(lecturer.checkInDate).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}