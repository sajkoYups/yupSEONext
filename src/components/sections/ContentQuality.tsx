"use client";

interface ContentQualityProps {
  results: any;
}

export function ContentQuality({ results }: ContentQualityProps) {
  const getWordCountStatus = (count: number, grade: string) => {
    if (grade === "Good" || count >= 300) return "text-green-600";
    if (count >= 150) return "text-yellow-600";
    return "text-red-600";
  };

  const getWordCountFeedback = (count: number, grade: string) => {
    if (grade === "Good" || count >= 300) return "Good length";
    if (count >= 150) return "Could be longer";
    return "Too short";
  };

  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Content Quality Analysis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Word Count */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Content Length
          </h3>
          <p className="text-2xl font-bold text-gray-900">
            {results.wordCount} words
          </p>
          <p className={`text-sm ${getWordCountStatus(results.wordCount, results.wordCountGrade)}`}>
            {getWordCountFeedback(results.wordCount, results.wordCountGrade)}
          </p>
        </div>

        {/* Images without Alt */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Images Missing Alt Text
          </h3>
          <p
            className={`text-2xl font-bold ${
              results.imagesWithoutAlt === 0 ? "text-green-600" : "text-red-600"
            }`}
          >
            {results.imagesWithoutAlt}
          </p>
          <p className={`text-sm ${results.imagesWithoutAlt === 0 ? "text-green-600" : "text-red-600"}`}>
            {results.imagesWithoutAlt === 0 ? "Perfect!" : "Need alt text"}
          </p>
        </div>

        {/* Deprecated Tags */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Deprecated HTML Tags
          </h3>
          <p
            className={`text-2xl font-bold ${
              results.deprecatedTagsFound.length === 0 ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {results.deprecatedTagsFound.length}
          </p>
          <p className={`text-sm ${results.deprecatedTagsFound.length === 0 ? "text-green-600" : "text-yellow-600"}`}>
            {results.deprecatedTagsFound.length === 0 ? "Modern HTML" : "Update needed"}
          </p>
        </div>

        {/* Inline Styles */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Inline Styles
          </h3>
          <p
            className={`text-2xl font-bold ${
              results.inlineStylesCount === 0 ? "text-green-600" : "text-yellow-600"
            }`}
          >
            {results.inlineStylesCount}
          </p>
          <p className={`text-sm ${results.inlineStylesCount === 0 ? "text-green-600" : "text-yellow-600"}`}>
            {results.inlineStylesCount === 0 ? "Clean CSS" : "Consider external CSS"}
          </p>
        </div>

        {/* Heading Structure */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Heading Structure
          </h3>
          <div className="text-sm text-gray-600">
            <div>H1: {results.headings.h1}</div>
            <div>H2: {results.headings.h2}</div>
            <div>H3: {results.headings.h3}</div>
          </div>
          <p className={`text-sm mt-1 ${results.headings.h1 === 1 ? "text-green-600" : "text-yellow-600"}`}>
            {results.headings.h1 === 1 ? "Good H1 usage" : "Check H1 structure"}
          </p>
        </div>

        {/* Duplicate Content */}
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="text-sm font-medium text-gray-700 mb-2">
            Duplicate Content
          </h3>
          <p
            className={`text-2xl font-bold ${
              !results.isContentDuplicate ? "text-green-600" : "text-red-600"
            }`}
          >
            {results.isContentDuplicate ? "Detected" : "None"}
          </p>
          <p className={`text-sm ${!results.isContentDuplicate ? "text-green-600" : "text-red-600"}`}>
            {!results.isContentDuplicate ? "Unique content" : "Fix duplicates"}
          </p>
        </div>
      </div>

      {/* Content Issues Summary */}
      {(results.wordCount < 300 || results.imagesWithoutAlt > 0 || results.deprecatedTagsFound.length > 0 || results.headings.h1 !== 1) && (
        <div className="mt-6">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h3 className="text-sm font-medium text-blue-800 mb-2">
              💡 Content Improvement Suggestions
            </h3>
            <ul className="text-sm text-blue-700 space-y-1">
              {results.wordCount < 300 && (
                <li>• Add more content - aim for at least 300 words for better SEO</li>
              )}
              {results.imagesWithoutAlt > 0 && (
                <li>• Add descriptive alt text to {results.imagesWithoutAlt} images for accessibility and SEO</li>
              )}
              {results.deprecatedTagsFound.length > 0 && (
                <li>• Update deprecated HTML tags: {results.deprecatedTagsFound.join(", ")}</li>
              )}
              {results.headings.h1 !== 1 && (
                <li>• Use exactly one H1 tag per page for proper heading hierarchy</li>
              )}
              {results.inlineStylesCount > 5 && (
                <li>• Move inline styles to external CSS files for better performance</li>
              )}
            </ul>
          </div>
        </div>
      )}
    </section>
  );
}
