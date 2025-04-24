"use client";

export default function AnalysisResults({ imageUrl, result, onReset }) {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-white/90">
          Analysis Results
        </h2>
        <button
          onClick={onReset}
          className="relative px-4 py-2 bg-gray-500/20 hover:bg-blue-500/30 text-white rounded-lg transition-all duration-200 border border-gray-400/30 hover:border-blue-400/40 backdrop-blur-sm shadow-sm"
        >
          Analyze Another
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 space-y-4">
          {/* Original Image Card */}
          <div className="relative rounded-2xl p-5 backdrop-blur-lg bg-gray-500/20 border border-gray-400/30 shadow-lg overflow-hidden">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-500/10"></div>
            <div className="relative z-10">
              <h3 className="text-lg font-medium text-white/90 mb-3">
                Original Image:
              </h3>
              <div className="rounded-xl bg-gray-500/20 border border-gray-400/30 overflow-hidden">
                <img
                  src={imageUrl}
                  alt="News to verify"
                  className="w-full rounded-lg object-contain"
                />
              </div>
            </div>
          </div>

          {/* Extracted Text Card */}
          {result?.extractedText && (
            <div className="relative rounded-2xl p-5 backdrop-blur-lg bg-gray-500/20 border border-gray-400/30 shadow-lg">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-500/10"></div>
              <div className="relative z-10">
                <h3 className="text-lg font-medium text-white/90 mb-2">
                  Extracted Text:
                </h3>
                <div className="p-3 rounded-lg bg-white/10 border border-gray-400/20">
                  <p className="text-white/80 whitespace-pre-wrap">
                    {result.extractedText}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="md:w-1/2 space-y-4">
          {/* Authenticity Result Card */}
          <div
            className={`relative rounded-2xl p-5 backdrop-blur-lg border shadow-lg overflow-hidden ${
              result?.isLikelyFake
                ? "bg-red-500/50 border-red-400/30"
                : "bg-green-500/50 border-green-400/30"
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gray-500/20 to-gray-500/10"></div>
            <div className="relative z-10">
              <p className="font-semibold text-white/90">
                {result?.isLikelyFake
                  ? "⚠️ Likely Fake News"
                  : "✅ Likely Authentic"}
              </p>
              <p className="mt-1 text-sm text-white/80">
                Confidence: {result?.confidence || "N/A"}%
              </p>
            </div>
          </div>

          {/* AI Analysis Card */}
          <div className="relative rounded-2xl p-5 backdrop-blur-lg bg-gray-500/20 border border-gray-400/30 shadow-lg">
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-500/10"></div>
            <div className="relative z-10">
              <h4 className="font-medium text-white/90">AI Analysis:</h4>
              <div className="mt-2 p-3 rounded-lg bg-white/10 border border-gray-400/20">
                <p className="text-white/80">
                  {result?.analysis || "No analysis available"}
                </p>
              </div>
            </div>
          </div>

          {/* Verification Sources Card */}
          {result?.sources?.length > 0 && (
            <div className="relative rounded-2xl p-5 backdrop-blur-lg bg-gray-500/20 border border-gray-400/30 shadow-lg">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-500/10"></div>
              <div className="relative z-10">
                <h4 className="font-medium text-white/90">
                  Verification Sources:
                </h4>
                <ul className="mt-2 space-y-2">
                  {result.sources.map((source, index) => (
                    <li key={index} className="text-sm">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-200 hover:text-blue-100 hover:underline"
                      >
                        {source.title || source.url}
                      </a>
                      {source.date && (
                        <span className="text-white/60 ml-2">
                          ({source.date})
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
