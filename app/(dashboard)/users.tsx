import React, { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { TableCell, TableRow } from '@/components/ui/table';
import { SelectUser } from '@/lib/db';

export function Users({ user }: { user: SelectUser }) {
  const [selectedRole, setSelectedRole] = useState<string>('Select');

  const handleConfirm = async () => {
    const confirmed = window.confirm(`Are you sure you want to assign the role "${selectedRole}" to ${user.name}?`);
    // if (confirmed) {
    //   // send request to backend
    //   await fetch('/api/assign-role', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({
    //       userId: user.id,
    //       role: selectedRole,
    //     }),
    //   });
    // }
  };

  return (
    <TableRow>
      <TableCell className="font-medium">{user.name}</TableCell>
      <TableCell className="hidden md:table-cell">{user.emailid}</TableCell>
      {user.status != "Approved" && (
        <TableCell className="hidden md:table-cell">
          {user.requestedOn ? user.requestedOn.toLocaleDateString("en-US") : ''}
        </TableCell>
      )}
      {user.status != "Approved" && (
        <TableCell className="hidden md:table-cell">
          <Badge variant="outline" className="capitalize">
            {user.status}
          </Badge>
        </TableCell>
      )}
      <TableCell >
        {user.status != "Approved" ?
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary">{selectedRole}</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Role</DropdownMenuLabel>
              <DropdownMenuItem onClick={() => setSelectedRole('Admin')}>Admin</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSelectedRole('Professor')}>Professor</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          :
          <Badge variant="outline" className="capitalize">
            {user.appointedAs}
          </Badge>
        }
      </TableCell>
      {user.status != "Approved" && (
        <TableCell>
          <Button
            variant="default"
            className="font-normal"
            onClick={handleConfirm}
          >
            Confirm
          </Button>
        </TableCell>)}
    </TableRow>
  );
}