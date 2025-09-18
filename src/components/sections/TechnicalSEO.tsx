"use client";

interface TechnicalSEOProps {
  results: any;
}

export function TechnicalSEO({ results }: TechnicalSEOProps) {
  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Technical SEO Analysis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* SSL Certificate */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            SSL Certificate
          </h3>
          <p
            className={`text-2xl font-bold ${
              results.isSSLEnabled ? "text-green-600" : "text-red-600"
            }`}
          >
            {results.isSSLEnabled ? "Enabled" : "Missing"}
          </p>
          {!results.isSSLEnabled && (
            <p className="text-xs text-red-600 mt-1">
              Critical: SSL is required for SEO
            </p>
          )}
        </div>

        {/* Robots.txt */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Robots.txt File
          </h3>
          <p
            className={`text-2xl font-bold ${
              results.hasRobotsTxt ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {results.hasRobotsTxt ? "Found" : "Missing"}
          </p>
          {!results.hasRobotsTxt && (
            <p className="text-xs text-yellow-600 mt-1">
              Recommended for better crawling control
            </p>
          )}
        </div>

        {/* Schema Markup */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Schema Markup
          </h3>
          <p
            className={`text-2xl font-bold ${
              results.hasSchemaMarkup ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {results.hasSchemaMarkup ? "Implemented" : "Missing"}
          </p>
          {results.schemaTypes && results.schemaTypes.length > 0 && (
            <p className="text-xs text-green-600 mt-1">
              Types: {results.schemaTypes.join(", ")}
            </p>
          )}
        </div>

        {/* Language Attribute */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Language Attribute
          </h3>
          <p
            className={`text-2xl font-bold ${
              results.hasLangAttribute ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {results.hasLangAttribute ? "Present" : "Missing"}
          </p>
          {!results.hasLangAttribute && (
            <p className="text-xs text-yellow-600 mt-1">
              Helps search engines understand content language
            </p>
          )}
        </div>

        {/* Google Analytics */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Google Analytics
          </h3>
          <p
            className={`text-2xl font-bold ${
              results.hasGoogleAnalytics ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {results.hasGoogleAnalytics ? "Detected" : "Not Found"}
          </p>
          {!results.hasGoogleAnalytics && (
            <p className="text-xs text-yellow-600 mt-1">
              Important for tracking SEO performance
            </p>
          )}
        </div>

        {/* HTTP/2 Support */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            HTTP/2 Support
          </h3>
          <p
            className={`text-2xl font-bold ${
              results.isHttp2Supported ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {results.isHttp2Supported ? "Enabled" : "Disabled"}
          </p>
          {!results.isHttp2Supported && (
            <p className="text-xs text-yellow-600 mt-1">
              HTTP/2 improves page load speeds
            </p>
          )}
        </div>
      </div>

      {/* Technical Issues Summary */}
      {(!results.isSSLEnabled || !results.hasRobotsTxt || !results.hasSchemaMarkup || !results.hasLangAttribute) && (
        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <h3 className="text-sm font-medium text-yellow-800 mb-2">
            ⚠️ Technical Issues Found
          </h3>
          <ul className="text-sm text-yellow-700 space-y-1">
            {!results.isSSLEnabled && (
              <li>• SSL Certificate is missing - this is critical for SEO and security</li>
            )}
            {!results.hasRobotsTxt && (
              <li>• Robots.txt file not found - add one to guide search engine crawling</li>
            )}
            {!results.hasSchemaMarkup && (
              <li>• Schema markup missing - implement structured data for better search results</li>
            )}
            {!results.hasLangAttribute && (
              <li>• Language attribute missing - add lang="en" (or appropriate language) to html tag</li>
            )}
          </ul>
        </div>
      )}
    </section>
  );
}
