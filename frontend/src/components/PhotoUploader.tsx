"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import {
  XMarkIcon,
  PhotoIcon,
  CloudArrowUpIcon,
} from "@heroicons/react/24/outline";

export interface UploadedMedia {
  id: string;
  url: string;
  type: "image" | "video";
  filename: string;
  size: number;
}

interface PhotoUploaderProps {
  onUpload?: (media: UploadedMedia[]) => void;
  onError?: (error: string) => void;
  maxFiles?: number;
  acceptedTypes?: string[];
  className?: string;
  disabled?: boolean;
  multiple?: boolean;
}

export default function PhotoUploader({
  onUpload,
  onError,
  maxFiles = 10,
  acceptedTypes = ["image/*"],
  className = "",
  disabled = false,
  multiple = true,
}: PhotoUploaderProps) {
  const [files, setFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<{
    [key: string]: number;
  }>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileSelect = useCallback(
    (selectedFiles: FileList | null) => {
      if (!selectedFiles || disabled) return;

      const fileArray = Array.from(selectedFiles);

      // Check file count limit
      if (files.length + fileArray.length > maxFiles) {
        onError?.(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Validate file types
      const invalidFiles = fileArray.filter((file) => {
        return !acceptedTypes.some((type) => {
          if (type === "image/*") return file.type.startsWith("image/");
          if (type === "video/*") return file.type.startsWith("video/");
          return file.type === type;
        });
      });

      if (invalidFiles.length > 0) {
        onError?.(
          `Invalid file type: ${invalidFiles.map((f) => f.name).join(", ")}`
        );
        return;
      }

      // Create object URLs for previews
      const newPreviews = fileArray.map((file) => URL.createObjectURL(file));

      setFiles((prev) => [...prev, ...fileArray]);
      setPreviews((prev) => [...prev, ...newPreviews]);
    },
    [files.length, maxFiles, acceptedTypes, disabled, onError]
  );

  // Handle drag and drop
  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      handleFileSelect(e.dataTransfer.files);
    },
    [handleFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // Upload files
  const uploadFiles = useCallback(async () => {
    if (files.length === 0 || uploading) return;

    setUploading(true);
    const uploadedMedia: UploadedMedia[] = [];

    try {
      for (const file of files) {
        const progressKey = file.name;
        setUploadProgress((prev) => ({ ...prev, [progressKey]: 0 }));

        // Step 1: Get presigned URL
        const presignResponse = await fetch("/api/media/presign", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            contentType: file.type,
            size: file.size,
          }),
        });

        if (!presignResponse.ok) {
          throw new Error(`Failed to get upload URL for ${file.name}`);
        }

        const { uploadUrl, key } = await presignResponse.json();

        // Step 2: Upload file to presigned URL
        const uploadResponse = await fetch(uploadUrl, {
          method: "PUT",
          body: file,
          headers: {
            "Content-Type": file.type,
          },
        });

        if (!uploadResponse.ok) {
          throw new Error(`Failed to upload ${file.name}`);
        }

        setUploadProgress((prev) => ({ ...prev, [progressKey]: 50 }));

        // Step 3: Register media in database
        const registerResponse = await fetch("/api/media", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            key,
            filename: file.name,
            contentType: file.type,
            size: file.size,
          }),
        });

        if (!registerResponse.ok) {
          throw new Error(`Failed to register ${file.name}`);
        }

        const mediaData = await registerResponse.json();

        uploadedMedia.push({
          id: mediaData.id,
          url: mediaData.url,
          type: file.type.startsWith("image/") ? "image" : "video",
          filename: file.name,
          size: file.size,
        });

        setUploadProgress((prev) => ({ ...prev, [progressKey]: 100 }));
      }

      onUpload?.(uploadedMedia);

      // Clear files and previews after successful upload
      setFiles([]);
      setPreviews([]);
      setUploadProgress({});
    } catch (error) {
      onError?.(error instanceof Error ? error.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }, [files, uploading, onUpload, onError]);

  // Remove file
  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => {
      // Revoke object URL to prevent memory leaks
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  }, []);

  // Clear all files
  const clearAll = useCallback(() => {
    previews.forEach((url) => URL.revokeObjectURL(url));
    setFiles([]);
    setPreviews([]);
    setUploadProgress({});
  }, [previews]);

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Upload Area */}
      <div
        className={`
          relative border-2 border-dashed rounded-lg p-8 text-center transition-colors
          ${
            disabled
              ? "border-gray-300 bg-gray-50 cursor-not-allowed"
              : "border-gray-300 hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
          }
        `}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => !disabled && fileInputRef.current?.click()}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept={acceptedTypes.join(",")}
          multiple={multiple}
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
          disabled={disabled}
        />

        <div className="flex flex-col items-center space-y-4">
          <div className="p-4 bg-gray-100 rounded-full">
            <PhotoIcon className="w-8 h-8 text-gray-600" />
          </div>

          <div>
            <p className="text-lg font-medium text-gray-900">
              {disabled
                ? "Upload Disabled"
                : "Drop images here or click to browse"}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Supports: {acceptedTypes.join(", ")} • Max {maxFiles} files
            </p>
          </div>
        </div>
      </div>

      {/* File Previews */}
      {previews.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900">
              Selected Files ({files.length})
            </h3>
            <div className="flex space-x-2">
              <button
                onClick={clearAll}
                className="px-3 py-1 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                disabled={uploading}
              >
                Clear All
              </button>
              <button
                onClick={uploadFiles}
                disabled={uploading || disabled}
                className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <CloudArrowUpIcon className="w-4 h-4" />
                <span>{uploading ? "Uploading..." : "Upload Files"}</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {previews.map((preview, index) => (
              <div key={index} className="relative group">
                <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100">
                  <Image
                    src={preview}
                    alt={`Preview ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover"
                  />

                  {/* Remove button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeFile(index);
                    }}
                    className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    disabled={uploading}
                  >
                    <XMarkIcon className="w-4 h-4" />
                  </button>

                  {/* Upload progress */}
                  {uploadProgress[files[index]?.name] !== undefined && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1">
                      {uploadProgress[files[index].name]}%
                    </div>
                  )}
                </div>

                <div className="mt-2 text-xs text-gray-600 truncate">
                  {files[index]?.name}
                </div>
                <div className="text-xs text-gray-500">
                  {(files[index]?.size / 1024 / 1024).toFixed(1)} MB
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
