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
  Ticket,
  Users,
  X,
} from 'lucide-react';
import Tickets from '@/app/admin/dashboard/_components/Tickets';
import UserDetails from '@/app/admin/dashboard/_components/UserDetails';
import Sidebar from '@/components/custom/Sidebar';
import Header from '@/components/custom/Header';
import SupportTicket from './_components/SupportTicket';

// import Sidebar from '@/components/custom/Sidebar';
// import Header from '@/components/custom/Header';
// import UserDetails from '../admin/dashboard/_components/UserDetails';
// import Tickets from '../admin/dashboard/_components/Tickets';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Users');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navItems = [
    { name: 'Users', icon: Users },
    { name: 'Tickets', icon: Ticket },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Tickets':
        return <SupportTicket />;
      case 'Users':
        return <UserDetails />;
      default:
        return <UserDetails />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        title={'Support Dashboard'}
        sidebarOpen={sidebarOpen}
        toggleSidebar={toggleSidebar}
        navItems={navItems}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <Header toggleSidebar={toggleSidebar} activeTab={activeTab} />

        {/* Page content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-4">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
