import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { UsersTable } from '../users-table';

export default function UsersPage(
  props: {
    searchParams: Promise<{ q: string; offset: string }>;
  }
) {

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