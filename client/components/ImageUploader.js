"use client";

import { useState, useRef } from "react";
import axios from "axios";

/**
 * ImageUploader — uploads images to the server's /api/upload endpoint.
 * Props:
 *   existingImages: string[]        — already-saved URLs
 *   onImagesChange: (urls) => void  — called with the full updated URL array
 *   maxImages: number               — default 5
 */
export default function ImageUploader({
  existingImages = [],
  onImagesChange,
  maxImages = 5,
}) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const inputRef = useRef(null);

  // ── File upload to server ────────────────────────────────────────────────
  const handleFiles = async (files) => {
    setError("");
    const fileArr = Array.from(files);
    if (fileArr.length === 0) return;

    const remaining = maxImages - existingImages.length;
    if (fileArr.length > remaining) {
      setError(`You can only add ${remaining} more image(s).`);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to upload images.");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      const formData = new FormData();
      fileArr.forEach((file) => formData.append("images", file));

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e) => {
            if (e.total) {
              setProgress(Math.round((e.loaded / e.total) * 100));
            }
          },
        }
      );

      const newUrls = response.data.urls || [];
      onImagesChange([...existingImages, ...newUrls]);
    } catch (e) {
      console.error("Upload error:", e);
      setError(
        e.response?.data?.message ||
          "Upload failed. Please try the URL option below."
      );
    } finally {
      setUploading(false);
      setProgress(0);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  // ── URL input ────────────────────────────────────────────────────────────
  const addByUrl = () => {
    const trimmed = urlInput.trim();
    if (!trimmed) return;
    if (!/^https?:\/\/.+/.test(trimmed)) {
      setError("Please enter a valid URL starting with http:// or https://");
      return;
    }
    if (existingImages.length >= maxImages) {
      setError(`Maximum ${maxImages} images allowed.`);
      return;
    }
    setError("");
    onImagesChange([...existingImages, trimmed]);
    setUrlInput("");
  };

  const removeImage = (index) => {
    onImagesChange(existingImages.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-3">
      {/* Preview grid */}
      {existingImages.length > 0 && (
        <div className="grid grid-cols-3 gap-2">
          {existingImages.map((url, i) => (
            <div key={i} className="relative group">
              <img
                src={url}
                alt={`Image ${i + 1}`}
                className="w-full h-20 object-cover rounded border"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/plant-placeholder.svg";
                }}
              />
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-red-600 shadow"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      )}

      {existingImages.length < maxImages && (
        <>
          {/* File upload */}
          <div>
            <p className="text-xs font-medium text-gray-600 mb-1">
              Upload from device
            </p>
            <input
              ref={inputRef}
              type="file"
              multiple
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              disabled={uploading}
              onChange={(e) => handleFiles(e.target.files)}
              className="w-full p-2 border rounded-md text-sm disabled:opacity-50 cursor-pointer"
            />
            {uploading && (
              <div className="mt-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-gray-500 mt-1 text-center">
                  Uploading… {progress}%
                </p>
              </div>
            )}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* URL input */}
          <div>
            <p className="text-xs font-medium text-gray-600 mb-1">
              Paste image URL
            </p>
            <div className="flex gap-2">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => { setUrlInput(e.target.value); setError(""); }}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addByUrl())
                }
                placeholder="https://example.com/image.jpg"
                className="flex-1 p-2 border rounded-md text-sm"
              />
              <button
                type="button"
                onClick={addByUrl}
                className="px-3 py-2 bg-gray-100 border rounded-md text-sm hover:bg-gray-200 whitespace-nowrap font-medium"
              >
                Add
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-400">
            {existingImages.length}/{maxImages} images
          </p>
        </>
      )}

      {error && (
        <p className="text-red-500 text-xs bg-red-50 border border-red-200 p-2 rounded">
          {error}
        </p>
      )}
    </div>
  );
}
