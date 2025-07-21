"use client";

import { Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const bar_chart_data = [
  { month: 'Jan', count: 24 },
  { month: 'Feb', count: 30 },
  { month: 'Mar', count: 34 },
  { month: 'Apr', count: 38 },
  { month: 'Jun', count: 45 },
];

const pie_data = [
  { name: 'Dikirim', value: 10 },
  { name: 'Diterima', value: 15 },
  { name: 'Diproses', value: 25 },
  { name: 'Selesai', value: 50 },
];

const COLORS = ['#3B82F6', '#60A5FA', '#8B5CF6', '#10B981'];

export default function AdminDashboard() {
  return <div>
    <div className="flex gap-2 flex-wrap mb-8">
      <div className="bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 w-60 p-4 text-center rounded">
        <h2 className="text-3xl font-bold mb-2">105</h2>
        <p className="text-sm">cards submitted</p>
      </div>
      <div className="bg-blue-300 dark:bg-blue-800 border border-blue-400 dark:border-blue-700 w-60 p-4 text-center rounded">
        <h2 className="text-3xl font-bold mb-2">23</h2>
        <p className="text-sm">cards accepted</p>
      </div>
      <div className="bg-yellow-300 dark:bg-yellow-800 border border-yellow-400 dark:border-yellow-700 w-60 p-4 text-center rounded">
        <h2 className="text-3xl font-bold mb-2">50</h2>
        <p className="text-sm">cards in process</p>
      </div>
      <div className="bg-green-300 dark:bg-green-800 border border-green-400 dark:border-green-700 w-60 p-4 text-center rounded">
        <h2 className="text-3xl font-bold mb-2">20</h2>
        <p className="text-sm">done</p>
      </div>
    </div>

    <div className="grid grid-cols-2">
      <div>
        <h4 className="mb-4 text-lg ps-10">Monthly Submission</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bar_chart_data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div>
        <h4 className="mb-4 text-lg ps-10">New users this month</h4>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={bar_chart_data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="count" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  </div>
}
