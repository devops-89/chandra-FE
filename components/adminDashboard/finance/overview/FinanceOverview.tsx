'use client';

import { useState, useEffect } from "react";
import RevenueCards from "./RevenueCards";
import { AdminControllers } from "@/api/adminControllers";
import { CircularProgress, Box } from "@mui/material";

const FinanceOverview = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await AdminControllers.getDashboardStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
        <CircularProgress size={30} sx={{ color: '#059669' }} />
      </Box>
    );
  }

  const data = stats || {};

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4">
      <RevenueCards title="Total Revenue" value={`₹${data.totalRevenue?.toLocaleString('en-IN') || 0}`} />
      <RevenueCards title="Technician Payouts" value={`₹${data.totalTechnicianPayout?.toLocaleString('en-IN') || 0}`} />
      <RevenueCards title="Pending Transactions" value={`${data.pendingTransactionCount?.toLocaleString('en-IN') || 0}`} />
      <RevenueCards title="Total Transactions" value={`${data.successTransactionCount?.toLocaleString('en-IN') || 0}`} />
    </div>
  );
};

export default FinanceOverview;
