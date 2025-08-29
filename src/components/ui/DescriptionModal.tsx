"use client";

import { X } from "lucide-react";

interface DescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  improvements: string[];
}

export function DescriptionModal({
  isOpen,
  onClose,
  title,
  description,
  improvements,
}: DescriptionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-xl font-semibold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="p-6">
          <p className="text-gray-700 mb-4">{description}</p>

          {improvements.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-3">
                Improvements:
              </h3>
              <ul className="list-disc list-inside space-y-2">
                {improvements.map((improvement, index) => (
                  <li key={index} className="text-gray-700">
                    {improvement}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="flex justify-end p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
