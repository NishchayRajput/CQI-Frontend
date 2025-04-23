'use client';

import {
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  Table
} from '@/components/ui/table';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Users } from './users';
import { SelectUser } from '@/lib/db';
import { useRouter } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';


export function UsersTable({
  users,
  offset,
  totalUsers,
  hideColumns = [],
}: {
  users: SelectUser[];
  offset: number;
  totalUsers: number;
  hideColumns?: string[];
}) {
  let router = useRouter();
  let usersPerPage = 5;

  function prevPage() {
    router.back();
  }

  function nextPage() {
    router.push(`/?offset=${offset}`, { scroll: false });
  }

  return (
    <Card>
    <CardHeader>
      <CardDescription>
        Manage your users and view their sales performance.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden md:table-cell">Name</TableHead>
            <TableHead>Email</TableHead>
            {users[0].status!="Approved" && (
              <TableHead>Requested On</TableHead>
            )}
            {users[0].status!="Approved" && (
              <TableHead className="hidden md:table-cell">Status</TableHead>
            )}
            <TableHead className="hidden md:table-cell">
              Role
            </TableHead>
            <TableHead className="hidden md:table-cell" />
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <Users key={user.id} user={user} />
          ))}
        </TableBody>
      </Table>
    </CardContent>
      <CardFooter>
        <form className="flex items-center w-full justify-between">
          <div className="text-xs text-muted-foreground">
            Showing{' '}
            <strong>
              {Math.max(0, Math.min(offset - usersPerPage, totalUsers) + 1)}-{offset}
            </strong>{' '}
            of <strong>{totalUsers}</strong> users
          </div>
          <div className="flex">
            <Button
              formAction={prevPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset === usersPerPage}
            >
              <ChevronLeft className="mr-2 h-4 w-4" />
              Prev
            </Button>
            <Button
              formAction={nextPage}
              variant="ghost"
              size="sm"
              type="submit"
              disabled={offset + usersPerPage > totalUsers}
            >
              Next
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
