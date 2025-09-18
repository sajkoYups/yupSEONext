"use client";

interface SchemaMarkupProps {
  results: any;
}

export function SchemaMarkup({ results }: SchemaMarkupProps) {
  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Schema Markup Analysis
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Schema Implementation Status */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Schema Implementation
          </h3>
          <p
            className={`text-2xl font-bold ${
              results.hasSchemaMarkup ? "text-green-600" : "text-red-600"
            }`}
          >
            {results.hasSchemaMarkup ? "Implemented" : "Missing"}
          </p>
          <p className={`text-sm ${results.hasSchemaMarkup ? "text-green-600" : "text-red-600"}`}>
            {results.hasSchemaMarkup ? "Great! Schema found" : "Needs implementation"}
          </p>
        </div>

        {/* Schema Types Count */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Schema Types Found
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {results.schemaTypes?.length || 0}
          </p>
          <p className="text-sm text-gray-600">
            {results.schemaTypes?.length > 0 ? "Types detected" : "No schemas found"}
          </p>
        </div>
      </div>

      {/* Schema Types List */}
      {results.schemaTypes && results.schemaTypes.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Detected Schema Types
          </h3>
          <div className="flex flex-wrap gap-2">
            {results.schemaTypes.map((type: string, index: number) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-green-100 text-green-800"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Schema Data Preview */}
      {results.schemas && results.schemas.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">
            Schema Data Preview
          </h3>
          <div className="bg-gray-50 rounded-lg p-4 max-h-64 overflow-y-auto">
            <pre className="text-xs text-gray-600 whitespace-pre-wrap">
              {JSON.stringify(results.schemas.slice(0, 2), null, 2)}
              {results.schemas.length > 2 && (
                <div className="text-gray-500 italic mt-2">
                  ...and {results.schemas.length - 2} more schema objects
                </div>
              )}
            </pre>
          </div>
        </div>
      )}

      {/* Schema Recommendations */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-sm font-medium text-blue-800 mb-2">
          🎯 Schema Markup Recommendations
        </h3>
        <ul className="text-sm text-blue-700 space-y-1">
          {!results.hasSchemaMarkup && (
            <>
              <li>• Implement Organization schema for your business information</li>
              <li>• Add LocalBusiness schema if you have a physical location</li>
              <li>• Use Article schema for blog posts and content pages</li>
              <li>• Consider Product schema for e-commerce items</li>
            </>
          )}
          {results.hasSchemaMarkup && (
            <>
              <li>• ✅ Great! You have schema markup implemented</li>
              {!results.schemaTypes?.includes('Organization') && (
                <li>• Consider adding Organization schema for better business visibility</li>
              )}
              {!results.schemaTypes?.includes('LocalBusiness') && (
                <li>• Add LocalBusiness schema if you serve local customers</li>
              )}
              <li>• Test your schema with Google's Rich Results Test tool</li>
              <li>• Monitor schema performance in Google Search Console</li>
            </>
          )}
          <li>• Keep schema markup up-to-date with your content</li>
          <li>• Use JSON-LD format for better compatibility</li>
        </ul>
      </div>

      {/* Common Schema Types Guide */}
      <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
        <h3 className="text-sm font-medium text-gray-700 mb-2">
          📋 Common Schema Types to Consider
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <strong>Business Schemas:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• Organization</li>
              <li>• LocalBusiness</li>
              <li>• ContactPoint</li>
            </ul>
          </div>
          <div>
            <strong>Content Schemas:</strong>
            <ul className="ml-4 mt-1 space-y-1">
              <li>• Article/BlogPosting</li>
              <li>• Product</li>
              <li>• Review/Rating</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
