import React from 'react';
import {
  LayoutGrid,
  MessageSquare,
  Dice5,
  CheckCheck,
  Bell,
  Users,
  SlidersHorizontal,
} from 'lucide-react';

const Menu = () => {
  const icons = [LayoutGrid, MessageSquare, Dice5, CheckCheck, Bell, Users, SlidersHorizontal];
  return (
    <section className="py-4 px-6 flex flex-col items-center gap-8 border-r-gray-700 border-right-solid">
      <div className="flex gap-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="w-12 h-12 rounded-full bg-mygray-700 text-white font-bold flex items-center justify-center text-4xl">
        C
      </div>
      <div className="flex flex-col gap-4">
        {icons.map((Elem, i) => {
          return (
            <div key={i} className="bg-transparent hover:bg-mygray-800 p-3 rounded-md">
              <Elem color={'#6C6C6D'} size={24} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Menu;
