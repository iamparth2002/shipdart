'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from 'react-hook-form';
import axiosInstance from '@/utils/axios';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);

  // Fetch profile data from the API
  const fetchProfileData = async () => {
    try {
      const response = await axiosInstance.get('/users/profile');
      const { name, email, phone, bankDetails } = response.data;

      // Set the form values
      setValue('name', name);
      setValue('email', email);
      setValue('phone', phone || '');
      if (bankDetails) {
        setValue('accountHolderName', bankDetails.accountHolderName || '');
        setValue('bankName', bankDetails.bankName || '');
        setValue('accountNumber', bankDetails.accountNumber || '');
        setValue('ifscCode', bankDetails.ifscCode || '');
        setValue('accountType', bankDetails.accountType || '');
        setValue('branchName', bankDetails.branchName || '');
        setValue('gstNumber', bankDetails.gstNumber || '');
        setValue('panNumber', bankDetails.panNumber || '');
      }
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

  const onSubmit = async(data) => {
    const confirmed = window.confirm('Are you sure you want to save changes?');
    if (confirmed) {
      console.log('Profile updated:', data);
      setIsEditing(false);
      // Here you would typically send a request to your API to save the updated profile data
      // For example:
      await axiosInstance.put('/users/profile', data);
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
          <CardTitle className="text-xl font-semibold border-b-2 border-primary pb-2">Profile Details</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4 " onSubmit={handleSubmit(onSubmit)}>
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

            {/* Bank Details */}
            <div>
              <h3 className="text-lg font-semibold mt-8 border-b-2 border-primary pb-2">Bank Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div>
                  <Label htmlFor="accountHolderName">Account Holder Name</Label>
                  <Input
                    id="accountHolderName"
                    placeholder="Account Holder Name"
                    readOnly={!isEditing}
                    {...register('accountHolderName')}
                  />
                </div>
                <div>
                  <Label htmlFor="bankName">Bank Name</Label>
                  <Input
                    id="bankName"
                    placeholder="Bank Name"
                    readOnly={!isEditing}
                    {...register('bankName')}
                  />
                </div>
                <div>
                  <Label htmlFor="accountNumber">Account Number</Label>
                  <Input
                    id="accountNumber"
                    placeholder="Account Number"
                    readOnly={!isEditing}
                    {...register('accountNumber')}
                  />
                </div>
                <div>
                  <Label htmlFor="ifscCode">IFSC Code</Label>
                  <Input
                    id="ifscCode"
                    placeholder="IFSC Code"
                    readOnly={!isEditing}
                    {...register('ifscCode', {
                      pattern: {
                        value: /^[A-Z]{4}0[A-Z0-9]{6}$/,
                        message: 'Invalid IFSC Code',
                      },
                    })}
                  />
                  {errors.ifscCode && <p className="text-red-500">{errors.ifscCode.message}</p>}
                </div>
                <div>
                <Label htmlFor="accountType">Account Type</Label>
                <Select
                      onValueChange={(value) => setValue('accountType', value)}
                      defaultValue={getValues(
                        'accountType'
                      )}
                      readOnly={!isEditing}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="current">Current</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                <div>
                  <Label htmlFor="branchName">Branch Name</Label>
                  <Input
                    id="branchName"
                    placeholder="Branch Name"
                    readOnly={!isEditing}
                    {...register('branchName')}
                  />
                </div>
                <div>
                  <Label htmlFor="gstNumber">GST Number</Label>
                  <Input
                    id="gstNumber"
                    placeholder="GST Number"
                    readOnly={!isEditing}
                    {...register('gstNumber', {
                      pattern: {
                        value: /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
                        message: 'Invalid GST Number',
                      },
                    })}
                  />
                  {errors.gstNumber && <p className="text-red-500">{errors.gstNumber.message}</p>}
                </div>
                <div>
                  <Label htmlFor="panNumber">PAN Number</Label>
                  <Input
                    id="panNumber"
                    placeholder="PAN Number"
                    readOnly={!isEditing}
                    {...register('panNumber', {
                      pattern: {
                        value: /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/,
                        message: 'Invalid PAN Number',
                      },
                    })}
                  />
                  {errors.panNumber && <p className="text-red-500">{errors.panNumber.message}</p>}
                </div>
              </div>
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
    </div>
  );
};

export default Profile;
