# PhotoUploader Component

A comprehensive photo and video upload component for Next.js applications with support for arbitrary aspect ratios and multiple file formats.

## Features

✅ **Universal Image Support**: Accepts any image type (`image/*`)
✅ **No Dimension Restrictions**: Never rejects files based on dimensions
✅ **Instant Previews**: Uses `URL.createObjectURL()` for immediate file previews
✅ **Presigned Upload Flow**: Secure upload process (presign → PUT → register)
✅ **No Client Compression**: Files uploaded as-is, no quality loss
✅ **Responsive Design**: Works perfectly on mobile and desktop
✅ **Drag & Drop**: Full drag and drop support
✅ **Progress Tracking**: Individual upload progress for each file
✅ **Batch Upload**: Upload multiple files simultaneously
✅ **Type Safety**: Full TypeScript support

## Usage

```tsx
import PhotoUploader, { UploadedMedia } from "@/components/PhotoUploader";

function MyComponent() {
  const handleUpload = (media: UploadedMedia[]) => {
    console.log("Uploaded media:", media);
    // Handle successful uploads
  };

  const handleError = (error: string) => {
    console.log("Upload error:", error);
    // Handle upload errors
  };

  return (
    <PhotoUploader
      onUpload={handleUpload}
      onError={handleError}
      maxFiles={10}
      acceptedTypes={["image/*", "video/*"]}
      multiple={true}
    />
  );
}
```

## Props

| Prop            | Type                               | Default       | Description                                   |
| --------------- | ---------------------------------- | ------------- | --------------------------------------------- |
| `onUpload`      | `(media: UploadedMedia[]) => void` | -             | Callback when files are successfully uploaded |
| `onError`       | `(error: string) => void`          | -             | Callback when upload fails                    |
| `maxFiles`      | `number`                           | `10`          | Maximum number of files allowed               |
| `acceptedTypes` | `string[]`                         | `['image/*']` | Accepted file types                           |
| `className`     | `string`                           | `''`          | Additional CSS classes                        |
| `disabled`      | `boolean`                          | `false`       | Disable the uploader                          |
| `multiple`      | `boolean`                          | `true`        | Allow multiple file selection                 |

## API Endpoints

### POST `/api/media/presign`

Gets a presigned URL for file upload.

**Request Body:**

```json
{
  "filename": "image.jpg",
  "contentType": "image/jpeg",
  "size": 1024000
}
```

**Response:**

```json
{
  "uploadUrl": "https://...",
  "key": "uploads/123-image.jpg",
  "fields": {
    "Content-Type": "image/jpeg",
    "x-amz-acl": "public-read"
  }
}
```

### POST `/api/media`

Registers uploaded media in the database.

**Request Body:**

```json
{
  "key": "uploads/123-image.jpg",
  "filename": "image.jpg",
  "contentType": "image/jpeg",
  "size": 1024000
}
```

## Upload Flow

1. **File Selection**: User selects or drags files
2. **Validation**: File type and size validation
3. **Preview**: Instant preview using object URLs
4. **Presign**: Get upload URL from `/api/media/presign`
5. **Upload**: PUT file to presigned URL
6. **Register**: POST to `/api/media` to save metadata
7. **Complete**: Call `onUpload` callback with media data

## Configuration

### next.config.ts

The component requires proper image configuration:

```typescript
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.cloudfront.net",
        port: "",
        pathname: "/**",
      },
      // Add your CDN domains here
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};
```

## Demo

Visit `/photo-upload-demo` to see the component in action with all features demonstrated.

## Technical Details

- **No Client Processing**: Files are uploaded as-is without compression
- **Memory Management**: Object URLs are properly revoked to prevent memory leaks
- **Responsive Images**: Uses Next.js `Image` component with `fill`, `sizes`, and `object-cover`
- **Mobile First**: Touch-friendly interface with responsive grid
- **Accessibility**: Proper ARIA labels and keyboard navigation
- **Error Handling**: Comprehensive error handling with user feedback

## Browser Support

- Modern browsers with File API support
- Drag & drop requires modern browser
- Fallback to click-to-upload for older browsers
