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
} from 'lucide-react';
import Sidebar from '@/components/custom/Sidebar';

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
    { name: 'Orders', icon: Package },
    { name: 'Tickets', icon: Ticket },
    { name: 'Profile', icon: User },
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

  const handleEditAddress = (address) => {
    setEditingAddress({ ...address });
  };

  const handleSaveAddress = () => {
    setAddresses(
      addresses.map((addr) =>
        addr.id === editingAddress.id ? editingAddress : addr
      )
    );
    setEditingAddress(null);
  };

  const renderAddresses = () => (
    <Card>
      <CardHeader>
        <CardTitle>Saved Addresses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {addresses.map((address) => (
            <div key={address.id} className="border p-4 rounded-lg">
              {editingAddress && editingAddress.id === address.id ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSaveAddress();
                  }}
                  className="space-y-2"
                >
                  <Input
                    value={editingAddress.name}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        name: e.target.value,
                      })
                    }
                    placeholder="Name"
                  />
                  <Input
                    value={editingAddress.street}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        street: e.target.value,
                      })
                    }
                    placeholder="Street"
                  />
                  <Input
                    value={editingAddress.city}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        city: e.target.value,
                      })
                    }
                    placeholder="City"
                  />
                  <Input
                    value={editingAddress.state}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        state: e.target.value,
                      })
                    }
                    placeholder="State"
                  />
                  <Input
                    value={editingAddress.zip}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        zip: e.target.value,
                      })
                    }
                    placeholder="ZIP"
                  />
                  <Input
                    value={editingAddress.country}
                    onChange={(e) =>
                      setEditingAddress({
                        ...editingAddress,
                        country: e.target.value,
                      })
                    }
                    placeholder="Country"
                  />
                  <Button type="submit">Save</Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setEditingAddress(null)}
                  >
                    Cancel
                  </Button>
                </form>
              ) : (
                <>
                  <p className="font-semibold">{address.name}</p>
                  <p>{address.street}</p>
                  <p>
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <p>{address.country}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="mt-2"
                    onClick={() => handleEditAddress(address)}
                  >
                    <Pencil className="h-4 w-4 mr-2" /> Edit
                  </Button>
                </>
              )}
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
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Order Management</h2>
            {selectedOrder ? (
              renderOrderDetails(selectedOrder)
            ) : (
              <Tabs defaultValue="recent">
                <TabsList>
                  <TabsTrigger value="recent">Recent Orders</TabsTrigger>
                  <TabsTrigger value="history">Order History</TabsTrigger>
                </TabsList>
                <TabsContent value="recent">
                  {renderOrderList(
                    [
                      {
                        id: '1001',
                        date: '2023-06-01',
                        status: 'Shipped',
                        total: 129.99,
                        items: [
                          { name: 'Product A', quantity: 2, price: 64.99 },
                        ],
                        shippingAddress: {
                          name: 'John Doe',
                          street: '123 Main St',
                          city: 'Anytown',
                          state: 'CA',
                          zip: '12345',
                          country: 'USA',
                        },
                      },
                      {
                        id: '1002',
                        date: '2023-06-03',
                        status: 'Processing',
                        total: 79.99,
                        items: [
                          { name: 'Product B', quantity: 1, price: 79.99 },
                        ],
                        shippingAddress: {
                          name: 'Jane Smith',
                          street: '456 Elm St',
                          city: 'Somewhere',
                          state: 'NY',
                          zip: '67890',
                          country: 'USA',
                        },
                      },
                    ],
                    'Recent Orders'
                  )}
                </TabsContent>
                <TabsContent value="history">
                  {renderOrderList(
                    [
                      {
                        id: '1000',
                        date: '2023-05-28',
                        status: 'Delivered',
                        total: 199.99,
                        items: [
                          { name: 'Product C', quantity: 1, price: 199.99 },
                        ],
                        shippingAddress: {
                          name: 'Alice Johnson',
                          street: '789 Oak St',
                          city: 'Elsewhere',
                          state: 'TX',
                          zip: '54321',
                          country: 'USA',
                        },
                      },
                      {
                        id: '999',
                        date: '2023-05-15',
                        status: 'Delivered',
                        total: 49.99,
                        items: [
                          { name: 'Product D', quantity: 1, price: 49.99 },
                        ],
                        shippingAddress: {
                          name: 'Bob Williams',
                          street: '321 Pine St',
                          city: 'Nowhere',
                          state: 'FL',
                          zip: '98765',
                          country: 'USA',
                        },
                      },
                    ],
                    'Order History'
                  )}
                </TabsContent>
              </Tabs>
            )}
          </div>
        );
      case 'Tickets':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Ticket System</h2>
            <Card>
              <CardHeader>
                <CardTitle>Create New Ticket</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input id="subject" placeholder="Enter ticket subject" />
                  </div>
                  <div>
                    <Label htmlFor="description">Description</Label>
                    <textarea
                      id="description"
                      className="w-full p-2 border rounded"
                      rows={4}
                      placeholder="Describe your issue"
                    ></textarea>
                  </div>
                  <Button type="submit">Submit Ticket</Button>
                </form>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ticket History</CardTitle>
              </CardHeader>
              <CardContent>
                <p>
                  View the status and history of your submitted tickets here.
                </p>
                {/* Add a list or table of ticket history */}
              </CardContent>
            </Card>
          </div>
        );
      case 'Profile':
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold">Profile Page</h2>
            <Card>
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input id="name" placeholder="Your Name" />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="notifications">
                      Notification Preferences
                    </Label>
                    {/* Add checkboxes or radio buttons for notification preferences */}
                  </div>
                  <Button type="submit">Save Changes</Button>
                </form>
              </CardContent>
            </Card>
            {renderAddresses()}
          </div>
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