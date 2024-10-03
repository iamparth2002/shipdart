'use client';
import { useState } from 'react';
import {
  BarChart2,
  Bell,
  ChevronDown,
  FileText,
  LayoutDashboard,
  Menu,
  MessageSquare,
  Package,
  Shield,
  Ticket,
  Users,
  X,
} from 'lucide-react';

import Sidebar from '@/components/custom/Sidebar';
import Header from '@/components/custom/Header';
import UserDetails from '@/app/admin/dashboard/_components/UserDetails';
import Tickets from '@/app/admin/dashboard/_components/Tickets';
import Staffs from '@/components/custom/Staffs';


export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Users');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navItems = [
    { name: 'Users', icon: Users },
    { name: 'Tickets', icon: Ticket },
    { name: 'Staff', icon: Shield },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Tickets':
        return <Tickets />;
      case 'Users':
        return <UserDetails />;
      default:
        return <Staffs />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        title={'SuperAdmin Dashboard'}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <Header type={"superadmin"} toggleSidebar={toggleSidebar} activeTab={activeTab} />

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
