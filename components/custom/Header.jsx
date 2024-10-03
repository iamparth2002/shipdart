'use client';

import React, { useState } from 'react';
import { ChevronDown, CircleUserRound, Menu, UserRound, X } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { User, Settings, HelpCircle, LogOut } from 'lucide-react';
import { Button } from '../ui/button';
import { Dialog } from '@/components/ui/dialog';
import EditUser from '@/app/admin/dashboard/_components/EditUser';
import Profile from '@/app/admin/dashboard/_components/Profile';
import { handleLogout } from '@/utils/helpers';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Header = ({ type, toggleSidebar, activeTab }) => {
  const router = useRouter()
  const [editingUser, setEditingUser] = useState(null);

  const handleEdit = (user) => {
    setEditingUser(true);
  };
  const handleLogout = () => {
    Cookies.remove('token');
  
    router.push('/login');
  };
  return (
    <header className="flex items-center justify-between bg-white p-4 shadow">
      <button onClick={toggleSidebar} className="text-gray-500 lg:hidden">
        <Menu className="h-6 w-6" />
      </button>
      <h1 className="text-xl font-semibold">{activeTab}</h1>
      <div className="flex items-center">
        <div className="relative">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="bg-gray-100  hover:bg-gray-200 flex gap-2 items-center"
              >
                <CircleUserRound size={20} />
                Profile
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              {/* <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-xs leading-none text-muted-foreground">
                    {'neenaparth@gmail.com'}
                  </p>
                </div>
              </DropdownMenuLabel> */}
              {/* <DropdownMenuSeparator /> */}
              <DropdownMenuItem onClick={() => handleEdit()}>
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
              </DropdownMenuItem>

              <DropdownMenuSeparator className="my-2" />
              <DropdownMenuItem>
                <LogOut className="mr-2 h-4 w-4" />
                <span onClick={() => {handleLogout()}}>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog
        className="px-2"
        open={!!editingUser}
        onOpenChange={() => setEditingUser(null)}
      >
        {editingUser && (
          <Profile
            type={type}
            user={editingUser}
            onClose={() => setEditingUser(null)}
          />
        )}
      </Dialog>
    </header>
  );
};

export default Header;
