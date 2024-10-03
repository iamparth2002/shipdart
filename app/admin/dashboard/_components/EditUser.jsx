'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EditUser = ({ user, onClose, onSave }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    defaultValues: {
      _id: user._id,
      name: user.name.trim(),
      email: user.email,
      phone: user.phone,
    },
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setValue('name', user.name.trim());
    setValue('email', user.email);
    setValue('phone', user.phone);
  }, [user, setValue]);

  const handleSave = async (data) => {
    setLoading(true);
    await onSave({ userId: user.userId, _id: user._id, ...data });
    setLoading(false);
  };

  return (
    <DialogContent className="bg-white rounded-3xl shadow px-4">
      <DialogHeader>
        <DialogTitle>Edit User Details</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(handleSave)}>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              {...register('name', {
                required: 'Name is required',
                setValueAs: (value) => value.trim(),
              })}
              className="col-span-3"
            />
            {errors.name && (
              <p className="col-span-4 text-right text-red-500 text-sm">
                {errors.name.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: 'Enter a valid email address',
                },
              })}
              className="col-span-3"
            />
            {errors.email && (
              <p className="col-span-4 text-right text-red-500 text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Phone No
            </Label>
            <Input
              id="phone"
              {...register('phone', {
                required: 'Phone number is required',
                pattern: {
                  value: /^\d{10}$/,
                  message: 'Phone number must be 10 digits',
                },
              })}
              className="col-span-3"
            />
            {errors.phone && (
              <p className="col-span-4 text-right text-red-500 text-sm">
                {errors.phone.message}
              </p>
            )}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button
            type="button"
            className="border-none"
            variant="outline"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white rounded-[10px]"
            disabled={loading}
          >
            {loading ? 'Saving...' : 'Save Details'}
          </Button>
        </div>
      </form>
    </DialogContent>
  );
};

export default EditUser;
