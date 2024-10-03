'use client'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import axiosInstance from '@/utils/axios';

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
  const Profile = () => {
    const [isEditing, setIsEditing] = useState(false);
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(true);
  
    // Fetch profile data from the API
    const fetchProfileData = async () => {
      try {
        const response = await axiosInstance.get('/users/profile');
        // Set the form values (excluding password)
        setValue('name', response.data.name);
        setValue('email', response.data.email);
        setValue('phone', response.data.phone || ''); // Assuming you may add phone in the future
      } catch (error) {
        console.error('Error fetching profile data:', error);
      } finally {
        setLoading(false);
      }
    };
  
    // Load profile data on component mount
    useEffect(() => {
      fetchProfileData();
    }, [setValue]);
  
    const onSubmit = (data) => {
      const confirmed = window.confirm('Are you sure you want to save changes?');
      if (confirmed) {
        console.log('Profile updated:', data);
        setIsEditing(false);
        // Here you would typically send a request to your API to save the updated profile data
        // For example:
        // await axiosInstance.put('/api/users/profile', data);
      }
    };
  
    if (loading) {
      return <p>Loading profile...</p>;
    }
  
    return (
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Profile Page</h2>
        <Card>
          <CardHeader>
            <CardTitle>{isEditing ? 'Edit Profile' : 'Profile Details'}</CardTitle>
          </CardHeader>
          <CardContent>
            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="Your Name"
                  readOnly={!isEditing}
                  {...register('name', { required: 'Name is required' })}
                />
                {errors.name && <p className="text-red-500">{errors.name.message}</p>}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  readOnly={!isEditing}
                  {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^\S+@\S+\.\S+$/,
                      message: 'Email is not valid',
                    },
                  })}
                />
                {errors.email && <p className="text-red-500">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Your phone number"
                  readOnly={!isEditing}
                  {...register('phone', {
                    required: 'Phone number is required',
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: 'Phone number must be 10 digits',
                    },
                  })}
                />
                {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}
              </div>
              <Button type="button" onClick={() => setIsEditing((prev) => !prev)}>
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
              {isEditing && (
                <Button type="submit" className="ml-2">
                  Save Profile
                </Button>
              )}
            </form>
          </CardContent>
        </Card>
        {/* Assuming renderAddresses is a function to render saved addresses */}
        {/* {renderAddresses()} */}
      </div>
    );
  };

export default Profile