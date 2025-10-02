"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getSharedResults,
  ShareLinkError,
  SharedResultsResponse,
} from "@/lib/api/share";
import { OnPageSEO } from "@/components/sections/OnPageSEO";
import { TechnicalSEO } from "@/components/sections/TechnicalSEO";
import { ContentQuality } from "@/components/sections/ContentQuality";
import { SchemaMarkup } from "@/components/sections/SchemaMarkup";
import { Socials } from "@/components/sections/Socials";
import { Links } from "@/components/sections/Links";
import { Performance } from "@/components/sections/Performance";
import { KeywordAnalysis } from "@/components/sections/KeywordAnalysis";
import { TitleAnalysis } from "@/components/sections/TitleAnalysis";
import { DescriptionModal } from "@/components/ui/DescriptionModal";
import { Spinner } from "@/components/ui/Spinner";
import {
  Share2,
  AlertCircle,
  Clock,
  Eye,
  ExternalLink,
  Search,
  Home,
} from "lucide-react";

interface Results {
  seoResults: any[];
}

export default function SharedResultsPage() {
  const params = useParams();
  const router = useRouter();
  const shareId = params?.shareId as string;

  const [modalInfo, setModalInfo] = useState({
    isOpen: false,
    title: "",
    description: "",
    improvements: [] as string[],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<{
    type: "NOT_FOUND" | "EXPIRED" | "FETCH_ERROR" | null;
    message: string;
  }>({ type: null, message: "" });
  const [sharedData, setSharedData] = useState<SharedResultsResponse | null>(
    null
  );
  const [selectedUrl, setSelectedUrl] = useState<string | null>(null);

  useEffect(() => {
    if (shareId) {
      fetchSharedResults();
    }
  }, [shareId]);

  useEffect(() => {
    if (sharedData?.results?.seoResults && sharedData.results.seoResults.length > 0) {
      setSelectedUrl(sharedData.results.seoResults[0].url);
    }
  }, [sharedData]);

  const fetchSharedResults = async () => {
    setLoading(true);
    setError({ type: null, message: "" });

    try {
      const data = await getSharedResults(shareId);
      setSharedData(data);
    } catch (err) {
      if (err instanceof ShareLinkError) {
        setError({ type: err.code, message: err.message });
      } else {
        setError({
          type: "FETCH_ERROR",
          message: "An unexpected error occurred. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const results: Results | null = sharedData?.results || null;

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Share2 className="h-8 w-8 text-blue-600 mr-3" />
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Shared SEO Report
                  </h1>
                  <p className="text-sm text-gray-500">Loading audit results...</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col items-center justify-center py-16">
            <Spinner className="h-12 w-12 text-blue-600 mb-4" />
            <p className="text-gray-600 text-lg">Loading shared results...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error States
  if (error.type) {
    const errorConfig = {
      NOT_FOUND: {
        icon: AlertCircle,
        title: "Share Link Not Found",
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
      },
      EXPIRED: {
        icon: Clock,
        title: "Share Link Expired",
        color: "text-orange-600",
        bg: "bg-orange-50",
        border: "border-orange-200",
      },
      FETCH_ERROR: {
        icon: AlertCircle,
        title: "Error Loading Results",
        color: "text-red-600",
        bg: "bg-red-50",
        border: "border-red-200",
      },
    };

    const config = errorConfig[error.type];
    const Icon = config.icon;

    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-6">
              <div className="flex items-center">
                <Share2 className="h-8 w-8 text-blue-600 mr-3" />
                <div className="flex flex-col">
                  <h1 className="text-2xl font-bold text-gray-900">
                    Shared SEO Report
                  </h1>
                  <p className="text-sm text-gray-500">Enterprise SEO Analysis</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div
            className={`${config.bg} border ${config.border} rounded-lg p-8 text-center`}
          >
            <Icon className={`h-16 w-16 ${config.color} mx-auto mb-4`} />
            <h2 className={`text-2xl font-bold ${config.color} mb-2`}>
              {config.title}
            </h2>
            <p className="text-gray-700 mb-6">{error.message}</p>

            {error.type === "FETCH_ERROR" && (
              <button
                onClick={fetchSharedResults}
                className="mb-4 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Try Again
              </button>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-600 mb-4">
                Want to run your own SEO audit?
              </p>
              <button
                onClick={() => router.push("/")}
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
              >
                <Search className="h-5 w-5 mr-2" />
                Run Your Own Audit
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Success State - Display Results
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Share2 className="h-8 w-8 text-blue-600 mr-3" />
              <div className="flex flex-col">
                <h1 className="text-2xl font-bold text-gray-900">
                  Shared SEO Report
                </h1>
                <p className="text-sm text-gray-500">Enterprise SEO Analysis</p>
              </div>
            </div>
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <Home className="h-4 w-4 mr-2" />
              Home
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Shared Results Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <div className="flex items-start">
            <Share2 className="h-6 w-6 text-blue-600 mr-3 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Shared SEO Audit Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Target URL:</p>
                  <a
                    href={sharedData?.targetUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 font-medium inline-flex items-center"
                  >
                    {sharedData?.targetUrl}
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </a>
                </div>
                <div>
                  <p className="text-gray-600">Created:</p>
                  <p className="text-gray-900 font-medium">
                    {sharedData?.createdAt && formatDate(sharedData.createdAt)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600">Expires:</p>
                  <p className="text-gray-900 font-medium">
                    {sharedData?.expiresAt && formatDate(sharedData.expiresAt)}
                  </p>
                </div>
                <div>
                  <p className="text-gray-600 inline-flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    Views:
                  </p>
                  <p className="text-gray-900 font-medium">
                    {sharedData?.viewCount || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg p-6 mb-8 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold mb-2">
                Want to analyze your own website?
              </h3>
              <p className="text-blue-100">
                Get comprehensive SEO insights and recommendations for your site.
              </p>
            </div>
            <button
              onClick={() => router.push("/")}
              className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-white font-medium whitespace-nowrap"
            >
              <Search className="h-5 w-5 mr-2" />
              Run Your Own Audit
            </button>
          </div>
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
                  results={results.seoResults.find((r) => r.url === selectedUrl)!}
                  setModalInfo={setModalInfo}
                />
                <TechnicalSEO
                  results={results.seoResults.find((r) => r.url === selectedUrl)!}
                />
                <ContentQuality
                  results={results.seoResults.find((r) => r.url === selectedUrl)!}
                />
                <SchemaMarkup
                  results={results.seoResults.find((r) => r.url === selectedUrl)!}
                />
                <TitleAnalysis
                  results={results.seoResults.find((r) => r.url === selectedUrl)!}
                />
                <KeywordAnalysis
                  results={results.seoResults.find((r) => r.url === selectedUrl)!}
                />
                <Performance
                  results={results.seoResults.find((r) => r.url === selectedUrl)!}
                />
                <Links
                  results={results.seoResults.find((r) => r.url === selectedUrl)!}
                />
                <Socials
                  results={results.seoResults.find((r) => r.url === selectedUrl)!}
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

