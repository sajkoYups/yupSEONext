"use client";

import { renderKeywordBarChart } from "@/components/ui/BarCharts";

interface KeywordAnalysisProps {
  results: any;
}

export function KeywordAnalysis({ results }: KeywordAnalysisProps) {
  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Keyword Analysis
      </h2>
      <div className="h-64">
        {renderKeywordBarChart(results.keywordAnalysis || [])}
      </div>
    </section>
  );
}
