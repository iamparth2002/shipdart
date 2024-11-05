'use client';

import { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle, ArrowLeft, Loader2 } from 'lucide-react';

const rateCalculatorSchema = z.object({
  originPincode: z.string().length(6, "Pincode must be 6 digits"),
  destinationPincode: z.string().length(6, "Pincode must be 6 digits"),
  productType: z.enum(['ppd', 'cod']),
  chargeableWeight: z.string().min(1, "Weight is required"),
  codAmount: z.string().optional(),
});

const orderFormSchema = z.object({
  PRODUCT: z.enum(['COD', 'PPD']),
  CONSIGNEE: z.string().min(1, 'Consignee Name is required'),
  CONSIGNEE_ADDRESS1: z.string().min(1, 'Consignee Address Line 1 is required'),
  CONSIGNEE_ADDRESS2: z.string().optional(),
  CONSIGNEE_ADDRESS3: z.string().optional(),
  DESTINATION_CITY: z.string().min(1, 'Destination City is required'),
  STATE: z.string().min(1, 'State is required'),
  PINCODE: z.string().min(1, 'Pincode is required'),
  TELEPHONE: z.string().regex(/^\d{10}$/, 'Must be 10 digits').optional(),
  MOBILE: z.string().regex(/^\d{10}$/, 'Must be 10 digits').min(1, 'Mobile is required'),
  RETURN_NAME: z.string().min(1, 'Return Name is required'),
  RETURN_MOBILE: z.string().regex(/^\d{10}$/, 'Must be 10 digits').min(1, 'Return Mobile is required'),
  RETURN_PINCODE: z.string().min(1, 'Return Pincode is required'),
  RETURN_ADDRESS_LINE1: z.string().min(1, 'Return Address Line 1 is required'),
  RETURN_ADDRESS_LINE2: z.string().optional(),
  RETURN_PHONE: z.string().regex(/^\d{10}$/, 'Must be 10 digits').min(1, 'Return Phone is required'),
  PICKUP_NAME: z.string().min(1, 'Pickup Name is required'),
  PICKUP_PINCODE: z.string().min(1, 'Pickup Pincode is required'),
  PICKUP_MOBILE: z.string().regex(/^\d{10}$/, 'Must be 10 digits').min(1, 'Pickup Mobile is required'),
  PICKUP_PHONE: z.string().regex(/^\d{10}$/, 'Must be 10 digits').min(1, 'Pickup Phone is required'),
  PICKUP_ADDRESS_LINE1: z.string().min(1, 'Pickup Address Line 1 is required'),
  PICKUP_ADDRESS_LINE2: z.string().optional(),
  COLLECTABLE_VALUE: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid number').min(1, 'Collectable Value is required'),
  DECLARED_VALUE: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid number').min(1, 'Declared Value is required'),
  ITEM_DESCRIPTION: z.string().min(1, 'Item Description is required'),
  DG_SHIPMENT: z.boolean(),
  PIECES: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid number').min(1, 'Number of Pieces is required'),
  HEIGHT: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid number').min(1, 'Height is required'),
  BREADTH: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid number').min(1, 'Breadth is required'),
  LENGTH: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid number').min(1, 'Length is required'),
  VOLUMETRIC_WEIGHT: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid number').min(1, 'Volumetric Weight is required'),
  ACTUAL_WEIGHT: z.string().regex(/^\d+(\.\d{1,2})?$/, 'Must be a valid number').min(1, 'Actual Weight is required'),
  ACCOUNT_HOLDER_NAME: z.string().min(1, "Account Holder's Name is required").optional(),
  BANK_NAME: z.string().min(1, "Bank Name is required").optional(),
  ACCOUNT_NUMBER: z.string().min(1, "Account Number is required").optional(),
  IFSC_CODE: z.string().regex(/^[A-Z]{4}0[A-Z0-9]{6}$/, "Invalid IFSC Code").optional(),
  ACCOUNT_TYPE: z.enum(["savings", "current"]).optional(),
  GST_NUMBER: z.string().regex(/^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/, "Invalid GST Number").optional().or(z.literal('')),
  PAN_NUMBER: z.string().regex(/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/, "Invalid PAN Number").optional().or(z.literal('')),
  BRANCH_NAME: z.string().min(1, "Branch Name is required").optional().or(z.literal('')),
});

const orderFormSteps = [
  { title: 'Consignee Details', fields: ['CONSIGNEE', 'CONSIGNEE_ADDRESS1', 'CONSIGNEE_ADDRESS2', 'CONSIGNEE_ADDRESS3', 'DESTINATION_CITY', 'STATE', 'PINCODE', 'TELEPHONE', 'MOBILE'] },
  { title: 'Pickup Details', fields: ['PICKUP_NAME', 'PICKUP_PINCODE', 'PICKUP_MOBILE', 'PICKUP_PHONE', 'PICKUP_ADDRESS_LINE1', 'PICKUP_ADDRESS_LINE2'] },
  { title: 'Return Details', fields: ['RETURN_NAME', 'RETURN_MOBILE', 'RETURN_PINCODE', 'RETURN_ADDRESS_LINE1', 'RETURN_ADDRESS_LINE2', 'RETURN_PHONE'] },
  { title: 'Package Details', fields: ['COLLECTABLE_VALUE', 'DECLARED_VALUE', 'ITEM_DESCRIPTION', 'DG_SHIPMENT', 'PIECES', 'HEIGHT', 'BREADTH', 'LENGTH', 'VOLUMETRIC_WEIGHT', 'ACTUAL_WEIGHT'] },
  { title: 'Bank Details', fields: ['ACCOUNT_HOLDER_NAME', 'BANK_NAME', 'ACCOUNT_NUMBER', 'IFSC_CODE', 'ACCOUNT_TYPE', 'BRANCH_NAME', 'GST_NUMBER', 'PAN_NUMBER'] },
];

export default function ShippingOrder({ onBackToOrders, onSubmit, setIsAddingOrder }) {
  const [step, setStep] = useState('rate');
  const [rateResult, setRateResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderFormStep, setOrderFormStep] = useState(0);

  const rateForm = useForm({
    resolver: zodResolver(rateCalculatorSchema),
    defaultValues: {
      originPincode: '',
      destinationPincode: '',
      productType: 'ppd',
      chargeableWeight: '',
      codAmount: '0',
    },
  });

  const orderForm = useForm({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      PRODUCT: 'PPD',
      CONSIGNEE: '',
      CONSIGNEE_ADDRESS1: '',
      CONSIGNEE_ADDRESS2: '',
      CONSIGNEE_ADDRESS3: '',
      DESTINATION_CITY: '',
      STATE: '',
      PINCODE: '',
      TELEPHONE: '',
      MOBILE: '',
      RETURN_NAME: '',
      RETURN_MOBILE: '',
      RETURN_PINCODE: '',
      RETURN_ADDRESS_LINE1: '',
      RETURN_ADDRESS_LINE2: '',
      RETURN_PHONE: '',
      PICKUP_NAME: '',
      PICKUP_PINCODE: '',
      PICKUP_MOBILE: '',
      PICKUP_PHONE: '',
      PICKUP_ADDRESS_LINE1: '',
      PICKUP_ADDRESS_LINE2: '',
      COLLECTABLE_VALUE: '',
      DECLARED_VALUE: '',
      ITEM_DESCRIPTION: '',
      DG_SHIPMENT: false,
      PIECES: '1',
      HEIGHT: '',
      BREADTH: '',
      LENGTH: '',
      VOLUMETRIC_WEIGHT: '',
      ACTUAL_WEIGHT: '',
      TOTAL_CHARGE: 0,
      ACCOUNT_HOLDER_NAME: '',
      BANK_NAME: '',
      ACCOUNT_NUMBER: '',
      IFSC_CODE: '',
      ACCOUNT_TYPE: 'savings',
      BRANCH_NAME: '',
      GST_NUMBER: '',
      PAN_NUMBER: '',
    },
  });

  const calculateRate = async (data) => {
    setError(null);
    setIsLoading(true);

    const formdata = new FormData();
    formdata.append('username', 'SHIPDARTLOGISTIC-BA333267');
    formdata.append('password', '3PIXOLLg3t');
    formdata.append(
      'json_input',
      JSON.stringify([
        {
          orginPincode: data.originPincode,
          destinationPincode: data.destinationPincode,
          productType: data.productType,
          chargeableWeight: parseFloat(data.chargeableWeight),
          codAmount: data.productType === 'cod' ? parseFloat(data.codAmount) : 0,
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
      setRateResult(response.data[0]);
      setStep('rateResult');
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

  const proceedToOrderForm = () => {
    orderForm.setValue('PRODUCT', rateForm.getValues('productType').toUpperCase());
    orderForm.setValue('PINCODE', rateForm.getValues('destinationPincode'));
    orderForm.setValue('PICKUP_PINCODE', rateForm.getValues('originPincode'));
    orderForm.setValue('COLLECTABLE_VALUE', rateForm.getValues('productType') === 'cod' ? rateForm.getValues('codAmount') : '0');
    orderForm.setValue('DECLARED_VALUE', rateResult.chargesBreakup.total_charge.toString());
    orderForm.setValue('TOTAL_CHARGE', rateResult.chargesBreakup.total_charge);
    setStep('orderForm');
    setOrderFormStep(0);
  };

  const nextOrderStep = async () => {
    const fields = orderFormSteps[orderFormStep].fields;
    const isStepValid = await orderForm.trigger(fields);
    if (isStepValid) {
      setOrderFormStep((prev) => Math.min(prev + 1, orderFormSteps.length - 1));
    }
  };

  const prevOrderStep = () => {
    setOrderFormStep((prev) => Math.max(prev - 1, 0));
  };

  const renderRateCalculator = () => (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Rate Calculator</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={rateForm.handleSubmit(calculateRate)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="originPincode">Origin Pincode</Label>
              <Input {...rateForm.register('originPincode')} />
              {rateForm.formState.errors.originPincode && (
                <p className="text-sm text-red-500">{rateForm.formState.errors.originPincode.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="destinationPincode">Destination Pincode</Label>
              <Input {...rateForm.register('destinationPincode')} />
              {rateForm.formState.errors.destinationPincode && (
                <p className="text-sm text-red-500">{rateForm.formState.errors.destinationPincode.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="productType">Product Type</Label>
              <Select onValueChange={(value) => rateForm.setValue('productType', value)} defaultValue={rateForm.getValues('productType')}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ppd">Prepaid</SelectItem>
                  <SelectItem value="cod">Cash on Delivery</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="chargeableWeight">Chargeable Weight (kg)</Label>
              <Input {...rateForm.register('chargeableWeight')} type="number" step="0.01" min="0" />
              {rateForm.formState.errors.chargeableWeight && (
                <p className="text-sm text-red-500">{rateForm.formState.errors.chargeableWeight.message}</p>
              )}
            </div>
            {rateForm.watch('productType') === 'cod' && (
              <div  className="space-y-2">
                <Label htmlFor="codAmount">COD Amount</Label>
                <Input {...rateForm.register('codAmount')} type="number" step="0.01" min="0" />
              </div>
            )}
          </div>
          <div className="flex justify-between">
            <Button type="button" variant="outline" onClick={() => { setIsAddingOrder(false) }}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Orders
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : (
                'Calculate Rate'
              )}
            </Button>
          </div>
        </form>
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );

  const renderRateResult = () => (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Rate Result</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Origin Pincode:</p>
              <p>{rateForm.getValues('originPincode')}</p>
            </div>
            <div>
              <p  className="font-semibold">Destination Pincode:</p>
              <p>{rateForm.getValues('destinationPincode')}</p>
            </div>
            <div>
              <p className="font-semibold">Freight Charges:</p>
              <p>₹{rateResult.chargesBreakup.FRT}</p>
            </div>
            <div>
              <p className="font-semibold">Chargeable Weight:</p>
              <p>{rateForm.getValues('chargeableWeight')} kg</p>
            </div>
            <div>
              <p className="font-semibold">Fuel Surcharge:</p>
              <p>₹{rateResult.chargesBreakup.FUEL}</p>
            </div>
            <div>
              <p className="font-semibold">GST Charges:</p>
              <p>₹{rateResult.chargesBreakup.GST}</p>
            </div>
            <div>
              <p className="font-semibold">Total Charges:</p>
              <p className="text-lg font-bold">₹{rateResult.chargesBreakup.total_charge}</p>
            </div>
          </div>
          <div className="flex justify-between">
            <Button variant="outline" onClick={() => setStep('rate')}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button onClick={proceedToOrderForm}>Proceed to Order</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderOrderForm = () => (
    <Card>
      <CardHeader>
        <CardTitle>{orderFormSteps[orderFormStep].title}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={orderForm.handleSubmit(onSubmit)} className="space-y-6">
          {orderFormSteps[orderFormStep].fields.map((field) => {
            if (orderFormStep === 4 && orderForm.getValues('PRODUCT') !== 'COD') {
              return null;
            }
            switch (field) {
              case 'PRODUCT':
                return (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>{field.replace(/_/g, ' ')}</Label>
                    <Select
                      onValueChange={(value) => orderForm.setValue(field, value)}
                      defaultValue={orderForm.getValues(field)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select product type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="PPD">Prepaid</SelectItem>
                        <SelectItem value="COD">Cash on Delivery</SelectItem>
                      </SelectContent>
                    </Select>
                    {orderForm.formState.errors[field] && (
                      <p className="text-sm text-red-500">{orderForm.formState.errors[field].message}</p>
                    )}
                  </div>
                );
              case 'ITEM_DESCRIPTION':
                return (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>{field.replace(/_/g, ' ')}</Label>
                    <Textarea
                      id={field}
                      {...orderForm.register(field)}
                      placeholder="Enter item description"
                    />
                    {orderForm.formState.errors[field] && (
                      <p className="text-sm text-red-500">{orderForm.formState.errors[field].message}</p>
                    )}
                  </div>
                );
              case 'DG_SHIPMENT':
                return (
                  <div key={field} className="flex items-center space-x-2">
                    <Switch
                      id={field}
                      checked={orderForm.watch(field)}
                      onCheckedChange={(checked) => orderForm.setValue(field, checked)}
                    />
                    <Label htmlFor={field}>{field.replace(/_/g, ' ')}</Label>
                    {orderForm.formState.errors[field] && (
                      <p className="text-sm text-red-500">{orderForm.formState.errors[field].message}</p>
                    )}
                  </div>
                );
              case 'ACCOUNT_TYPE':
                return (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>{field.replace(/_/g, ' ')}</Label>
                    <Select
                      onValueChange={(value) => orderForm.setValue(field, value)}
                      defaultValue={orderForm.getValues(field)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select account type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="savings">Savings</SelectItem>
                        <SelectItem value="current">Current</SelectItem>
                      </SelectContent>
                    </Select>
                    {orderForm.formState.errors[field] && (
                      <p className="text-sm text-red-500">{orderForm.formState.errors[field].message}</p>
                    )}
                  </div>
                );
              case 'PINCODE':
              case 'PICKUP_PINCODE':
              case 'COLLECTABLE_VALUE':
              case 'DECLARED_VALUE':
                return (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>{field.replace(/_/g, ' ')}</Label>
                    <Input
                      id={field}
                      {...orderForm.register(field)}
                      placeholder={`Enter ${field.toLowerCase().replace(/_/g, ' ')}`}
                      disabled
                    />
                    {orderForm.formState.errors[field] && (
                      <p className="text-sm text-red-500">{orderForm.formState.errors[field].message}</p>
                    )}
                  </div>
                );
              default:
                return (
                  <div key={field} className="space-y-2">
                    <Label htmlFor={field}>{field.replace(/_/g, ' ')}</Label>
                    <Input
                      id={field}
                      {...orderForm.register(field)}
                      placeholder={`Enter ${field.toLowerCase().replace(/_/g, ' ')}`}
                    />
                    {orderForm.formState.errors[field] && (
                      <p className="text-sm text-red-500">{orderForm.formState.errors[field].message}</p>
                    )}
                  </div>
                );
            }
          })}
          <div className="flex justify-between">
            {orderFormStep > 0 ? (
              <Button type="button" variant="outline" onClick={prevOrderStep}>
                Previous
              </Button>
            ) : (
              <Button type="button" variant="outline" onClick={() => setStep('rateResult')}>
                Back to Rate Result
              </Button>
            )}
            {orderFormStep === orderFormSteps.length - 1 ? (
              <Button type="submit">Submit Order</Button>
            ) : (
              <Button type="button" onClick={nextOrderStep}>
                Next
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto md:p-4">
      {step === 'rate' && renderRateCalculator()}
      {step === 'rateResult' && renderRateResult()}
      {step === 'orderForm' && renderOrderForm()}
    </div>
  );
}