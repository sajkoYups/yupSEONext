"use client";

import { useState, useEffect } from "react";
import { X, Copy, Check, Share2, ExternalLink, Calendar } from "lucide-react";
import { createShareLink, ShareLinkResponse } from "@/lib/api/share";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  targetUrl: string;
  results: any;
}

export function ShareModal({
  isOpen,
  onClose,
  targetUrl,
  results,
}: ShareModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareData, setShareData] = useState<ShareLinkResponse | null>(null);
  const [copied, setCopied] = useState(false);
  const [expiresInDays, setExpiresInDays] = useState(30);

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setShareData(null);
      setError(null);
      setCopied(false);
    }
  }, [isOpen]);

  // Auto-create share link when modal opens
  useEffect(() => {
    if (isOpen && !shareData && !loading && !error) {
      handleCreateShareLink();
    }
  }, [isOpen, expiresInDays]);

  const handleCreateShareLink = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await createShareLink(targetUrl, results, expiresInDays);
      setShareData(response);
    } catch (err) {
      console.error("Error creating share link:", err);
      setError("Failed to create share link. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Generate frontend share URL
  const getFrontendShareUrl = () => {
    if (!shareData?.shareId) return "";
    const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
    return `${baseUrl}/shared/${shareData.shareId}`;
  };

  const handleCopyToClipboard = async () => {
    const frontendUrl = getFrontendShareUrl();
    if (!frontendUrl) return;

    try {
      // Try modern clipboard API first
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(frontendUrl);
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = frontendUrl;
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
      setError("Failed to copy link to clipboard");
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleExpirationChange = (days: number) => {
    setExpiresInDays(days);
    setShareData(null); // Reset to trigger new link creation
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <div className="flex items-center">
            <Share2 className="h-6 w-6 text-blue-600 mr-3" />
            <h2 className="text-xl font-semibold text-gray-900">
              Share Results
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Target URL Info */}
          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-sm text-gray-500 mb-1">Sharing results for:</p>
            <p className="text-gray-900 font-medium break-all">{targetUrl}</p>
          </div>

          {/* Expiration Selector */}
          {!shareData && !loading && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="inline h-4 w-4 mr-1" />
                Link Expiration
              </label>
              <div className="grid grid-cols-4 gap-2">
                {[7, 14, 30, 90].map((days) => (
                  <button
                    key={days}
                    onClick={() => handleExpirationChange(days)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      expiresInDays === days
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {days} days
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
              <p className="text-gray-600">Creating shareable link...</p>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <p className="text-red-800">{error}</p>
              <button
                onClick={handleCreateShareLink}
                className="mt-3 text-sm text-red-600 hover:text-red-800 font-medium"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Success State */}
          {shareData && (
            <div className="space-y-4">
              {/* Share URL */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Shareable Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={getFrontendShareUrl()}
                    readOnly
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-900 text-sm"
                    onClick={(e) => e.currentTarget.select()}
                  />
                  <button
                    onClick={handleCopyToClipboard}
                    className={`px-4 py-2 rounded-md font-medium transition-all flex items-center ${
                      copied
                        ? "bg-green-600 text-white"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    }`}
                  >
                    {copied ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Metadata */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Created:</span>
                  <span className="text-gray-900 font-medium">
                    {formatDate(shareData.createdAt)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Expires:</span>
                  <span className="text-gray-900 font-medium">
                    {formatDate(shareData.expiresAt)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Share ID:</span>
                  <span className="text-gray-900 font-mono text-xs">
                    {shareData.shareId}
                  </span>
                </div>
              </div>

              {/* Open Link Button */}
              <a
                href={getFrontendShareUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Shared Link in New Tab
              </a>

              {/* Info Message */}
              <p className="text-xs text-gray-500 text-center">
                Anyone with this link can view the audit results until the
                expiration date.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          {shareData && (
            <button
              onClick={() => {
                setShareData(null);
                setError(null);
              }}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Create New Link
            </button>
          )}
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
          >
            {shareData ? "Done" : "Cancel"}
          </button>
        </div>
      </div>
    </div>
  );
}

