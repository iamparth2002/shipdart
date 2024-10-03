'use client';

import { useState } from 'react';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';

export default function RateCalculator() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [originPincode, setOriginPincode] = useState('');
  const [destinationPincode, setDestinationPincode] = useState('');
  const [productType, setProductType] = useState('ppd');
  const [chargeableWeight, setChargeableWeight] = useState('');
  const [codAmount, setCodAmount] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setResult(null);
    setIsLoading(true);

    const formdata = new FormData();
    formdata.append('username', 'SHIPDARTLOGISTIC-BA333267');
    formdata.append('password', '3PIXOLLg3t');
    formdata.append(
      'json_input',
      JSON.stringify([
        {
          orginPincode: originPincode,
          destinationPincode: destinationPincode,
          productType,
          chargeableWeight: parseFloat(chargeableWeight),
          codAmount: codAmount ? parseFloat(codAmount) : 0,
        },
      ])
    );

    try {
      const response = await axios.post(
        'https://ratecard.ecomexpress.in/services/rateCalculatorAPI/',
        formdata,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(response.data[0]);
      setResult(response.data[0]);
    } catch (err) {
      setError(
        err.response
          ? err.response.data
          : 'An error occurred while fetching rates.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookNow = (rateDetails) => {
    // Implement booking logic here
    console.log('Booking with details:', rateDetails);
  };

  return (
    <div className="container mx-auto md:p-4">
      {!result ? (
        <Card>
          <CardHeader>
            <CardTitle>Ecom Express Rate Calculator</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div> */}
                <div className="space-y-2">
                  <Label htmlFor="originPincode">Origin Pincode</Label>
                  <Input
                    id="originPincode"
                    type="text"
                    value={originPincode}
                    onChange={(e) => setOriginPincode(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="destinationPincode">
                    Destination Pincode
                  </Label>
                  <Input
                    id="destinationPincode"
                    type="text"
                    value={destinationPincode}
                    onChange={(e) => setDestinationPincode(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="productType">Product Type</Label>
                  <Select value={productType} onValueChange={setProductType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select product type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ppd">Prepaid</SelectItem>
                      <SelectItem value="cod">Cash on Delivery</SelectItem>
                      <SelectItem value="rev">Reverse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="chargeableWeight">
                    Chargeable Weight (kg)
                  </Label>
                  <Input
                    id="chargeableWeight"
                    type="number"
                    value={chargeableWeight}
                    onChange={(e) => setChargeableWeight(e.target.value)}
                    min="1"
                    step="0.01"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="codAmount">COD Amount (optional)</Label>
                  <Input
                    id="codAmount"
                    type="number"
                    value={codAmount}
                    onChange={(e) => setCodAmount(e.target.value)}
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Calculating...
                  </>
                ) : (
                  'Calculate Rate'
                )}
              </Button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded-md flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold">Error</h3>
                  <p>{error}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        <Card className="mt-4">
          <CardHeader>
          <Button className="w-[100px] mb-4" onClick={() => setResult(null)}> <ArrowLeft className="mr-2 h-4 w-4" />Back</Button>
            <CardTitle>Rate Calculation Results</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <Card>
                <CardContent className="p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="font-semibold">Origin Pincode:</p>
                      <p>{originPincode}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Destination Pincode:</p>
                      <p>{destinationPincode}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Freight Charges:</p>
                      <p>₹{result?.chargesBreakup.FRT}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Chargeable Weight:</p>
                      <p>{chargeableWeight} kg</p>
                    </div>
                    {/* <div>
                    <p className="font-semibold">Base Rate:</p>
                    <p>₹{result.baseRate}</p>
                  </div> */}
                    <div>
                      <p className="font-semibold">Fuel Surcharge:</p>
                      <p>₹{result?.chargesBreakup.FUEL}</p>
                    </div>
                    <div>
                      <p className="font-semibold">GST Charges:</p>
                      <p>₹{result?.chargesBreakup.GST}</p>
                    </div>
                    <div>
                      <p className="font-semibold">Total Charges:</p>
                      <p className="text-lg font-bold">
                        ₹{result?.chargesBreakup.total_charge}
                      </p>
                    </div>
                  </div>
                  <Button
                    onClick={() => handleBookNow(item)}
                    className="mt-4 w-full"
                  >
                    Book Now
                  </Button>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
