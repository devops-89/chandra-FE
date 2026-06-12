'use client';

import EditCommissionPage from "@/components/adminDashboard/finance/commission/EditCommissionPage";

export default function Page() {
  return (
    <EditCommissionPage
      open={true}
      onClose={() => {}}
      service={null}
      onSave={() => {}}
    />
  );
}