
'use client'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EditUser = ({ user, onSave, onClose }) => {
    const [editedUser, setEditedUser] = useState(user);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setEditedUser((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleSave = () => {
      onSave(editedUser);
      onClose();
    };
  
    return (
      <DialogContent className="bg-white rounded-3xl shadow px-4">
        <DialogHeader >
          <DialogTitle >Edit User Details</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              value={editedUser.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              value={editedUser.email}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phoneNo" className="text-right">
              Phone No
            </Label>
            <Input
              id="phoneNo"
              name="phoneNo"
              value={editedUser.phoneNo}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button className="border-none" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button className="bg-green-500 hover:bg-green-600 text-white rounded-[10px]" onClick={handleSave}>Save Details</Button>
        </div>
      </DialogContent>
    );
}

export default EditUser