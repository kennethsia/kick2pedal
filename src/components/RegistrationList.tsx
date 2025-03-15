'use client';

import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { api } from '@/lib/apiClient';
import { differenceInMonths, differenceInYears, format } from 'date-fns';
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
    username: string;
    birthGender: string;
    contactNumber: string;
    dateOfBirth: string;
    foreignCountry: string;
    parentFullName: string;
    riderType: string;
    teamName: string;
  };
  event: {
    title: string;
    id: number;
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

interface Event {
  id: number;
  title: string;
}

export function RegistrationList() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [allRegistrations, setAllRegistrations] = useState<Registration[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRegistrations();
    extractEventsFromRegistrations();
  }, []);

  const fetchRegistrations = async () => {
    try {
      const { data } = await api.registration.listAll();
      setRegistrations(data);
      setAllRegistrations(data);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Fallback method to extract unique events from registrations
  const extractEventsFromRegistrations = () => {
    if (allRegistrations.length > 0) {
      const uniqueEvents: Event[] = [];
      const eventIds = new Set();

      allRegistrations.forEach((reg) => {
        if (!eventIds.has(reg.event.id)) {
          eventIds.add(reg.event.id);
          uniqueEvents.push({ id: reg.event.id, title: reg.event.title });
        }
      });

      setEvents(uniqueEvents);
    }
  };

  useEffect(() => {
    // If no events were fetched from the API, try to extract them from registrations
    if (events.length === 0 && allRegistrations.length > 0) {
      extractEventsFromRegistrations();
    }
  }, [allRegistrations]);

  useEffect(() => {
    filterRegistrations();
  }, [selectedEvent, allRegistrations]);

  const filterRegistrations = () => {
    if (selectedEvent === 'all') {
      setRegistrations(allRegistrations);
    } else {
      const filtered = allRegistrations.filter(
        (reg) => reg.event.id.toString() === selectedEvent,
      );
      setRegistrations(filtered);
    }
  };

  const handleEventChange = (value: string) => {
    setSelectedEvent(value);
  };

  // Calculate age in the format X.Y where X is years and Y is months
  const calculateAge = (dateOfBirth: string) => {
    const dob = new Date(dateOfBirth);
    const now = new Date();

    const years = differenceInYears(now, dob);

    // Calculate total months then subtract the years already counted
    const totalMonths = differenceInMonths(now, dob);
    const remainingMonths = totalMonths % 12;

    // Format as X.Y where X is years and Y is months
    return `${years}.${remainingMonths}`;
  };

  const downloadCSV = () => {
    // Convert registrations to CSV format
    const csvData = registrations.map((reg) => ({
      'Registration ID': reg.documentId,
      Event: reg.event.title,
      Status: reg.registration_status,
      Date: format(new Date(reg.createdAt), 'yyyy-MM-dd HH:mm:ss'),
      Name: `${reg.user.firstName} ${reg.user.lastName}`,
      Username: reg.user.username || '',
      Email: reg.user.email,
      'Birth Gender': reg.user.birthGender || '',
      'Contact Number': reg.user.contactNumber || '',
      'Parent/Guardian': reg.user.parentFullName || '',
      'Team Name': reg.user.teamName || '',
      'Rider Type': reg.user.riderType || '',
      Country: reg.user.foreignCountry || '',
      'Date of Birth': reg.user.dateOfBirth
        ? format(new Date(reg.user.dateOfBirth), 'yyyy-MM-dd')
        : '',
      Age: reg.user.dateOfBirth ? calculateAge(reg.user.dateOfBirth) : '',
      'Primary Category': reg.category.name,
      'Additional Category 1': reg.additional_category_1?.name || '',
      'Additional Category 2': reg.additional_category_2?.name || '',
      Amount: reg.amount,
      'Proof of Payment': reg?.proofOfPayment?.url || '',
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

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Select value={selectedEvent} onValueChange={handleEventChange}>
            <SelectTrigger className="w-[250px]">
              <SelectValue placeholder="Filter by Event" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Events</SelectItem>
              {events.map((event) => (
                <SelectItem key={event.id} value={event.id.toString()}>
                  {event.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
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
            <TableHead>DoB</TableHead>
            <TableHead>Age</TableHead>
            <TableHead>Category 1</TableHead>
            <TableHead>Category 2</TableHead>
            <TableHead>Category 3</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Proof of payment</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {registrations.length === 0 ? (
            <TableRow>
              <TableCell colSpan={11} className="text-center py-4">
                No registrations found for the selected event.
              </TableCell>
            </TableRow>
          ) : (
            registrations.map((registration) => (
              <TableRow key={registration.id}>
                {/* <TableCell>{registration.documentId}</TableCell> */}
                <TableCell>{registration.event.title}</TableCell>
                <TableCell>
                  {registration.user.firstName} {registration.user.lastName}
                </TableCell>
                <TableCell>
                  {format(
                    new Date(registration.user.dateOfBirth),
                    'MMM d, yyyy',
                  )}
                </TableCell>
                <TableCell>
                  {calculateAge(registration.user.dateOfBirth)}
                </TableCell>
                <TableCell>{registration.category.name}</TableCell>
                <TableCell>
                  {registration?.additional_category_1?.name}
                </TableCell>
                <TableCell>
                  {registration?.additional_category_2?.name}
                </TableCell>
                <TableCell>{registration.registration_status}</TableCell>
                <TableCell>₱{registration.amount?.toLocaleString()}</TableCell>
                <TableCell>
                  {format(
                    new Date(registration.createdAt),
                    'MMM d, yyyy h:mm a',
                  )}
                </TableCell>
                <TableCell>
                  {registration?.proofOfPayment?.url ? (
                    <a
                      href={registration.proofOfPayment.url}
                      target="_blank"
                      className="text-blue-600 hover:text-blue-800 underline"
                    >
                      View file
                    </a>
                  ) : (
                    <span className="text-gray-400">No file</span>
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
