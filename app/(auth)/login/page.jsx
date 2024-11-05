'use client';

import { useEffect, useState } from 'react';
import { set, useForm } from 'react-hook-form';
import { Eye, EyeOff, Github, Loader2, Ship, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/utils/axios';
import Cookies from 'js-cookie';

export default function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post('/users/login', {
        email: data.email,
        password: data.password,
      });

      

      if (response.status == 200 && response.data) {
        const { role, token } = response.data;

        console.log({ role, token });
        Cookies.set('token', token, { expires: 1 / 24 }); // 1-hour expiration

        if (role === 'user') {
          router.push('/user/dashboard');
        } else if (role === 'admin') {
          router.push('/admin/dashboard');
        } else if (role === 'superadmin') {
          router.push('/superadmin/dashboard');
        } else if (role === 'support') {
          router.push('/support/dashboard');
        }
      }
    } catch (error) {
      console.error(
        'Login failed:',
        error.response ? error.response.data : error
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{

  },[])

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-cyan-500 to-blue-500  flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center space-x-2">
            <Ship className="h-6 w-6" />
            <CardTitle
              className="text-2xl font-bold"
              onClick={() => router.push('/')}
            >
              ShipDart
            </CardTitle>
          </div>
          <p className="text-center text-sm text-muted-foreground">
            Log in to your account and manage your shipments
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: 'Invalid email address',
                  },
                })}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                />
                <Button
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                  type="button"
                  variant="ghost"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-500" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-500" />
                  )}
                  <span className="sr-only">
                    {showPassword ? 'Hide password' : 'Show password'}
                  </span>
                </Button>
              </div>
              {errors.password && (
                <p className="text-sm text-red-500">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button className="w-full" type="submit" variant="default">
              {loading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                'Login'
              )}
            </Button>
          </form>

          <div className="mt-4 text-center text-sm">
            Don't have an account?{' '}
            <Link href="/signup" className="underline">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
