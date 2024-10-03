'use client';
import React from 'react';
import { CircleUserRound, LogOut, X } from 'lucide-react';
import Cookies from 'js-cookie';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Sidebar = ({
  title,
  sidebarOpen,
  toggleSidebar,
  navItems,
  activeTab,
  setActiveTab,
}) => {
  const router = useRouter();
  const handleLogout = () => {
    Cookies.remove('token');

    router.push('/login');
  };
  return (
    <aside
      className={`${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 text-white transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
    >
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4">
          <span className="text-2xl font-semibold">{title}</span>
          <button onClick={toggleSidebar} className="lg:hidden">
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-grow mt-8 px-2">
          {navItems.map((item) => (
            <Button
              key={item.name}
              variant={activeTab === item.name ? 'secondary' : 'ghost'}
              className={`flex w-full justify-start px-4 mb-2 text-left hover:bg-gray-700 hover:text-white rounded-xl text-white ${
                activeTab === item.name ? 'bg-gray-700 rounded-xl ' : ''
              }`}
              onClick={() => {
                setActiveTab(item.name);
                toggleSidebar();
              }}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Button>
          ))}
        </nav>

        {/* Profile and Logout at the Bottom */}
        <div className="p-4 border-t border-gray-700">
          <Button
            variant="ghost"
            className="mt-2 w-full gap-4 justify-start text-white hover:bg-gray-700 hover:text-white"
            onClick={handleLogout}
          >
            <LogOut className="h-5 w-5" />
            Logout
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
