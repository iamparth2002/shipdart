import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
// import { toast } from "@/components/ui/use-toast"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Profile({}) {
  const [profile, setProfile] = useState({
    id: 'ADM001',
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '9868173632',
  });

  const [editedUser, setEditedUser] = useState(null);
  const [IsEditing, setIsEditing] = useState(false);

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setEditedUser((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleSave = () => {
  //   onSave(editedUser);
  //   onClose();
  // };

  // const handleInputChange = (e) => {
  //   const { name, value } = e.target;
  //   setProfile((prev) => ({ ...prev, [name]: value }));
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsEditing(false);
    // toast({
    //   title: "Profile Updated",
    //   description: "Your profile has been successfully updated.",
    // })
  };
  // const handleEdit = () => {
  //   setIsEditing(true);
  // };

  return (
    <DialogContent className="bg-white rounded-3xl shadow px-4">
      <DialogHeader>
        <DialogTitle>Edit User Details</DialogTitle>
      </DialogHeader>
      <Card className="w-full p-0  max-w-2xl mx-auto border-none shadow-none">
        <CardHeader>
          <CardTitle>Admin Profile</CardTitle>
        </CardHeader>
        <CardContent>
          <div  className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="id">Admin ID</Label>
                <Input id="id" value={profile.id} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={profile.name} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" value={profile.email} disabled />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <Input id="phone" type="tel" value={profile.phone} />
              </div>
            </div>

            
          </div>
          <div className="flex justify-end gap-2 mt-8 -mb-6">
              <Button className="border-none" variant="outline">
                Cancel
              </Button>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white rounded-[10px]"
                // onClick={handleSave}
              >
                Save Details
              </Button>
            </div>
        </CardContent>
      </Card>
    </DialogContent>
  );
}
