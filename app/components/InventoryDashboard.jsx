"use client";

import { ChevronDown, ChevronUp, FileText } from "lucide-react";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
// import { DatePicker } from '@/components/ui/date-picker';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InventoryDashboard = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [dateRange, setDateRange] = useState({ start: null, end: null });
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [activeTab, setActiveTab] = useState("summary");

  const categoryData = [
    {
      category: "Electronics",
      orderQty: 1200,
      availableQty: 800,
      shipped: 400,
      received: 350,
    },
    {
      category: "Furniture",
      orderQty: 800,
      availableQty: 600,
      shipped: 250,
      received: 200,
    },
  ];

  const warehouseData = [
    {
      warehouse: "New Jersey",
      orderQty: 2500,
      availableQty: 1800,
      shipped: 800,
      received: 700,
      backorder: 35,
    },
    {
      warehouse: "Seattle Washington",
      orderQty: 2000,
      availableQty: 1500,
      shipped: 600,
      received: 500,
      backorder: 25,
    },
    // Add more warehouses...
  ];

  const agingData = [
    { range: "0-30", quantity: 500, category: "Electronics" },
    { range: "31-60", quantity: 300, category: "Electronics" },
    { range: "61-90", quantity: 200, category: "Electronics" },
    { range: "91-120", quantity: 150, category: "Electronics" },
    { range: "Others", quantity: 100, category: "Electronics" },
  ];

  // Sorting function for tables
  const sortTable = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  // Export functions
  const exportToExcel = (data, filename) => {
    // Implementation for Excel export
    console.log(`Exporting ${filename} to Excel`, data);
  };

  const exportToPDF = () => {
    // Implementation for PDF export
    console.log("Exporting dashboard to PDF");
  };

  // Calculate aging based on date
  const calculateAging = (orderDate) => {
    const today = new Date();
    const orderDateTime = new Date(orderDate);
    const diffTime = Math.abs(today - orderDateTime);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays <= 30) return "0-30";
    if (diffDays <= 60) return "31-60";
    if (diffDays <= 90) return "61-90";
    if (diffDays <= 120) return "91-120";
    return "Others";
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 w-[400px]">
          <TabsTrigger value="summary">Summary</TabsTrigger>
          <TabsTrigger value="aging">Aging Report</TabsTrigger>
          <TabsTrigger value="backorder">Backorder Report</TabsTrigger>
        </TabsList>

        <TabsContent value="summary">
          <div className="space-y-6">
            {/* Enhanced Date Filter */}
            <Card>
              <CardHeader>
                <CardTitle>Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-4">
                  <DatePicker
                    onChange={(date) =>
                      setDateRange({ ...dateRange, start: date })
                    }
                    placeholder="Start Date"
                  />
                  <DatePicker
                    onChange={(date) =>
                      setDateRange({ ...dateRange, end: date })
                    }
                    placeholder="End Date"
                  />
                  <Select
                    placeholder="Select Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-48"
                  >
                    <option value="all">All Categories</option>
                    {categoryData.map((cat) => (
                      <option key={cat.category} value={cat.category}>
                        {cat.category}
                      </option>
                    ))}
                  </Select>
                  <Button>Apply Filters</Button>
                </div>
              </CardContent>
            </Card>

            {/* Category-wise Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Category-wise Summary
                  <Button
                    onClick={() =>
                      exportToExcel(categoryData, "category_summary.xlsx")
                    }
                    size="sm"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Export to Excel
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead
                        className="cursor-pointer"
                        onClick={() => sortTable("category")}
                      >
                        Category
                        {sortConfig.key === "category" &&
                          (sortConfig.direction === "asc" ? (
                            <ChevronUp className="inline ml-1" />
                          ) : (
                            <ChevronDown className="inline ml-1" />
                          ))}
                      </TableHead>
                      <TableHead className="text-right">Order Qty</TableHead>
                      <TableHead className="text-right">
                        Available Qty
                      </TableHead>
                      <TableHead className="text-right">Shipped</TableHead>
                      <TableHead className="text-right">Received</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {categoryData.map((category) => (
                      <TableRow key={category.category}>
                        <TableCell className="font-medium">
                          {category.category}
                        </TableCell>
                        <TableCell className="text-right">
                          {category.orderQty}
                        </TableCell>
                        <TableCell className="text-right">
                          {category.availableQty}
                        </TableCell>
                        <TableCell className="text-right">
                          {category.shipped}
                        </TableCell>
                        <TableCell className="text-right">
                          {category.received}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Warehouse-wise Table */}
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  Warehouse-wise Summary
                  <Button
                    onClick={() =>
                      exportToExcel(warehouseData, "warehouse_summary.xlsx")
                    }
                    size="sm"
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Export to Excel
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Warehouse</TableHead>
                      <TableHead className="text-right">Order Qty</TableHead>
                      <TableHead className="text-right">
                        Available Qty
                      </TableHead>
                      <TableHead className="text-right">Shipped</TableHead>
                      <TableHead className="text-right">Received</TableHead>
                      <TableHead className="text-right">Backorder</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {warehouseData.map((warehouse) => (
                      <TableRow key={warehouse.warehouse}>
                        <TableCell className="font-medium">
                          {warehouse.warehouse}
                        </TableCell>
                        <TableCell className="text-right">
                          {warehouse.orderQty}
                        </TableCell>
                        <TableCell className="text-right">
                          {warehouse.availableQty}
                        </TableCell>
                        <TableCell className="text-right">
                          {warehouse.shipped}
                        </TableCell>
                        <TableCell className="text-right">
                          {warehouse.received}
                        </TableCell>
                        <TableCell className="text-right">
                          {warehouse.backorder}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="aging">
          <Card>
            <CardHeader>
              <CardTitle>Inventory Aging Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Select
                    placeholder="Select Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-48"
                  >
                    <option value="all">All Categories</option>
                    {categoryData.map((cat) => (
                      <option key={cat.category} value={cat.category}>
                        {cat.category}
                      </option>
                    ))}
                  </Select>
                  <Button
                    onClick={() =>
                      exportToExcel(agingData, "aging_report.xlsx")
                    }
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Export to Excel
                  </Button>
                </div>

                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={agingData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="range" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="quantity" fill="#8884d8" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <Alert>
                  <AlertDescription>
                    Aging is calculated based on the order date. Items are
                    categorized into: 0-30 days, 31-60 days, 61-90 days, 91-120
                    days, and others.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backorder">
          <Card>
            <CardHeader>
              <CardTitle>Backorder Report</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <Select
                    placeholder="Select Category"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-48"
                  >
                    <option value="all">All Categories</option>
                    {categoryData.map((cat) => (
                      <option key={cat.category} value={cat.category}>
                        {cat.category}
                      </option>
                    ))}
                  </Select>
                  <Button
                    onClick={() =>
                      exportToExcel(warehouseData, "backorder_report.xlsx")
                    }
                  >
                    <FileText className="mr-2 h-4 w-4" />
                    Export to Excel
                  </Button>
                </div>

                <div className="h-96">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={warehouseData}
                        dataKey="backorder"
                        nameKey="warehouse"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        label
                      />
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <Alert>
                  <AlertDescription>
                    Backorder quantity is calculated when Order Quantity exceeds
                    Available Quantity.
                  </AlertDescription>
                </Alert>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InventoryDashboard;
