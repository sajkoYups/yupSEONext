"use client";

interface LinksProps {
  results: any;
}

export function Links({ results }: LinksProps) {
  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Links Analysis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Internal Page Links
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {results.internalPageLinksCount}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Internal Section Links
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {results.internalSectionLinksCount}
          </p>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Broken Links
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {results.brokenLinks.length}
          </p>
        </div>
      </div>

      {results.brokenLinks.length > 0 && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Broken Links Found:
          </h3>
          <ul className="space-y-1">
            {results.brokenLinks.map((link: string, index: number) => (
              <li key={index} className="text-sm text-red-600">
                {link}
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
