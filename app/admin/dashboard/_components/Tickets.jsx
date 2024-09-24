'use client'
import React, { useState } from 'react'
import { ChevronLeft } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const Tickets = () => {

const [selectedTicket,setSelectedTicket] = useState(null)
const tickets= [
    { id: 'T001', customer: 'John Doe', issue: 'Login problem', status: 'Open', assignedTo: 'Sarah', priority: 'Medium', createdAt: '2023-06-10', lastUpdated: '2023-06-11' },
    { id: 'T002', customer: 'Jane Smith', issue: 'Payment failed', status: 'In Progress', assignedTo: 'Mike', priority: 'High', createdAt: '2023-06-09', lastUpdated: '2023-06-12' },
    { id: 'T003', customer: 'Bob Johnson', issue: 'Account deactivation', status: 'Closed', assignedTo: 'Emily', priority: 'Low', createdAt: '2023-06-08', lastUpdated: '2023-06-10' },
  ]

  
  const handleTicketClick = (ticket) => {
    setSelectedTicket(ticket)
  }

  const handleBackClick = () => {
    setSelectedTicket(null)
  }
  const getStatusColor = (status) => {
    switch (status) {
      case 'Open':
        return 'bg-yellow-500 text-yellow-50'
      case 'In Progress':
        return 'bg-blue-500 text-blue-50'
      case 'Closed':
        return 'bg-green-500 text-green-50'
    }
  }

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'Low':
        return 'bg-gray-500 text-gray-50'
      case 'Medium':
        return 'bg-yellow-500 text-yellow-50'
      case 'High':
        return 'bg-red-500 text-red-50'
    }
  }

  if (selectedTicket) {
    return (
        <Card className="bg-white">
        <CardHeader>
          <div className="flex items-center">
            <Button variant="ghost" size="icon" onClick={handleBackClick} className="mr-2 bg-gray-100 rounded-xl hover:cursor-pointer hover:bg-gray-200">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle>Ticket Details</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 ml-2">
            <div className="flex gap-4 max-md:justify-between items-center">
              <h3 className="text-lg font-semibold">Ticket {selectedTicket.id}</h3>
              <Badge className={`${getStatusColor(selectedTicket.status)} rounded-3xl`}>{selectedTicket.status}</Badge>
            </div>
            <div className="space-y-2">
              <p><strong>Customer:</strong> {selectedTicket.customer}</p>
              <p><strong>Issue:</strong> {selectedTicket.issue}</p>
              <p><strong>Assigned To:</strong> {selectedTicket.assignedTo}</p>
              {/* <p><strong>Priority:</strong> <Badge className={getPriorityColor(selectedTicket.priority)}>{selectedTicket.priority}</Badge></p> */}
              <p><strong>Created At:</strong> {selectedTicket.createdAt}</p>
              <p><strong>Last Updated:</strong> {selectedTicket.lastUpdated}</p>
            </div>
            {/* <div className="mt-4">
              <Button className="text-white rounded-full">Update Ticket</Button>
            </div> */}
          </div>
        </CardContent>
      </Card>
    )
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
          <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hidden sm:block">
            Assigned To
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 bg-white">
        {tickets.map((ticket) => (
          <tr
            key={ticket.id}
            className="hover:bg-gray-100 hover:cursor-pointer rounded-xl"
            onClick={() => handleTicketClick(ticket)}
          >
            <td className="whitespace-nowrap px-2 py-4">{ticket.id}</td>
            <td className="whitespace-nowrap px-2 py-4">{ticket.customer}</td>
            <td className="px-2 py-4 hidden sm:block">{ticket.issue}</td>
            <td className="whitespace-nowrap px-2 py-4">
              <Badge className={`${getStatusColor(ticket.status)} rounded-3xl`}>
                {ticket.status}
              </Badge>
            </td>
            <td className="whitespace-nowrap px-2 py-4 hidden sm:block">
              {ticket.assignedTo}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  
  );
};

export default Tickets;
