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

      {/* Detailed Links Analysis */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Internal Page Links */}
        {results.internalPageLinks && results.internalPageLinks.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Internal Page Links ({results.internalPageLinks.length})
            </h3>
            <div className="max-h-40 overflow-y-auto">
              <ul className="space-y-1">
                {results.internalPageLinks.slice(0, 10).map((link: string, index: number) => (
                  <li key={index} className="text-xs text-blue-600 break-all">
                    {link}
                  </li>
                ))}
                {results.internalPageLinks.length > 10 && (
                  <li className="text-xs text-gray-500 italic">
                    ...and {results.internalPageLinks.length - 10} more
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}

        {/* Internal Section Links */}
        {results.internalSectionLinks && results.internalSectionLinks.length > 0 && (
          <div className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-3">
              Internal Section Links ({results.internalSectionLinks.length})
            </h3>
            <div className="max-h-40 overflow-y-auto">
              <ul className="space-y-1">
                {results.internalSectionLinks.slice(0, 10).map((link: string, index: number) => (
                  <li key={index} className="text-xs text-purple-600 break-all">
                    {link}
                  </li>
                ))}
                {results.internalSectionLinks.length > 10 && (
                  <li className="text-xs text-gray-500 italic">
                    ...and {results.internalSectionLinks.length - 10} more
                  </li>
                )}
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Broken Links */}
      {results.brokenLinks.length > 0 && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <h3 className="text-sm font-medium text-red-800 mb-2">
            🚫 Broken Links Found ({results.brokenLinks.length})
          </h3>
          <ul className="space-y-1 max-h-32 overflow-y-auto">
            {results.brokenLinks.map((link: string, index: number) => (
              <li key={index} className="text-sm text-red-600 break-all">
                {link}
              </li>
            ))}
          </ul>
          <p className="text-xs text-red-700 mt-2">
            Fix these broken links to improve user experience and SEO.
          </p>
        </div>
      )}

      {/* Link Strategy Recommendations */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🔗 Link Strategy Recommendations
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          {results.internalPageLinksCount === 0 && (
            <li>• Add internal links to other relevant pages on your site</li>
          )}
          {results.internalPageLinksCount > 0 && results.internalPageLinksCount < 3 && (
            <li>• Consider adding more internal links (aim for 3-5 per page)</li>
          )}
          {results.internalSectionLinksCount === 0 && (
            <li>• Add section links (table of contents) for better navigation</li>
          )}
          <li>• Use descriptive anchor text that includes relevant keywords</li>
          <li>• Ensure all links open properly and lead to relevant content</li>
          {results.brokenLinks.length === 0 && (
            <li>• ✅ Great! No broken links found</li>
          )}
        </ul>
      </div>
    </section>
  );
}
