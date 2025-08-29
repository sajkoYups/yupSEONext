"use client";

interface PerformanceProps {
  results: any;
}

export function Performance({ results }: PerformanceProps) {
  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Performance Analysis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Page Load Time
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {results.pageLoadTime}ms
          </p>
          <p
            className={`text-sm ${
              results.loadTimeFeedback === "Good"
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {results.loadTimeFeedback}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            HTTP/2 Support
          </h3>
          <p
            className={`text-2xl font-bold ${
              results.isHttp2Supported ? "text-green-600" : "text-red-600"
            }`}
          >
            {results.isHttp2Supported ? "Yes" : "No"}
          </p>
        </div>
      </div>
    </section>
  );
}
