'use client';

import React, { useEffect, useState } from 'react';
import {  ChevronLeft } from 'lucide-react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axiosInstance from '@/utils/axios';
import { Badge } from '@/components/ui/badge';

const SupportTicket = () => {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get('/ticket/all');
      setTickets(response.data);
    } catch (err) {
      setError('Failed to load tickets.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket);
  };

  const handleBackClick = () => {
    setSelectedTicket(null);
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'open':
        return 'bg-yellow-500 text-white';
      case 'in-progress':
        return 'bg-blue-500 text-white';
      case 'resolved':
        return 'bg-green-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const updateTicketStatus = async (ticketId, newStatus) => {
    try {
      await axiosInstance.put(`/ticket/${ticketId}/status`, { status: newStatus });
      if (selectedTicket && selectedTicket.ticketId === ticketId) {
        setSelectedTicket({ ...selectedTicket, status: newStatus });
      }
      setTickets(tickets.map(ticket => 
        ticket._id === ticketId ? { ...ticket, status: newStatus } : ticket
      ));
    } catch (err) {
      console.error('Failed to update ticket status:', err);
    }
  };

  const StatusDropdown = ({ ticketId, currentStatus }) => (
    <Select
      defaultValue={currentStatus}
      onValueChange={(value) => updateTicketStatus(ticketId, value)}
    >
      <SelectTrigger className={`w-[120px] ${getStatusColor(currentStatus)}`}>
        <SelectValue placeholder="Status" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="open">Open</SelectItem>
        <SelectItem value="in-progress">In Progress</SelectItem>
        <SelectItem value="resolved">Resolved</SelectItem>
      </SelectContent>
    </Select>
  );

  if (loading) {
    return <div className="text-center p-6">Loading tickets...</div>;
  }

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
                className={`${getStatusColor(selectedTicket.status)} text-white rounded-3xl`}
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
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 bg-white">
          {tickets.map((ticket) => (
            <tr
              key={ticket.id}
              className="hover:bg-gray-100 rounded-xl"
            >
              <td className="px-2 py-4 cursor-pointer" onClick={() => handleTicketClick(ticket)}>{ticket.ticketId}</td>
              <td className="whitespace-nowrap px-2 py-4 cursor-pointer" onClick={() => handleTicketClick(ticket)}>{ticket.userId.name}</td>
              <td className="px-2 py-4 hidden sm:block cursor-pointer" onClick={() => handleTicketClick(ticket)}>{ticket.subject}</td>
              <td className="whitespace-nowrap px-2 py-4">
                <StatusDropdown ticketId={ticket._id} currentStatus={ticket.status} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupportTicket;