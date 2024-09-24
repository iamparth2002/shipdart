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
import UserDetails from './_components/UserDetails';
import Parcel from './_components/Parcel';
import Tickets from './_components/Tickets';
import Content from './_components/Content';
import Dashboard from './_components/Dashboard';
import Sidebar from '@/components/custom/Sidebar';
import Header from '@/components/custom/Header';
import Analytics from './_components/Analytics';
import Profile from './_components/Profile';

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Dashboard');

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard },

    { name: 'Users', icon: Users },
    { name: 'Parcels', icon: Package },
    { name: 'Tickets', icon: Ticket },
    { name: 'Analytics', icon: BarChart2 },
    // { name: 'Content', icon: FileText },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'Users':
        return <UserDetails />;
      case 'Parcels':
        return <Parcel />;
      case 'Tickets':
        return <Tickets />;
      case 'Analytics':
        return <Analytics />;
      case 'Content':
        return <Content />;
      case 'Profile':
        return <Profile />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar
        title={'Admin Dashboard'}
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
