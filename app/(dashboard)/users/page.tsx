'use client';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { UsersTable } from '../users-table';
import axios from 'axios';
import { useEffect, useState } from 'react';

export default function UsersPage(

  
  
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {
  //fetching list of users forom backend
  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_BASE_URL}/admin/users/list`);
      const data = await response.data;
      console.log(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);
  
  const users: {
    id: number;
    name: string;
    emailid: string;
    requestedOn: Date;
    appointedAs: string;
    status: "Approved" | "Not_Approved";
  }[] = [
      {
        id: 1,
        name: 'Avishek Adhikary',
        emailid: 'email@id.com',
        requestedOn: new Date('2025-04-01'),
        appointedAs: 'Professor',
        status: 'Not_Approved',
      },
    ];

    const approvedUsers: {
      id: number;
      name: string;
      emailid: string;
      requestedOn: Date;
      status: "Approved" | "Not_Approved" | null;
      appointedAs: string;
    }[] = [
      {
        id: 1,
        name: 'Nikhil Kamalnath',
        emailid: 'email@id.com',
        requestedOn: new Date(), // or any valid Date
        status: "Approved",
        appointedAs: 'Admin',
      },
    ];
  const newOffset = 0;
  const totalUsers = users.length;

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
      </Card>
      <UsersTable
        users={users}
        offset={newOffset ?? 0}
        totalUsers={totalUsers}
      />
      <UsersTable
        users={approvedUsers}
        offset={newOffset ?? 0}
        totalUsers={totalUsers}
      />
    </>
  );
}