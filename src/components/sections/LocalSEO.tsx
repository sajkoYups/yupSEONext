"use client";

interface LocalSEOProps {
  googleBusinessProfile: any;
}

export function LocalSEO({ googleBusinessProfile }: LocalSEOProps) {
  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Local SEO Analysis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Google Business Profile
          </h3>
          <p
            className={`text-2xl font-bold ${
              googleBusinessProfile.exists ? "text-green-600" : "text-red-600"
            }`}
          >
            {googleBusinessProfile.exists ? "Found" : "Not Found"}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Profile Completeness
          </h3>
          <p
            className={`text-2xl font-bold ${
              googleBusinessProfile.isComplete
                ? "text-green-600"
                : "text-yellow-600"
            }`}
          >
            {googleBusinessProfile.isComplete ? "Complete" : "Incomplete"}
          </p>
        </div>
      </div>

      {googleBusinessProfile.missingElements &&
        googleBusinessProfile.missingElements.length > 0 && (
          <div className="mt-6">
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Missing Elements:
            </h3>
            <ul className="space-y-1">
              {googleBusinessProfile.missingElements.map(
                (element: string, index: number) => (
                  <li key={index} className="text-sm text-red-600">
                    • {element}
                  </li>
                )
              )}
            </ul>
          </div>
        )}
    </section>
  );
}
