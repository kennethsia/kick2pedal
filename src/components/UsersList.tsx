'use client';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { api } from '@/lib/apiClient';
import { format } from 'date-fns';
import { Download } from 'lucide-react';
import { useEffect, useState } from 'react';

interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  birthGender: string;
  dateOfBirth: string;
  contactNumber: string;
  parentFullName: string;
  teamName: string;
  riderType: string;
  foreignCountry: string;
  createdAt: string;
  identificationDocument: {
    url: string;
  };
}

export function UsersList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await api.user.listAll();
      console.log(response);
      setUsers(response);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(users);

  const downloadCSV = () => {
    const csvData = users.map((user) => ({
      'User ID': user.documentId,
      Username: user.username,
      Email: user.email,
      'First Name': user.firstName || '',
      'Last Name': user.lastName || '',
      'Birth Gender': user.birthGender || '',
      'Date of Birth': user.dateOfBirth
        ? format(new Date(user.dateOfBirth), 'yyyy-MM-dd')
        : '',
      'Contact Number': user.contactNumber || '',
      'Parent/Guardian': user.parentFullName || '',
      'Team Name': user.teamName || '',
      'Rider Type': user.riderType || '',
      Country: user.foreignCountry || '',
      'Registration Date': format(
        new Date(user.createdAt),
        'yyyy-MM-dd HH:mm:ss',
      ),
      'Identification document': user?.identificationDocument?.url || '',
    }));

    const headers = Object.keys(csvData[0]);
    const csvString = [
      headers.join(','),
      ...csvData.map((row) =>
        headers
          .map((header) => `"${row[header as keyof typeof row]}"`)
          .join(','),
      ),
    ].join('\n');

    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `users-${format(new Date(), 'yyyy-MM-dd')}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button onClick={downloadCSV} className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Username</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>DoB</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Parent Name</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Rider Type</TableHead>
            <TableHead>Joined</TableHead>
            <TableHead>Identification Document</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.username}</TableCell>
              <TableCell>
                {user.firstName} {user.lastName}
              </TableCell>
              <TableCell>
                {format(new Date(user.dateOfBirth), 'MMM d, yyyy')}
              </TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.contactNumber}</TableCell>
              <TableCell>{user.parentFullName}</TableCell>
              <TableCell>{user.teamName}</TableCell>
              <TableCell>{user.riderType}</TableCell>
              <TableCell>
                {format(new Date(user.createdAt), 'MMM d, yyyy h:mm a')}
              </TableCell>
              <TableCell>
                {user?.identificationDocument?.url && (
                  <a
                    href={user?.identificationDocument?.url}
                    target="_blank"
                    className="text-blue-600 hover:text-blue-800 underline"
                  >
                    View file
                  </a>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
