'use client';

import { useState } from 'react';
import PhotoUploader, { UploadedMedia } from '@/components/PhotoUploader';

export default function PhotoUploadDemo() {
  const [uploadedMedia, setUploadedMedia] = useState<UploadedMedia[]>([]);
  const [errors, setErrors] = useState<string[]>([]);

  const handleUpload = (media: UploadedMedia[]) => {
    setUploadedMedia(prev => [...prev, ...media]);
    setErrors([]);
  };

  const handleError = (error: string) => {
    setErrors(prev => [...prev, error]);
  };

  const clearErrors = () => {
    setErrors([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Photo Uploader Demo
            </h1>
            <p className="text-gray-600">
              Upload images and videos with drag & drop. Supports any aspect ratio and size.
            </p>
          </div>

          {/* Error Messages */}
          {errors.length > 0 && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-red-800">Upload Errors:</h3>
                  <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                    {errors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
                <button
                  onClick={clearErrors}
                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Photo Uploader */}
          <div className="mb-8">
            <PhotoUploader
              onUpload={handleUpload}
              onError={handleError}
              maxFiles={10}
              acceptedTypes={['image/*', 'video/*']}
              multiple={true}
            />
          </div>

          {/* Uploaded Media Gallery */}
          {uploadedMedia.length > 0 && (
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Uploaded Media ({uploadedMedia.length})
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {uploadedMedia.map((media) => (
                  <div key={media.id} className="bg-gray-50 rounded-lg overflow-hidden">
                    <div className="aspect-square relative">
                      {media.type === 'image' ? (
                        <img
                          src={media.url}
                          alt={media.filename}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <video
                          src={media.url}
                          className="w-full h-full object-cover"
                          controls
                        />
                      )}
                    </div>

                    <div className="p-3">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {media.filename}
                      </p>
                      <p className="text-xs text-gray-500">
                        {(media.size / 1024 / 1024).toFixed(1)} MB
                      </p>
                      <p className="text-xs text-gray-400 uppercase">
                        {media.type}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex justify-center">
                <button
                  onClick={() => setUploadedMedia([])}
                  className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded hover:bg-red-700"
                >
                  Clear All Uploaded Media
                </button>
              </div>
            </div>
          )}

          {/* Features List */}
          <div className="mt-12 border-t pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Features Implemented:
            </h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ <strong>Accepts any image type:</strong> image/* input attribute</li>
              <li>✅ <strong>No dimension restrictions:</strong> Never rejects by dimensions</li>
              <li>✅ <strong>Object URL previews:</strong> Uses URL.createObjectURL for instant previews</li>
              <li>✅ <strong>Presigned upload flow:</strong> presign → PUT → POST /api/media</li>
              <li>✅ <strong>No client compression:</strong> Files uploaded as-is</li>
              <li>✅ <strong>Responsive next/image:</strong> fill + sizes + object-cover for any aspect ratio</li>
              <li>✅ <strong>CDN support:</strong> next.config with multiple remotePatterns</li>
              <li>✅ <strong>No hard blocks:</strong> Arbitrary aspect ratios accepted</li>
              <li>✅ <strong>Mobile responsive:</strong> Grid adapts to screen size</li>
              <li>✅ <strong>Progress tracking:</strong> Upload progress per file</li>
              <li>✅ <strong>Drag & drop:</strong> Full drag and drop support</li>
              <li>✅ <strong>Multiple file upload:</strong> Batch upload with individual progress</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}