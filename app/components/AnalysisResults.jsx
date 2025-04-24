"use client";

export default function AnalysisResults({ imageUrl, result, onReset }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">
          Analysis Results
        </h2>
        <button
          onClick={onReset}
          className="px-3 py-1 bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
        >
          Analyze Another
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 space-y-4">
          <div>
            <h3 className="text-lg font-medium text-gray-700 mb-2">
              Original Image:
            </h3>
            <img
              src={imageUrl}
              alt="News to verify"
              className="rounded-md border border-gray-200 w-full"
            />
          </div>

          {result?.extractedText && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                Extracted Text:
              </h3>
              <p className="text-gray-600 whitespace-pre-wrap">
                {result.extractedText}
              </p>
            </div>
          )}
        </div>

        <div className="md:w-1/2 space-y-4">
          <div
            className={`p-4 rounded-lg ${
              result?.isLikelyFake
                ? "bg-red-100 text-red-800"
                : "bg-green-100 text-green-800"
            }`}
          >
            <p className="font-semibold">
              {result?.isLikelyFake
                ? "⚠️ Likely Fake News"
                : "✅ Likely Authentic"}
            </p>
            <p className="mt-1 text-sm">
              Confidence: {result?.confidence || "N/A"}%
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-700">AI Analysis:</h4>
            <p className="mt-1 text-gray-600">
              {result?.analysis || "No analysis available"}
            </p>
          </div>

          {result?.sources?.length > 0 && (
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="font-medium text-gray-700">
                Verification Sources:
              </h4>
              <ul className="mt-2 space-y-2">
                {result.sources.map((source, index) => (
                  <li key={index} className="text-sm">
                    <a
                      href={source.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      {source.title || source.url}
                    </a>
                    {source.date && (
                      <span className="text-gray-500 ml-2">
                        ({source.date})
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
