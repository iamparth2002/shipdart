'use client'
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react'

const Parcel = () => {
    const [selectedParcel, setSelectedParcel] = useState(null)
    const parcels = [
        {
          id: 'P001',
          sender: 'John Doe',
          recipient: 'Jane Smith',
          status: 'In Transit',
          location: 'New York',
        },
        {
          id: 'P002',
          sender: 'Alice Cooper',
          recipient: 'Bob Dylan',
          status: 'Delivered',
          location: 'Los Angeles',
        },
        {
          id: 'P003',
          sender: 'Charlie Brown',
          recipient: 'Lucy van Pelt',
          status: 'Processing',
          location: 'Chicago',
        },
      ];

      const handleParcelClick = (parcel) => {
        setSelectedParcel(parcel)
      }
    
      const handleBackClick = () => {
        setSelectedParcel(null)
      }
    
      if (selectedParcel) {
        return (
          <Card className="bg-white">
            <CardHeader>
              <div className="flex items-center">
                <Button variant="ghost" size="icon" onClick={handleBackClick} className="mr-2 bg-gray-100 rounded-xl hover:cursor-pointer hover:bg-gray-200">
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <CardTitle>Parcel Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 ml-2">
                <p><strong>Tracking ID:</strong> {selectedParcel.id}</p>
                <p><strong>Sender:</strong> {selectedParcel.sender}</p>
                <p><strong>Recipient:</strong> {selectedParcel.recipient}</p>
                <p><strong>Status:</strong> {selectedParcel.status}</p>
                <p><strong>Location:</strong> {selectedParcel.location}</p>
                <p><strong>Estimated Delivery:</strong> {selectedParcel.estimatedDelivery}</p>
                <p><strong>Weight:</strong> {selectedParcel.weight}</p>
                <p><strong>Dimensions:</strong> {selectedParcel.dimensions}</p>
              </div>
            </CardContent>
          </Card>
        )
      }
    
      return (
        <div className="rounded-lg bg-white p-6 ">
          <h2 className="mb-4 text-xl font-semibold">Parcel Tracking</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Tracking ID
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Sender
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hidden sm:block">
                  Recipient
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                  Status
                </th>
                <th className="px-2 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 hidden sm:block">
                  Location
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white">
              {parcels.map((parcel) => (
                <tr key={parcel.id} className='hover:bg-gray-100 hover:cursor-pointer rounded-xl'
                onClick={() => handleParcelClick(parcel)}
                >
                  <td className="whitespace-nowrap px-2 py-4">{parcel.id}</td>
                  <td className="whitespace-nowrap px-2 py-4">{parcel.sender}</td>
                  <td className="whitespace-nowrap px-2 py-4 hidden sm:block">
                    {parcel.recipient}
                  </td>
                  <td className="whitespace-nowrap px-2 py-4">{parcel.status}</td>
                  <td className="whitespace-nowrap px-2 py-4 hidden sm:block">{parcel.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
}

export default Parcel