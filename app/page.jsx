"use client";

import AnalysisResults from "@/app/components/AnalysisResults";
import ImageUploader from "@/app/components/ImageUploader";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useState } from "react";

export default function Home() {
  const [imageUrl, setImageUrl] = useState(null);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleImageUpload = async (url) => {
    setImageUrl(url);
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analyze-news", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl: url }),
      });

      if (!response.ok) {
        throw new Error("Analysis failed");
      }

      const data = await response.json();
      setAnalysisResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="relative min-h-screen bg-fixed bg-cover bg-center"
      style={{ backgroundImage: "url('/bg.jpg')" }}
    >
      {/* Dark overlay to improve text readability */}
      <div className="absolute h-full inset-0 bg-black/40 backdrop-blur"></div>

      <main className="container mx-auto px-4 py-8 relative z-10">
        <div className="relative max-w-4xl mx-auto backdrop-blur-lg bg-white/10 rounded-2xl shadow-xl overflow-hidden p-8 border border-white/20">
          {/* Glassmorphism decorative elements */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/15 to-white/5 mix-blend-overlay"></div>
          <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-transparent from-60% to-white/5"></div>

          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-center text-white mb-8 drop-shadow-md">
              AI Fake News Detector
            </h1>

            {!imageUrl ? (
              <ImageUploader onUpload={handleImageUpload} />
            ) : (
              <>
                {isLoading ? (
                  <div className="py-16">
                    <LoadingSpinner />
                    <p className="mt-4 text-center text-white/80 drop-shadow-sm">
                      Analyzing your image...
                    </p>
                  </div>
                ) : error ? (
                  <div className="relative p-5 rounded-xl backdrop-blur-sm bg-red-400/20 border border-red-400/30">
                    <p className="text-red-100 text-center drop-shadow-sm">
                      Error: {error}
                    </p>
                    <button
                      onClick={() => setImageUrl(null)}
                      className="mt-4 px-4 py-2 bg-white/20 hover:bg-white/30 text-white rounded-lg transition-all duration-200 border border-white/30 hover:border-white/40 backdrop-blur-sm mx-auto block"
                    >
                      Try Again
                    </button>
                  </div>
                ) : (
                  <AnalysisResults
                    imageUrl={imageUrl}
                    result={analysisResult}
                    onReset={() => {
                      setImageUrl(null);
                      setAnalysisResult(null);
                    }}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
