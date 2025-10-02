import { API_URL } from "@/lib/config";

export interface ShareLinkResponse {
  success: boolean;
  shareId: string;
  shareUrl: string;
  targetUrl: string;
  createdAt: string;
  expiresAt: string;
  expiresInDays: number;
}

export interface SharedResultsResponse {
  success: boolean;
  shareId: string;
  targetUrl: string;
  results: any;
  createdAt: string;
  expiresAt: string;
  viewCount: number;
}

export class ShareLinkError extends Error {
  constructor(
    message: string,
    public code: "NOT_FOUND" | "EXPIRED" | "FETCH_ERROR"
  ) {
    super(message);
    this.name = "ShareLinkError";
  }
}

/**
 * Creates a shareable link for SEO audit results
 */
export async function createShareLink(
  targetUrl: string,
  results: any,
  expiresInDays: number = 30
): Promise<ShareLinkResponse> {
  try {
    const response = await fetch(`${API_URL}/share-link`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        targetUrl,
        results,
        expiresInDays,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to create share link: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating share link:", error);
    throw error;
  }
}

/**
 * Fetches shared results by shareId
 */
export async function getSharedResults(
  shareId: string
): Promise<SharedResultsResponse> {
  try {
    const response = await fetch(`${API_URL}/share-link/${shareId}`);

    if (response.status === 404) {
      throw new ShareLinkError(
        "This share link doesn't exist or has been deleted.",
        "NOT_FOUND"
      );
    }

    if (response.status === 410) {
      throw new ShareLinkError(
        "This share link has expired and is no longer available.",
        "EXPIRED"
      );
    }

    if (!response.ok) {
      throw new ShareLinkError(
        "Failed to fetch shared results. Please try again.",
        "FETCH_ERROR"
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof ShareLinkError) {
      throw error;
    }
    console.error("Error fetching shared results:", error);
    throw new ShareLinkError(
      "Failed to fetch shared results. Please check your connection and try again.",
      "FETCH_ERROR"
    );
  }
}

/**
 * Deletes a share link (optional feature)
 */
export async function deleteShareLink(shareId: string): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/share-link/${shareId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete share link: ${response.statusText}`);
    }
  } catch (error) {
    console.error("Error deleting share link:", error);
    throw error;
  }
}

