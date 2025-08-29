"use client";

import { calculateGrade, getGradeClass } from "@/lib/helpers";
import { SEO_DESCRIPTIONS } from "@/lib/constants";
import { Info } from "lucide-react";

interface CategoryAndGradeTableProps {
  result: any;
  setModalInfo: (info: any) => void;
}

export function CategoryAndGradeTable({
  result,
  setModalInfo,
}: CategoryAndGradeTableProps) {
  const grades = calculateGrade(result);

  const handleRowClick = (category: string) => {
    setModalInfo({
      isOpen: true,
      title:
        SEO_DESCRIPTIONS[category as keyof typeof SEO_DESCRIPTIONS]?.title ||
        category,
      description:
        SEO_DESCRIPTIONS[category as keyof typeof SEO_DESCRIPTIONS]
          ?.description || "",
      improvements:
        SEO_DESCRIPTIONS[category as keyof typeof SEO_DESCRIPTIONS]
          ?.improvements || [],
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="px-6 py-4 border-b">
        <h2 className="text-lg font-semibold text-gray-900">
          On-Page SEO Analysis
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Grade
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            <tr
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick("Title Tags")}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Title Tags
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeClass(
                    grades.title
                  )}`}
                >
                  {grades.title}
                </span>
              </td>
            </tr>

            <tr
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick("Meta Descriptions")}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Meta Descriptions
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeClass(
                    grades.metaDescription
                  )}`}
                >
                  {grades.metaDescription}
                </span>
              </td>
            </tr>

            <tr
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick("Headings")}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Headings
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeClass(
                    grades.headings
                  )}`}
                >
                  {grades.headings}
                </span>
              </td>
            </tr>

            <tr
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick("Page Load Speed")}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Page Load Speed
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getGradeClass(
                    grades.pageLoadSpeed
                  )}`}
                >
                  {grades.pageLoadSpeed}
                </span>
              </td>
            </tr>

            <tr
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick("Internal Page Links")}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Internal Page Links
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.internalPageLinksCount}
              </td>
            </tr>

            <tr
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick("Internal Section Links")}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Internal Section Links
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.internalSectionLinksCount}
              </td>
            </tr>

            <tr
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick("Duplicate Content")}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Duplicate Content
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.isContentDuplicate ? "Yes" : "No"}
              </td>
            </tr>

            <tr
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick("Images without Alt")}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Images without Alt
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.imagesWithoutAlt}
              </td>
            </tr>

            <tr
              className="hover:bg-gray-50 cursor-pointer transition-colors"
              onClick={() => handleRowClick("Canonical Tag")}
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                Canonical Tag
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {result.canonicalLink} (
                {result.isCanonicalCorrect ? "Correct" : "Incorrect"})
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="px-6 py-3 bg-gray-50 border-t">
        <div className="flex items-center text-sm text-gray-600">
          <Info className="h-4 w-4 mr-2" />
          Click on any row to see detailed information and improvement
          suggestions
        </div>
      </div>
    </div>
  );
}
