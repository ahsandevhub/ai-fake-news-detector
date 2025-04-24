"use client";

import { useCallback, useState } from "react";

export default function ImageUploader({ onUpload }) {
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = useCallback(
    (file) => {
      if (!file) return;

      if (!file.type.match("image.*")) {
        setError("Please upload an image file");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        setError("File size should be less than 5MB");
        return;
      }

      setError(null);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target.result);
        onUpload(e.target.result);
      };
      reader.readAsDataURL(file);
    },
    [onUpload]
  );

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileChange(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div
        className={`relative rounded-2xl p-8 text-center transition-all duration-300 ${
          isDragging ? "border-blue-400/50" : "border-transparent"
        } border-2 backdrop-blur-lg bg-gray-500/20 shadow-lg`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {/* Glassmorphism effect layers */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500/30 to-gray-500/10 border border-gray-400/20"></div>
        <div className="absolute inset-0 rounded-2xl bg-blue-500/5 mix-blend-overlay"></div>

        <div className="relative z-10 flex flex-col items-center justify-center space-y-4">
          <div className="p-4 rounded-full bg-gray-500/20 backdrop-blur-sm border border-gray-400/30">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <p className="text-white/90 font-medium">
            {isDragging
              ? "Drop the image here"
              : "Drag & drop a news screenshot, or click to select"}
          </p>
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/*"
            onChange={(e) => handleFileChange(e.target.files?.[0])}
          />
          <label
            htmlFor="file-upload"
            className="px-5 py-2.5 bg-gray-500/20 hover:bg-gray-500/30 text-white rounded-lg cursor-pointer transition-all duration-200 border border-gray-400/30 hover:border-gray-400/40 backdrop-blur-sm shadow-sm"
          >
            Select Image
          </label>
        </div>
      </div>

      {error && (
        <div className="relative p-3 rounded-lg backdrop-blur-sm bg-red-400/20 border border-red-400/30">
          <p className="text-red-100 text-sm text-center">{error}</p>
        </div>
      )}

      {preview && (
        <div className="relative mt-4 p-5 rounded-2xl backdrop-blur-lg bg-gray-500/20 border border-gray-400/30 shadow-lg">
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-500/20 to-gray-500/10"></div>
          <div className="relative z-10">
            <h3 className="text-lg font-medium text-white/90 mb-3">Preview:</h3>
            <div className="p-1 rounded-xl bg-gray-500/20 border border-gray-400/30 overflow-hidden">
              <img
                src={preview}
                alt="Uploaded preview"
                className="w-full max-h-64 mx-auto rounded-lg object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
