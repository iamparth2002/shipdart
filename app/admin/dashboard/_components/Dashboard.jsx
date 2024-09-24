import { Button } from '@/components/ui/button';
import React from 'react'

function DashboardCard({ title, value }) {
    return (
      <div className="rounded-lg bg-white p-6 shadow">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <p className="mt-2 text-3xl font-semibold text-gray-700">{value}</p>
      </div>
    );
  }

const Dashboard = () => {
    return (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <DashboardCard title="Total Users" value="5,678" />
          <DashboardCard title="Active Parcels" value="1,234" />
          <DashboardCard title="Open Tickets" value="56" />
          <DashboardCard title="Resolved Complaints" value="89%" />
        </div>
      );
}

export default Dashboard