"use client";

import { renderTitleBarChart } from "@/components/ui/BarCharts";

interface TitleAnalysisProps {
  results: any;
}

export function TitleAnalysis({ results }: TitleAnalysisProps) {
  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Title Analysis
      </h2>
      <div className="h-64">{renderTitleBarChart(results)}</div>
    </section>
  );
}
