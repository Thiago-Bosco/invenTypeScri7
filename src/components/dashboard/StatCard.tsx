
import { cn } from "@/lib/utils";
import React from "react";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: {
    value: string | number;
    positive: boolean;
  };
  className?: string;
};

export default function StatCard({ title, value, icon, change, className }: StatCardProps) {
  return (
    <div className={cn(
      "bg-white rounded-lg p-6 shadow-sm border flex flex-col h-full",
      className
    )}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className="p-2 bg-blue-50 text-inventory-blue rounded-md">
          {icon}
        </div>
      </div>
      <div className="mt-1">
        <div className="text-2xl font-bold">{value}</div>
        {change && (
          <div className={cn(
            "text-sm mt-1",
            change.positive ? "text-green-600" : "text-red-600"
          )}>
            {change.positive ? "+" : "-"}{change.value}
            {" "}desde o último mês
          </div>
        )}
      </div>
    </div>
  );
}
