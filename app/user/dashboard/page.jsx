'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  MenuIcon,
  Package,
  Ticket,
  User,
  ArrowLeft,
  Pencil,
  ArrowLeftRight,
  CalculatorIcon,
  Plus,
} from 'lucide-react';
import Sidebar from '@/components/custom/Sidebar';
import Tickets from './_components/Tickets';
import Profile from './_components/Profile';
import RateCalculator from './_components/RateCalculator';
import Transactions from './_components/Transactions';
import CreateOrder from './_components/CreateOrder';
import Orders from './_components/Orders';

export default function Dashboard() {
  const [isSidenavOpen, setIsSidenavOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('Orders');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [editingAddress, setEditingAddress] = useState(null);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      name: 'Home',
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      country: 'USA',
    },
    {
      id: 2,
      name: 'Work',
      street: '456 Office Blvd',
      city: 'Workville',
      state: 'NY',
      zip: '67890',
      country: 'USA',
    },
  ]);

  const toggleSidenav = () => setIsSidenavOpen(!isSidenavOpen);

  const navItems = [
    { name: 'Create', icon: Plus },
    { name: 'Orders', icon: Package },
    { name: 'Tickets', icon: Ticket },
    { name: 'Profile', icon: User },
    { name: 'Calculate', icon: CalculatorIcon },
    { name: 'Transactions', icon: ArrowLeftRight },
  ];

  const renderOrderDetails = (order) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Order #{order.id}</h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setSelectedOrder(null)}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to list
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2">
              <div>
                <dt className="font-semibold">Date:</dt>
                <dd>{order.date}</dd>
              </div>
              <div>
                <dt className="font-semibold">Status:</dt>
                <dd>{order.status}</dd>
              </div>
              <div>
                <dt className="font-semibold">Total:</dt>
                <dd>${order.total.toFixed(2)}</dd>
              </div>
            </dl>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Shipping Information</CardTitle>
          </CardHeader>
          <CardContent>
            <address className="not-italic">
              {order.shippingAddress.name}
              <br />
              {order.shippingAddress.street}
              <br />
              {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
              {order.shippingAddress.zip}
              <br />
              {order.shippingAddress.country}
            </address>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Order Items</CardTitle>
        </CardHeader>
        <CardContent>
          <table className="w-full">
            <thead>
              <tr>
                <th className="text-left">Item</th>
                <th className="text-right">Quantity</th>
                <th className="text-right">Price</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item, index) => (
                <tr key={index}>
                  <td>{item.name}</td>
                  <td className="text-right">{item.quantity}</td>
                  <td className="text-right">${item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  );

  const renderOrderList = (orders, title) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <p className="font-semibold">Order #{order.id}</p>
                <p className="text-sm text-gray-500">{order.date}</p>
              </div>
              <div>
                <p className="text-sm font-medium">${order.total.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{order.status}</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedOrder(order)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );



  const renderContent = () => {
    switch (activeSection) {
      case 'Orders':
        return (
          <Orders/>
        );
      case 'Tickets':
        return (
          <Tickets/>
        );
      case 'Profile':
        return (
          <Profile/>
        );
      case 'Calculate':
        return (
          <RateCalculator/>
        );
      case 'Create':
        return (
          <CreateOrder setActiveSection={setActiveSection} />
        );
      case 'Transactions':
        return (
          <Transactions/>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar
        title={'Dashboard'}
        sidebarOpen={isSidenavOpen}
        toggleSidebar={toggleSidenav}
        navItems={navItems}
        activeTab={activeSection}
        setActiveTab={setActiveSection}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-white border-b lg:hidden">
          <h1 className="text-2xl font-semibold">Dashboard</h1>
          <button onClick={toggleSidenav} aria-label="Toggle menu">
            <MenuIcon size={24} />
          </button>
        </header>

        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
