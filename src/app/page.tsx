"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "@/lib/config";
import { OnPageSEO } from "@/components/sections/OnPageSEO";
import { TechnicalSEO } from "@/components/sections/TechnicalSEO";
import { ContentQuality } from "@/components/sections/ContentQuality";
import { SchemaMarkup } from "@/components/sections/SchemaMarkup";
import { Socials } from "@/components/sections/Socials";
import { Links } from "@/components/sections/Links";
import { Performance } from "@/components/sections/Performance";
import { LocalSEO } from "@/components/sections/LocalSEO";
import { KeywordAnalysis } from "@/components/sections/KeywordAnalysis";
import { TitleAnalysis } from "@/components/sections/TitleAnalysis";
import { Spinner } from "@/components/ui/Spinner";
import { DescriptionModal } from "@/components/ui/DescriptionModal";
import {
  Search,
  MapPin,
  Building,
} from "lucide-react";

interface SEOResult {
  url: string;
  title: string;
  isTitleUnique: boolean;
  metaDescription: string;
  metaDescriptionStatus: string;
  headings: {
    h1: number;
    h2: number;
    h3: number;
    h4: number;
    h5: number;
    h6: number;
  };
  h1Feedback: string;
  imagesWithoutAlt: number;
  wordCount: number;
  wordCountGrade: string;
  pageLoadTime: number;
  loadTimeFeedback: string;
  brokenLinks: string[];
  isContentDuplicate: boolean;
  keywordAnalysis: unknown[];
  canonicalLink: string;
  isCanonicalCorrect: boolean;
  hasLangAttribute: boolean;
  isSSLEnabled: boolean;
  hasRobotsTxt: boolean;
  hasGoogleAnalytics: boolean;
  socialLinks: Record<string, string>;
  internalPageLinksCount: number;
  internalSectionLinksCount: number;
  internalPageLinks: string[];
  internalSectionLinks: string[];
  deprecatedTagsFound: string[];
  inlineStylesCount: number;
  isHttp2Supported: boolean;
  schemas: unknown[];
  hasSchemaMarkup: boolean;
  schemaTypes: string[];
}

interface GoogleBusinessProfile {
  exists: boolean;
  isComplete: boolean;
  missingElements: string[];
}

interface Results {
  seoResults: SEOResult[];
  googleBusinessProfile: GoogleBusinessProfile;
}

export default function Home() {
  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: "",
    description: "",
    improvements: [] as string[],
  });
  const [url, setUrl] = useState("");
  const [maxDepth, setMaxDepth] = useState(2);
  const [keywordInput, setKeywordInput] = useState("");
  const [keywords, setKeywords] = useState<{ text: string; id: string }[]>([]);
  const [location, setLocation] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);
  const [companyName, setCompanyName] = useState("");

  useEffect(() => {
    if (results?.seoResults && results.seoResults.length > 0) {
      setSelectedUrl(results.seoResults[0].url);
    }
  }, [results]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let formattedUrl = url.trim();
    if (!formattedUrl.startsWith("https://www.")) {
      formattedUrl = `https://www.${formattedUrl.replace(
        /^(https?:\/\/)?(www\.)?/,
        ""
      )}`;
    }

    try {
      const response = await axios.post(`${API_URL}/crawl`, {
        url: formattedUrl,
        maxDepth,
        keywords: keywords.map((k) => k.text),
        location,
        companyName,
      });
      setResults(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching SEO data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeywordInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeywordInput(e.target.value);
  };

  const addKeyword = () => {
    if (
      keywordInput.trim() &&
      !keywords.find((k) => k.text === keywordInput.trim())
    ) {
      setKeywords([
        ...keywords,
        { text: keywordInput.trim(), id: Date.now().toString() },
      ]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (id: string) => {
    setKeywords(keywords.filter((k) => k.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addKeyword();
    }
  };

  const exportToPDF = async () => {
    if (!results) return;

    try {
      const response = await axios.post(
        `${API_URL}/pdf/export`,
        {
          results,
          url: results.seoResults[0]?.url || "",
          companyName,
        },
        {
          responseType: "blob",
        }
      );

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute(
        "download",
        `seo-report-${new Date().toISOString().split("T")[0]}.pdf`
      );
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Error exporting PDF:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Search className="h-8 w-8 text-blue-600 mr-3" />
              <h1 className="text-2xl font-bold text-gray-900">AI SEO Optimizer</h1>
            </div>
            {/* {results && (
              <button
                onClick={exportToPDF}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <Download className="h-4 w-4 mr-2" />
                Export PDF
              </button>
            )} */}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Input Form */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* URL Input */}
              <div>
                <label
                  htmlFor="url"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Website URL
                </label>
                <input
                  type="text"
                  id="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Enter website URL (e.g., example.com)"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  required
                />
              </div>

              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company Name
                </label>
                <div className="relative">
                  <Building className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="companyName"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter company name"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
              </div>

              {/* Max Depth */}
              <div>
                <label
                  htmlFor="maxDepth"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Crawl Depth
                </label>
                <select
                  id="maxDepth"
                  value={maxDepth}
                  onChange={(e) => setMaxDepth(Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                  <option value={1}>1 page</option>
                  <option value={2}>2 pages</option>
                  <option value={3}>3 pages</option>
                  <option value={4}>4 pages</option>
                  <option value={5}>5 pages</option>
                </select>
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Location
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    id="location"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="Enter location"
                    className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
              </div>
            </div>

            {/* Keywords */}
            <div>
              <label
                htmlFor="keywords"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Keywords
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  id="keywords"
                  value={keywordInput}
                  onChange={handleKeywordInput}
                  onKeyPress={handleKeyPress}
                  placeholder="Add keywords"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
                <button
                  type="button"
                  onClick={addKeyword}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Add
                </button>
              </div>
              {keywords.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {keywords.map((keyword) => (
                    <span
                      key={keyword.id}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {keyword.text}
                      <button
                        type="button"
                        onClick={() => removeKeyword(keyword.id)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={loading}
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Spinner className="h-5 w-5 mr-2" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Search className="h-5 w-5 mr-2" />
                    Analyze SEO
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Results */}
        {results && (
          <div className="space-y-8">
            {/* URL Selector */}
            {results.seoResults.length > 1 && (
              <div className="bg-white rounded-lg shadow-sm border p-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Select URL to analyze:
                </label>
                <select
                  value={selectedUrl || ""}
                  onChange={(e) => setSelectedUrl(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                >
                  {results.seoResults.map((result, index) => (
                    <option key={index} value={result.url}>
                      {result.url}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Analysis Sections */}
            {selectedUrl && (
              <>
                <OnPageSEO
                  results={
                    results.seoResults.find((r) => r.url === selectedUrl)!
                  }
                  setModalInfo={setModalInfo}
                />
                <TechnicalSEO
                  results={
                    results.seoResults.find((r) => r.url === selectedUrl)!
                  }
                />
                <ContentQuality
                  results={
                    results.seoResults.find((r) => r.url === selectedUrl)!
                  }
                />
                <SchemaMarkup
                  results={
                    results.seoResults.find((r) => r.url === selectedUrl)!
                  }
                />
                <TitleAnalysis
                  results={
                    results.seoResults.find((r) => r.url === selectedUrl)!
                  }
                />
                <KeywordAnalysis
                  results={
                    results.seoResults.find((r) => r.url === selectedUrl)!
                  }
                />
                <Performance
                  results={
                    results.seoResults.find((r) => r.url === selectedUrl)!
                  }
                />
                <Links
                  results={
                    results.seoResults.find((r) => r.url === selectedUrl)!
                  }
                />
                <Socials
                  results={
                    results.seoResults.find((r) => r.url === selectedUrl)!
                  }
                />
                <LocalSEO
                  googleBusinessProfile={results.googleBusinessProfile}
                />
              </>
            )}
          </div>
        )}
      </div>

      {/* Modal */}
      {modalInfo.isOpen && (
        <DescriptionModal
          isOpen={modalInfo.isOpen}
          onClose={() => setModalInfo({ ...modalInfo, isOpen: false })}
          title={modalInfo.title}
          description={modalInfo.description}
          improvements={modalInfo.improvements}
        />
      )}
    </div>
  );
}
