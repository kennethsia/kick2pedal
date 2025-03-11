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

interface Registration {
  id: number;
  documentId: string;
  registration_status: string;
  createdAt: string;
  amount: number;
  user: {
    firstName: string;
    lastName: string;
    email: string;
  };
  event: {
    title: string;
  };
  category: {
    name: string;
  };
  additional_category_1?: {
    name: string;
  };
  additional_category_2?: {
    name: string;
  };
  proofOfPayment?: { url: string };
}

export function RegistrationList() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const { data } = await api.registration.listAll();
      setRegistrations(data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const downloadCSV = () => {
    // Convert registrations to CSV format
    const csvData = registrations.map((reg) => ({
      'Registration ID': reg.documentId,
      Event: reg.event.title,
      Status: reg.registration_status,
      Date: format(new Date(reg.createdAt), 'yyyy-MM-dd'),
      Name: `${reg.user.firstName} ${reg.user.lastName}`,
      Email: reg.user.email,
      'Primary Category': reg.category.name,
      'Additional Category 1': reg.additional_category_1?.name || '',
      'Additional Category 2': reg.additional_category_2?.name || '',
      Amount: reg.amount,
      'Proof of Payment': reg?.proofOfPayment?.url,
    }));

    // Create CSV string
    const headers = Object.keys(csvData[0]);
    const csvString = [
      headers.join(','),
      ...csvData.map((row) =>
        headers
          .map((header) => `"${row[header as keyof typeof row]}"`)
          .join(','),
      ),
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `registrations-${format(new Date(), 'yyyy-MM-dd')}.csv`,
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  console.log(registrations);

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
            {/* <TableHead>ID</TableHead> */}
            <TableHead>Event</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category 1</TableHead>
            <TableHead>Category 2</TableHead>
            <TableHead>Category 3</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Proof of payent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.map((registration) => (
            <TableRow key={registration.id}>
              {/* <TableCell>{registration.documentId}</TableCell> */}
              <TableCell>{registration.event.title}</TableCell>
              <TableCell>
                {registration.user.firstName} {registration.user.lastName}
              </TableCell>
              <TableCell>{registration.category.name}</TableCell>
              <TableCell>{registration?.additional_category_1?.name}</TableCell>
              <TableCell>{registration?.additional_category_2?.name}</TableCell>
              <TableCell>{registration.registration_status}</TableCell>
              <TableCell>₱{registration.amount?.toLocaleString()}</TableCell>
              <TableCell>
                {format(new Date(registration.createdAt), 'MMM d, yyyy')}
              </TableCell>
              <TableCell>
                <a
                  href={registration?.proofOfPayment?.url}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  View file
                </a>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
