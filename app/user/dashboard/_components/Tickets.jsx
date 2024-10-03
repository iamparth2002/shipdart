import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import axiosInstance from '@/utils/axios';
import { Badge } from '@/components/ui/badge';

const Tickets = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm({
    mode: 'onChange', // Revalidate on input change
  });

  const [loading, setLoading] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [ticketLoading, setTicketLoading] = useState(true);
  const [ticketError, setTicketError] = useState(null);

  const fetchTickets = async () => {
    setTicketLoading(true);
    try {
      const response = await axiosInstance.get('/ticket');
      setTickets(response.data); // Assuming response contains an array of tickets
    } catch (error) {
      setTicketError('Error fetching tickets');
    } finally {
      setTicketLoading(false);
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);

    try {
      // Make the API call to submit the ticket
      const response = await axiosInstance.post('/ticket/create', {
        subject: data.subject,
        message: data.description,
      });

      console.log('Ticket created successfully:', response.data);
      alert('Ticket submitted successfully');
      fetchTickets();
      reset();
    } catch (error) {
      console.log('Error submitting ticket:', error);
      alert('Failed to submit the ticket');
    } finally {
      setLoading(false);
    }
  };

  // Fetch ticket history from the API
  useEffect(() => {
    

    fetchTickets();
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Ticket System</h2>

      {/* Form to create a new ticket */}
      <Card>
        <CardHeader>
          <CardTitle>Create New Ticket</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                placeholder="Enter ticket subject"
                {...register('subject', { required: 'Subject is required' })}
              />
              {errors.subject && (
                <p className="text-red-500">{errors.subject.message}</p>
              )}
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <textarea
                id="description"
                className="w-full p-2 border rounded"
                rows={4}
                placeholder="Describe your issue"
                {...register('description', {
                  required: 'Description is required',
                  minLength: {
                    value: 10,
                    message: 'Description must be at least 10 characters long',
                  },
                })}
              ></textarea>
              {errors.description && (
                <p className="text-red-500">{errors.description.message}</p>
              )}
            </div>

            <Button
              type="submit"
              disabled={!isValid || loading} // Disable if form is invalid or while loading
            >
              {loading ? 'Submitting...' : 'Submit Ticket'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Ticket history section */}
      <Card>
        <CardHeader>
          <CardTitle>Ticket History</CardTitle>
        </CardHeader>
        <CardContent>
          {ticketLoading ? (
            <p>Loading tickets...</p>
          ) : ticketError ? (
            <p className="text-red-500">{ticketError}</p>
          ) : tickets.length > 0 ? (
            tickets.map((ticket) => (
              <TicketCard key={ticket._id} {...ticket} />
            ))
          ) : (
            <p>No tickets found.</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

const TicketCard = ({ subject, description, status, createdAt }) => {
  const statusColor = {
    open: 'bg-yellow-500',
    'in-progress': 'bg-blue-500',
    closed: 'bg-green-500',
  };

  return (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold">{subject}</h3>
          <Badge className={`${statusColor[status]} text-white`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        <p className="text-sm text-gray-600 mb-2">{description}</p>
        <p className="text-xs text-gray-400">
          Created on: {new Date(createdAt).toLocaleString()}
        </p>
      </CardContent>
    </Card>
  );
};

export default Tickets;
