'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useRouter, usePathname } from 'next/navigation';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import React from 'react';
import axios from 'axios';

export default function AuthPage() {
    const router = useRouter();
    const pathname = usePathname(); // Get the current route
    const isLogin = pathname === '/login'; // Check if the current route is /login

    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [email, setEmail] = React.useState<string>('');
    const [name, setName] = React.useState<string>('');
    const [role, setRole] = React.useState<string>('admin'); // Default role is admin
    const [showPassword, setShowPassword] = React.useState<boolean>(false); // Toggle password visibility

    const handleTabChange = (value: string) => {
        if (value === 'login') {
            router.push('/login'); // Navigate to /login
        } else if (value === 'signup') {
            router.push('/signup'); // Navigate to /signup
        }
    };

    async function handleLogin() {
        try {
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_BASE_URL}/auth/login`,
                {}, // No body, as we're sending data in headers
                {
                    headers: {
                        username,
                        password
                    },
                    withCredentials: true // Include credentials in the request
                }
            );

            if (response.status !== 200) {
                throw new Error('Login failed');
            }

            console.log('Login successful:', response.data);
            router.push('/'); // Redirect to base URL on successful login
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                console.error('Error during login:', error.response.data); // Log server error details
                alert(`Login failed: ${error.response.data.error || 'Please try again.'}`);
            } else {
                console.error('Error during login:', error);
                alert('Login failed. Please try again.');
            }
        }
    }

    async function handleSignup() {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_BASE_URL}/auth/signup`, {}, {
                headers: {
                    username,
                    name,
                    password,
                    role,
                    email
                }
            });

            if (response.status !== 201) {
                throw new Error('Signup failed');
            }

            console.log('Signup successful:', response.data);
            router.push('/login'); // Redirect to /login on successful signup
        } catch (error) {
            console.error('Error during signup:', error);
            alert('Signup failed. Please try again.');
        }
    }

    const isSignupDisabled = !email || !password || !username || !name || !role;
    const isLoginDisabled = !username || !password;

    return (
        <div className="min-h-screen flex justify-center items-start md:items-center p-8">
            <Tabs
                defaultValue={isLogin ? 'login' : 'signup'}
                className="w-full max-w-sm"
                onValueChange={handleTabChange} // Handle tab change
            >
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="login">Login</TabsTrigger>
                    <TabsTrigger value="signup">Signup</TabsTrigger>
                </TabsList>
                <TabsContent value="login" asChild>
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">Login</CardTitle>
                            <CardDescription>Enter your credentials to log in.</CardDescription>
                        </CardHeader>
                        <div className="grid gap-6 px-4 py-4">
                            <div className="grid gap-3">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    required
                                />
                            </div>
                            <div className="grid gap-3 relative">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-9 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            <Button
                                type="button"
                                className="w-full"
                                onClick={handleLogin}
                                disabled={isLoginDisabled}
                            >
                                Login
                            </Button>
                        </div>
                    </Card>
                </TabsContent>
                <TabsContent value="signup" asChild>
                    <Card className="w-full max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">Signup</CardTitle>
                            <CardDescription>Create an account to get started.</CardDescription>
                        </CardHeader>
                        <div className="grid gap-6 px-4 py-4">
                            <div className="grid gap-3">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    placeholder="Enter your name"
                                    onChange={(e) => setName(e.target.value)}
                                    value={name}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    type="text"
                                    placeholder="Enter your username"
                                    onChange={(e) => setUsername(e.target.value)}
                                    value={username}
                                    required
                                />
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                />
                            </div>
                            <div className="grid gap-3 relative">
                                <Label htmlFor="password">Password</Label>
                                <Input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter your password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    required
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-9 text-gray-500"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                            <div className="grid gap-3">
                                <Label htmlFor="role">Role</Label>
                                <select
                                    id="role"
                                    className="border rounded-md p-2"
                                    onChange={(e) => setRole(e.target.value)}
                                    value={role}
                                >
                                    <option value="admin">Admin</option>
                                    <option value="professor">Professor</option>
                                </select>
                            </div>
                            <Button
                                type="button"
                                className="w-full"
                                onClick={handleSignup}
                                disabled={isSignupDisabled}
                            >
                                Signup
                            </Button>
                        </div>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}