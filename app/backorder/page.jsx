"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";

const backorderData = [
  { name: "New Jersey", value: 400 },
  { name: "Seattle Washington", value: 300 },
  { name: "Sydney", value: 200 },
  { name: "Mexico City", value: 100 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

export default function BackorderReport() {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Backorder Report</h1>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Warehouse-wise Backorder</CardTitle>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="clothing">Clothing</SelectItem>
              {/* Add more categories */}
            </SelectContent>
          </Select>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={backorderData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {backorderData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
