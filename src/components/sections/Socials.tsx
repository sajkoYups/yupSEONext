"use client";

interface SocialsProps {
  results: any;
}

export function Socials({ results }: SocialsProps) {
  const socialLinks = results.socialLinks || {};

  return (
    <section className="bg-white rounded-lg shadow-sm border p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        Social Media Analysis
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(socialLinks).map(([platform, url]: [string, any]) => (
          <div key={platform} className="bg-gray-50 rounded-lg p-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2 capitalize">
              {platform}
            </h3>
            {url ? (
              <a
                href={url as string}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 text-sm break-all"
              >
                {url as string}
              </a>
            ) : (
              <p className="text-gray-500 text-sm">Not found</p>
            )}
          </div>
        ))}

        {Object.keys(socialLinks).length === 0 && (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">No social media links found</p>
          </div>
        )}
      </div>
    </section>
  );
}
