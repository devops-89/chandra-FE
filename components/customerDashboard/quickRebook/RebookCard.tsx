import { Bug, ChefHat } from "lucide-react";

import type { RebookService } from "@/types/dashboardTypes/customerDashboard/customerDashboard.types";

type RebookCardProps = {
  service: RebookService;
};

const iconMap = {
  kitchen: ChefHat,
  pest_control: Bug,
} as const;

const RebookCard = ({ service }: RebookCardProps) => {
  const Icon = iconMap[service.icon];

  return (
    <button
      type="button"
      className="group rounded-xl border border-slate-200 bg-white p-4 text-center transition-all hover:border-emerald-600 hover:shadow-sm cursor-pointer"
    >
      <Icon className="mx-auto mb-2 h-6 w-6 text-slate-500 group-hover:text-emerald-600 transition-colors" />
      <p className="text-xs font-bold text-slate-900">{service.serviceName}</p>
    </button>
  );
};

export default RebookCard;

