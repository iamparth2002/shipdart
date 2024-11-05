'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  ArrowLeft,
  Eye,
  Loader2,
  Package,
  TruckIcon,
  Calendar,
  Clock,
  MapPin,
} from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import axiosInstance from '@/utils/axios';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [awbStatus, setAwbStatus] = useState(null);
  const [awbLoading, setAwbLoading] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get('/orders');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleViewDetails = async (order) => {
    setSelectedOrder(order);
    if (order.awbNumber) {
      await fetchAWBDetails(order.awbNumber);
    }
  };

  const fetchAWBDetails = async (awbNumber) => {
    setAwbLoading(true);
    try {
      // Use the actual AWB number instead of hardcoding
      const response = await axiosInstance.get(`/orders/awb/${114970250}`);
  
      // Parse the XML data directly
      const xmlData = new DOMParser().parseFromString(response.data, 'text/xml');
  
      // Convert XML to JSON
      const awbData = xmlToJson(xmlData);
  
      // Log data for debugging
      console.log({ awbData });
  
      // Check and format data from awbData based on XML structure
      const formattedData = {
        status: awbData?.["ecomexpress-objects"]?.object?.field?.find(
          (field) => field["@attributes"].name === "tracking_status"
        )?.["#text"],
        current_location_name: awbData?.["ecomexpress-objects"]?.object?.field?.find(
          (field) => field["@attributes"].name === "current_location_name"
        )?.["#text"],
        expected_date: awbData?.["ecomexpress-objects"]?.object?.field?.find(
          (field) => field["@attributes"].name === "expected_date"
        )?.["#text"],
        last_update_datetime: awbData?.["ecomexpress-objects"]?.object?.field?.find(
          (field) => field["@attributes"].name === "last_update_datetime"
        )?.["#text"],
        scans: awbData?.["ecomexpress-objects"]?.object?.field?.find(
          (field) => field["@attributes"].name === "scans"
        )?.object?.map((scan) => ({
          status: scan?.field?.find(
            (field) => field["@attributes"].name === "status"
          )?.["#text"],
          updated_on: scan?.field?.find(
            (field) => field["@attributes"].name === "updated_on"
          )?.["#text"],
          location_city: scan?.field?.find(
            (field) => field["@attributes"].name === "location_city"
          )?.["#text"],
          location: scan?.field?.find(
            (field) => field["@attributes"].name === "location"
          )?.["#text"],
        })),
      };

      console.log(formattedData)
  
      setAwbStatus(formattedData); // Set formatted data in state
    } catch (error) {
      console.error("Error fetching AWB details:", error);
    } finally {
      setAwbLoading(false);
    }
  };
  
  

  const xmlToJson = (xml) => {
    let obj = {};
    
    if (xml.nodeType === 1) { // Element node
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) { // Text node
      return xml.nodeValue.trim(); // Return trimmed text only if it's not whitespace
    }
  
    // Recurse through child nodes
    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
  
        // Ignore unnecessary #text nodes
        if (nodeName === "#text" && !item.nodeValue.trim()) continue;
  
        if (typeof obj[nodeName] === "undefined") {
          obj[nodeName] = xmlToJson(item);
        } else {
          if (!Array.isArray(obj[nodeName])) {
            obj[nodeName] = [obj[nodeName]];
          }
          obj[nodeName].push(xmlToJson(item));
        }
      }
    }
    
    return obj;
  };
  

  const handleBackToList = () => {
    setSelectedOrder(null);
    setAwbStatus(null);
  };

  const renderOrderList = () => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Orders</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead >Order ID</TableHead>
                <TableHead className="hidden md:table-cell">
                  AWB Number
                </TableHead>
                <TableHead>Product</TableHead>
                {/* <TableHead>Status</TableHead> */}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.orderId}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {order.awbNumber}
                  </TableCell>
                  <TableCell>{order.PRODUCT}</TableCell>
                  {/* <TableCell>
                    <Badge
                      variant={
                        order.status === 'Shipped' ? 'default' : 'secondary'
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell> */}
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleViewDetails(order)}
                    >
                      <Eye className="h-4 w-4 md:mr-2" />
                      <span className="hidden md:inline">View</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
    </Card>
  );

  const renderAWBStatus = () => (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">AWB Status</CardTitle>
      </CardHeader>
      <CardContent>
        {awbLoading ? (
          <div className="flex justify-center py-10">
            <Loader2 className="h-4 w-4 animate-spin" />
          </div>
        ) : awbStatus ? (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-2">
                <TruckIcon className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Status:</span>
                <span className="text-sm">{awbStatus.status}</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Current Location:</span>
                <span className="text-sm">
                  {awbStatus.current_location_name}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Expected Date:</span>
                <span className="text-sm">{awbStatus.expected_date}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium">Last Update:</span>
                <span className="text-sm">
                  {awbStatus.last_update_datetime}
                </span>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="tracking-history">
                <AccordionTrigger>Tracking History</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4">
                    {awbStatus?.scans?.map((scan, index) => (
                      <div
                        key={index}
                        className="border-l-2 border-muted pl-4 py-2"
                      >
                        <p className="text-sm font-medium">{scan.status}</p>
                        <p className="text-xs text-muted-foreground">
                          {scan.updated_on}
                        </p>
                        <p className="text-xs">
                          {scan.location_city} - {scan.location}
                        </p>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ) : (
          <p>No AWB information available.</p>
        )}
      </CardContent>
    </Card>
  );

  const renderOrderDetails = (order) => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold">
          Order: {order.orderId}
        </h2>
        <Button variant="outline" onClick={handleBackToList}>
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to List
        </Button>
      </div>

      <div className="grid gap-6 md:grid-cols-1">
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Order Status</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              <Badge
                variant={order.status === 'Shipped' ? 'default' : 'secondary'}
                className="text-base sm:text-lg"
              >
                {order.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </CardContent>
        </Card> */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tracking Information
            </CardTitle>
            <TruckIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-xl sm:text-2xl font-bold">
              AWB Number : {order.awbNumber}
            </div>
          </CardContent>
        </Card>
      </div>

      {renderAWBStatus()}

      <Tabs defaultValue="details" className="w-full">
        <ScrollArea className="w-full">
          <TabsList className="inline-flex w-full md:w-auto">
            <TabsTrigger value="details" className="flex-1 md:flex-none">
              Details
            </TabsTrigger>
            <TabsTrigger value="consignee" className="flex-1 md:flex-none">
              Consignee
            </TabsTrigger>
            <TabsTrigger value="package" className="flex-1 md:flex-none">
              Package
            </TabsTrigger>
            <TabsTrigger value="additional" className="flex-1 md:flex-none">
              Additional
            </TabsTrigger>
          </TabsList>
        </ScrollArea>
        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Order Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Product
                  </dt>
                  <dd className="text-base font-semibold mt-1">
                    {order.PRODUCT}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Order ID
                  </dt>
                  <dd className="text-base font-semibold mt-1">
                    {order?.orderId}
                  </dd>
                </div>
                {/* <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Invoice Date
                  </dt>
                  <dd className="text-base font-semibold mt-1">{order?.INVOICE_DATE?.toLocaleDateString()}</dd>
                </div> */}
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Collectable Value
                  </dt>
                  <dd className="text-base font-semibold mt-1">
                    INR {order.COLLECTABLE_VALUE}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Declared Value
                  </dt>
                  <dd className="text-base font-semibold mt-1">
                    INR {order.DECLARED_VALUE}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="consignee">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Consignee Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Name
                  </dt>
                  <dd className="text-base font-semibold mt-1">
                    {order.CONSIGNEE}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Address
                  </dt>
                  <dd className="text-base font-semibold mt-1">
                    {order.CONSIGNEE_ADDRESS1}
                    {order.CONSIGNEE_ADDRESS2 && <br />}
                    {order.CONSIGNEE_ADDRESS2}
                    {order.CONSIGNEE_ADDRESS3 && <br />}
                    {order.CONSIGNEE_ADDRESS3}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    City
                  </dt>
                  <dd className="text-base font-semibold  mt-1">
                    {order.DESTINATION_CITY}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    State
                  </dt>
                  <dd className="text-base font-semibold mt-1">
                    {order.STATE}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Pincode
                  </dt>
                  <dd className="text-base font-semibold mt-1">
                    {order.PINCODE}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Contact
                  </dt>
                  <dd className="text-base font-semibold mt-1">
                    Tel: {order.TELEPHONE}
                    <br />
                    Mobile: {order.MOBILE}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="package">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Package Details
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Item Description
                  </dt>
                  <dd className="text-base font-semibold mt-1">
                    {order.ITEM_DESCRIPTION}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    DG Shipment
                  </dt>
                  <dd className="mt-1">
                    <Badge
                      variant={order.DG_SHIPMENT ? 'destructive' : 'secondary'}
                    >
                      {order.DG_SHIPMENT ? 'Yes' : 'No'}
                    </Badge>
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Pieces
                  </dt>
                  <dd className="text-base font-semibold mt-1">
                    {order.PIECES}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Dimensions
                  </dt>
                  <dd className="text-base font-semibold mt-1">{`${order.HEIGHT} x ${order.BREADTH} x ${order.LENGTH}`}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Volumetric Weight
                  </dt>
                  <dd className="text-base font-semibold mt-1">
                    {order.VOLUMETRIC_WEIGHT}
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Actual Weight
                  </dt>
                  <dd className="text-base font-semibold mt-1">
                    {order.ACTUAL_WEIGHT}
                  </dd>
                </div>
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="additional">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Additional Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <dl className="grid gap-4">
                {Object.entries(order.ADDITIONAL_INFORMATION).map(
                  ([key, value]) => (
                    <div key={key}>
                      <dt className="text-sm font-medium text-muted-foreground">
                        {key}
                      </dt>
                      <dd className="text-base font-semibold mt-1">{value}</dd>
                    </div>
                  )
                )}
              </dl>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Order Management</h1>
      {selectedOrder ? renderOrderDetails(selectedOrder) : renderOrderList()}
    </div>
  );
}
