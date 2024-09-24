'use client';

import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import EditUser from './EditUser';

const UserDetails = () => {
  const userData = [
    {
      id: 1,
      name: 'Alice Cooper',
      email: 'alice@example.com',
      role: 'Customer',
    },
    {
      id: 2,
      name: 'Bob Dylan',
      email: 'bob@example.com',
      role: 'Support Staff',
    },
    {
      id: 3,
      name: 'Charlie Brown',
      email: 'charlie@example.com',
      role: 'Admin',
    },
  ];
  const [users, setUsers] = useState(userData);
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = (updatedUser) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setEditingUser(null);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">User Management</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              ID
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Name
            </th>
            {/* Hide Email and Role columns on small screens */}
            <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">
              Email
            </th>
            <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 lg:table-cell">
              Role
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {users.map((user) => (
            <tr key={user.id}>
              <td className="whitespace-nowrap px-6 py-4">{user.id}</td>
              <td className="whitespace-nowrap px-6 py-4">{user.name}</td>
              {/* Hide Email and Role columns on small screens */}
              <td className="hidden whitespace-nowrap px-6 py-4 md:table-cell">{user.email}</td>
              <td className="hidden whitespace-nowrap px-6 py-4 lg:table-cell">{user.role}</td>
              <td className="whitespace-nowrap px-6 py-4">
                <button
                  className="mr-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                  onClick={() => handleEdit(user)}
                >
                  Edit
                </button>
                <button
                  className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Dialog
        className="px-2"
        open={!!editingUser}
        onOpenChange={() => setEditingUser(null)}
      >
        {editingUser && (
          <EditUser
            user={editingUser}
            onSave={handleSave}
            onClose={() => setEditingUser(null)}
          />
        )}
      </Dialog>
    </div>
  );
};

export default UserDetails;
