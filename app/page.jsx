"use client"; // Mark as Client Component

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
    <div className="min-h-screen bg-gray-50">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          AI Fake News Detector
        </h1>

        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md overflow-hidden p-6">
          {!imageUrl ? (
            <ImageUploader onUpload={handleImageUpload} />
          ) : (
            <>
              {isLoading ? (
                <LoadingSpinner />
              ) : error ? (
                <div className="text-red-500 text-center py-4">
                  Error: {error}
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
      </main>
    </div>
  );
}
