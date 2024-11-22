import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, Download, Upload, UploadIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import * as XLSX from "xlsx"
import axiosInstance from "@/utils/axios"
import Image from "next/image"

export default function BulkUploadComponent({ setOrders }) {
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [parsedData, setParsedData] = useState([])
  const [isOpen, setIsOpen] = useState(false) 

  const handleFileChange = (event) => {
    const selectedFile = event.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
        setFile(selectedFile)
        setError(null)
      } else {
        setFile(null)
        setError("Please upload a valid Excel file (.xlsx)")
      }
    }
  }

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload");
      return;
    }
  
    try {
      // Step 1: Read and parse the uploaded Excel file
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet, { defval: null });
  
      // Step 2: Transform the data
      const transformedData = jsonData.map((row) => ({
        PRODUCT: row.PRODUCT || null,
        CONSIGNEE: row.CONSIGNEE || null,
        CONSIGNEE_ADDRESS1: row.CONSIGNEE_ADDRESS1 || null,
        CONSIGNEE_ADDRESS2: row.CONSIGNEE_ADDRESS2 || null,
        CONSIGNEE_ADDRESS3: row.CONSIGNEE_ADDRESS3 || null,
        DESTINATION_CITY: row.DESTINATION_CITY || null,
        STATE: row.STATE || null,
        PINCODE: row.PINCODE || null,
        TELEPHONE: row.TELEPHONE || null,
        MOBILE: row.MOBILE || null,
        RETURN_NAME: row.RETURN_NAME || null,
        RETURN_MOBILE: row.RETURN_MOBILE || null,
        RETURN_PINCODE: row.RETURN_PINCODE || null,
        RETURN_ADDRESS_LINE1: row.RETURN_ADDRESS_LINE1 || null,
        RETURN_ADDRESS_LINE2: row.RETURN_ADDRESS_LINE2 || null,
        RETURN_PHONE: row.RETURN_PHONE || null,
        PICKUP_NAME: row.PICKUP_NAME || null,
        PICKUP_PINCODE: row.PICKUP_PINCODE || null,
        PICKUP_MOBILE: row.PICKUP_MOBILE || null,
        PICKUP_PHONE: row.PICKUP_PHONE || null,
        PICKUP_ADDRESS_LINE1: row.PICKUP_ADDRESS_LINE1 || null,
        PICKUP_ADDRESS_LINE2: row.PICKUP_ADDRESS_LINE2 || null,
        COLLECTABLE_VALUE: row.COLLECTABLE_VALUE || null,
        DECLARED_VALUE: null,
        ITEM_DESCRIPTION: row.ITEM_DESCRIPTION || null,
        DG_SHIPMENT: row.DG_SHIPMENT || null,
        PIECES: row.PIECES || null,
        HEIGHT: row.HEIGHT || null,
        BREADTH: row.BREADTH || null,
        LENGTH: row.LENGTH || null,
        VOLUMETRIC_WEIGHT: row.VOLUMETRIC_WEIGHT || null,
        ACTUAL_WEIGHT: row.ACTUAL_WEIGHT || null,
        ACCOUNT_HOLDER_NAME: row.ACCOUNT_HOLDER_NAME || null,
        BANK_NAME: row.BANK_NAME || null,
        ACCOUNT_NUMBER: row.ACCOUNT_NUMBER || null,
        IFSC_CODE: row.IFSC_CODE || null,
        ACCOUNT_TYPE: row.ACCOUNT_TYPE || null,
        GST_NUMBER: row.GST_NUMBER || null,
        PAN_NUMBER: row.PAN_NUMBER || null,
        BRANCH_NAME: row.BRANCH_NAME || null,
        price: null, // Will be calculated later
        total_charge: null,
      }));
  
      // Step 3: Calculate rates for each row using the API
      const calculateRatesForData = async (data) => {
        const formdata = new FormData();
        formdata.append("username", "SHIPDARTLOGISTIC-BA333267");
        formdata.append("password", "3PIXOLLg3t");
        formdata.append(
          "json_input",
          JSON.stringify([
            {
              orginPincode: data.PICKUP_PINCODE,
              destinationPincode: data.PINCODE,
              productType: data.PRODUCT,
              chargeableWeight: parseFloat(data.ACTUAL_WEIGHT || 0),
              codAmount: data.PRODUCT === "cod" ? parseFloat(data.COLLECTABLE_VALUE || 0) : 0,
            },
          ])
        );
  
        try {
          const response = await axiosInstance.post(
            "https://ratecard.ecomexpress.in/services/rateCalculatorAPI/",
            formdata,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          return response.data[0].chargesBreakup.total_charge || 0; // Assuming API returns a 'price' field
        } catch (err) {
          console.error("Error calculating rate for:", data, err);
          return 0; // Default price in case of error
        }
      };
  
      // Step 4: Process each row and update the price
      const updatedData = await Promise.all(
        transformedData.map(async (row) => {
          const price = await calculateRatesForData(row);
          console.log({price})
          return { ...row,DECLARED_VALUE:price  };
        })
      );
  
      // Step 5: Update state and cleanup
      setParsedData(updatedData);
      setOrders(updatedData);
      setFile(null);
      setIsOpen(false);
      console.log("Updated Data: ", updatedData);
    } catch (err) {
      setError("An error occurred while processing the file");
      console.error(err);
    }
  };
  

  const handleDownloadSchema = () => {
    const schemaData = [
      [
        "PRODUCT", "CONSIGNEE", "CONSIGNEE_ADDRESS1", "CONSIGNEE_ADDRESS2", "CONSIGNEE_ADDRESS3",
        "DESTINATION_CITY", "STATE", "PINCODE", "TELEPHONE", "MOBILE", "RETURN_NAME", "RETURN_MOBILE",
        "RETURN_PINCODE", "RETURN_ADDRESS_LINE1", "RETURN_ADDRESS_LINE2", "RETURN_PHONE", "PICKUP_NAME",
        "PICKUP_PINCODE", "PICKUP_MOBILE", "PICKUP_PHONE", "PICKUP_ADDRESS_LINE1", "PICKUP_ADDRESS_LINE2",
        "COLLECTABLE_VALUE", "ITEM_DESCRIPTION", "DG_SHIPMENT", "PIECES", "HEIGHT",
        "BREADTH", "LENGTH", "VOLUMETRIC_WEIGHT", "ACTUAL_WEIGHT", "ACCOUNT_HOLDER_NAME", "BANK_NAME",
        "ACCOUNT_NUMBER", "IFSC_CODE", "ACCOUNT_TYPE", "GST_NUMBER", "PAN_NUMBER", "BRANCH_NAME",
      ],
    ];
  
    // Create a workbook and a worksheet
    const workbook = XLSX.utils.book_new();
    const worksheet = XLSX.utils.aoa_to_sheet(schemaData);
  
    // Append worksheet to the workbookrateResult
    XLSX.utils.book_append_sheet(workbook, worksheet, "Schema");
  
    // Write workbook to binary string
    const binaryString = XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
  
    // Convert binary string to Blob
    const blob = new Blob([s2ab(binaryString)], { type: "application/octet-stream" });
  
    // Create a URL and trigger the download
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "bulk_upload_schema.xlsx";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Helper function to convert binary string to array buffer
  const s2ab = (binaryString) => {
    const buffer = new ArrayBuffer(binaryString.length);
    const view = new Uint8Array(buffer);
    for (let i = 0; i < binaryString.length; i++) {
      view[i] = binaryString.charCodeAt(i) & 0xFF;
    }
    return buffer;
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div
          className="p-4 rounded-lg bg-green-500 text-primary-foreground flex gap-4 items-center cursor-pointer transition-colors"
          onClick={() => setIsOpen(true)} // Open dialog on trigger click
        >
          <UploadIcon size={20}/>
          <span className="text-lg font-semibold">Bulk Upload</span>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Bulk Upload</DialogTitle>
          <DialogDescription>
            Upload your Excel file for bulk data import or download the required schema.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="excel-file" className="text-right">
              Excel File
            </Label>
            <Input
              id="excel-file"
              type="file"
              accept=".xlsx"
              onChange={handleFileChange}
              className="col-span-3"
            />
          </div>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="default" className="border-green-500 text-green-700">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>File uploaded successfully.</AlertDescription>
            </Alert>
          )}
          <div className="flex justify-between gap-2">
            <Button variant="outline" onClick={handleDownloadSchema} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download Schema
            </Button>
            <Button onClick={handleUpload} className="w-full">
              <Upload className="mr-2 h-4 w-4" />
              Upload
            </Button>
          </div>
        </div>
        <DialogFooter />
      </DialogContent>
    </Dialog>
  );
}
