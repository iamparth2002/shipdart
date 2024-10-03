'use client';

import React, { useState, useEffect } from 'react';
import { Dialog } from '@/components/ui/dialog';
import EditUser from './EditUser';
import axiosInstance from '@/utils/axios';

const UserDetails = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await axiosInstance.get('/admin/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
  };

  const handleSave = async (updatedUser) => {
    console.log({updatedUser})
    try {
      const response = await axiosInstance.put(`/users/profile/${updatedUser._id}`, updatedUser);
      if (response.status === 200) {
        setUsers(users.map((user) => (user._id === updatedUser._id ? updatedUser : user)));
        setEditingUser(null);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this user?');
  
    if (confirmed) {
      try {
        const response = await axiosInstance.delete(`/users/profile/${id}`);
  
        if (response.status === 200) {
          setUsers(users.filter((user) => user._id !== id));
        }
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    }
  };

  return (
    <div className="rounded-lg bg-white p-6 shadow">
      <h2 className="mb-4 text-xl font-semibold">User Management</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Name
              </th>
              <th className="hidden px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 md:table-cell">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {users.map((user) => (
              <tr key={user._id}>
                <td className="px-6 py-4">{user.userId}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="hidden whitespace-nowrap px-6 py-4 md:table-cell">
                  {user.email}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <button
                    className="mr-2 rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="rounded bg-red-500 px-2 py-1 text-white hover:bg-red-600"
                    onClick={() => handleDelete(user._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
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
