import React from 'react';
import { School } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-indigo-600 text-white py-4 px-4 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center space-x-3">
        <School className="w-6 h-6" />
        <h1 className="text-xl font-bold truncate">Lecturer Check-in</h1>
      </div>
    </header>
  );
}