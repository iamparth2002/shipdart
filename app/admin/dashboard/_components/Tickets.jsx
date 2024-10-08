'use client';
import React, { useEffect, useState } from 'react';
import { ChevronLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import axiosInstance from '@/utils/axios';

const Tickets = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch tickets from API
  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/ticket/all'); // Adjust the API endpoint as needed
      setTickets(response.data);
    } catch (err) {
      setError('Failed to load tickets.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets(); // Fetch tickets on component mount
  }, []);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleBackClick = () => {
    setSelectedTicket(null);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-yellow-500 text-yellow-50';
      case 'in-progress':
        return 'bg-blue-500 text-blue-50';
      case 'resolved':
        return 'bg-green-500 text-green-50';
      default:
        return '';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return 'bg-gray-500 text-gray-50';
      case 'Medium':
        return 'bg-yellow-500 text-yellow-50';
      case 'High':
        return 'bg-red-500 text-red-50';
      default:
        return '';
    }
  };

  // Display loading indicator
  if (loading) {
    return <div className="text-center p-6">Loading tickets...</div>;
  }

  // Display error message
  if (error) {
    return <div className="text-center p-6 text-red-500">{error}</div>;
  }

  if (selectedTicket) {
    return (
      <Card className="bg-white">
        <CardHeader>
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackClick}
              className="mr-2 bg-gray-100 rounded-xl hover:cursor-pointer hover:bg-gray-200"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle>Ticket Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 ml-2">
            <div className="flex gap-4 max-md:justify-between items-center">
              <h3 className="text-lg font-semibold">
                Ticket {selectedTicket.ticketId}
              </h3>
              <Badge
                className={`${getStatusColor(selectedTicket.status)} rounded-3xl`}
              >
                {selectedTicket.status}
              </Badge>
            </div>
            <div className="space-y-2">
              <p>
                <strong>Customer:</strong> {selectedTicket.userId.name}
              </p>
              <p>
                <strong>Issue:</strong> {selectedTicket.subject}
              </p>
              <p>
                <strong>Description:</strong> {selectedTicket.message}
              </p>
             
              <p>
                <strong>Created At:</strong> {selectedTicket.createdAt}
              </p>
              {/* <p>
                <strong>Last Updated:</strong> {selectedTicket.lastUpdated}
              </p> */}
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="rounded-lg bg-white p-6 shadow overflow-x-auto">
      <h2 className="mb-4 text-xl font-semibold">Ticket Support</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Ticket ID
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Customer
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hidden sm:block">
              Issue
            </th>
            <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
              Status
            </th>
            {/* <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hidden sm:block">
              Assigned To
            </th> */}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="hover:bg-gray-100 hover:cursor-pointer rounded-xl"
              onClick={() => handleTicketClick(ticket)}
            >
              <td className="px-2 py-4">{ticket.ticketId}</td>
              <td className="whitespace-nowrap px-2 py-4">{ticket.userId.name}</td>
              <td className="px-2 py-4 hidden sm:block">{ticket.subject}</td>
              <td className="whitespace-nowrap px-2 py-4">
                <Badge
                  className={`${getStatusColor(ticket.status)} rounded-3xl`}
                >
                  {ticket.status}
                </Badge>
              </td>
              {/* <td className="whitespace-nowrap px-2 py-4 hidden sm:block">
                {ticket.assignedTo}
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Tickets;
