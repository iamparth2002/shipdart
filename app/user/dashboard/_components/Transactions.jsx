'use client'

import { useState, useEffect } from 'react'
import { format } from 'date-fns'
import { Eye, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import axiosInstance from '@/utils/axios'

// Utility function to get badge color based on status
const getStatusColor = (status) => {
  switch (status) {
    case 'approved':
      return 'bg-green-100 text-green-800'
    case 'pending':
      return 'bg-yellow-100 text-yellow-800'
    case 'rejected':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

export default function Transactions() {
  const [transactions, setTransactions] = useState([]); 
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true); 
        const response = await axiosInstance.get('/transactions');
        if (response.status === 200) {
          setTransactions(response.data);
        }
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false); 
      }
    };

    fetchTransactions();
  }, []);

  const handleViewDetails = (transaction) => {
    setSelectedTransaction(transaction);
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Transactions</h2>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>You have {transactions.length} total transactions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center py-6">
                <Loader2 className="animate-spin h-10 w-10 text-gray-500" />
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Order ID</TableHead>
                    <TableHead className="hidden md:table-cell">Amount</TableHead>
                    <TableHead className="hidden md:table-cell">Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction._id}>
                      <TableCell className="font-medium">{transaction.orderId.slice(-6)}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {transaction.currency} {transaction.amount.toFixed(2)}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {format(new Date(transaction.requested_at), 'dd MMM yyyy')}
                      </TableCell>
                      <TableCell>
                        <Badge className={`${getStatusColor(transaction.status)} font-medium`}>
                          {transaction.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button variant="outline" size="sm" onClick={() => handleViewDetails(transaction)}>
                              <Eye className="h-4 w-4 mr-2" />
                              <span className="hidden sm:inline">View</span>
                              <span className="sm:hidden">Details</span>
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                              <DialogTitle>Transaction Details</DialogTitle>
                              <DialogDescription>
                                Full details of the transaction
                              </DialogDescription>
                            </DialogHeader>
                            {selectedTransaction && (
                              <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="font-bold">Order ID:</span>
                                  <span className="col-span-3">{selectedTransaction.orderId}</span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="font-bold">Amount:</span>
                                  <span className="col-span-3">{selectedTransaction.currency} {selectedTransaction.amount.toFixed(2)}</span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="font-bold">Status:</span>
                                  <span className="col-span-3">
                                    <Badge 
                                      className={`${getStatusColor(selectedTransaction.status)} font-medium`}
                                    >
                                      {selectedTransaction.status}
                                    </Badge>
                                  </span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="font-bold">Requested:</span>
                                  <span className="col-span-3">{format(new Date(selectedTransaction.requested_at), 'PPp')}</span>
                                </div>
                                {selectedTransaction.confirmed_at && (
                                  <div className="grid grid-cols-4 items-center gap-4">
                                    <span className="font-bold">Confirmed:</span>
                                    <span className="col-span-3">{format(new Date(selectedTransaction.confirmed_at), 'PPp')}</span>
                                  </div>
                                )}
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="font-bold">Payment ID:</span>
                                  <span className="col-span-3">{selectedTransaction.paymentId}</span>
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                  <span className="font-bold">User ID:</span>
                                  <span className="col-span-3">{selectedTransaction.userId}</span>
                                </div>
                              </div>
                            )}
                          </DialogContent>
                        </Dialog>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
