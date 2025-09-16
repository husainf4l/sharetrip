'use client';

import { useState } from 'react';
import MediaGallery, { MediaItem } from '@/components/MediaGallery';

const sampleItems: MediaItem[] = [
  {
    id: '1',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Beautiful mountain landscape'
  },
  {
    id: '2',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Serene lake view'
  },
  {
    id: '3',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80',
    alt: 'Forest trail adventure'
  },
  {
    id: '4',
    type: 'video',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    alt: 'Sample video',
    poster: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  },
  {
    id: '5',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Ocean waves'
  },
  {
    id: '6',
    type: 'image',
    src: 'https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    alt: 'Golden sunset'
  }
];

export default function MediaGalleryDemo() {
  const [wishlistedItems, setWishlistedItems] = useState<Set<string>>(new Set());

  const handleWishlist = (item: MediaItem) => {
    setWishlistedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(item.id)) {
        newSet.delete(item.id);
      } else {
        newSet.add(item.id);
      }
      return newSet;
    });
  };

  const handleShare = (item: MediaItem) => {
    if (navigator.share) {
      navigator.share({
        title: item.alt,
        url: item.src,
      });
    } else {
      navigator.clipboard.writeText(item.src);
      alert('Link copied to clipboard!');
    }
  };

  const isWishlisted = (item: MediaItem) => wishlistedItems.has(item.id);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Media Gallery Demo</h1>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Sample Tour Gallery</h2>
          <MediaGallery
            items={sampleItems}
            onWishlist={handleWishlist}
            onShare={handleShare}
            isWishlisted={isWishlisted}
          />
        </div>

        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Features:</h3>
          <ul className="space-y-2 text-gray-600">
            <li>• Desktop: Main image with thumbnail grid</li>
            <li>• Mobile: Swipeable carousel with dots indicator</li>
            <li>• Lightbox modal with keyboard navigation (← → ESC)</li>
            <li>• Touch/swipe gestures for mobile navigation</li>
            <li>• Wishlist and share button overlays</li>
            <li>• Video support with poster images</li>
            <li>• +N badge when more than 4 items</li>
            <li>• Full accessibility support (ARIA labels, focus management)</li>
            <li>• Responsive design with optimized Next.js Image component</li>
          </ul>
        </div>

        <div className="mt-4 text-sm text-gray-500">
          <p>Wishlisted items: {wishlistedItems.size}</p>
          <p>Try resizing your browser window to see mobile vs desktop layouts</p>
        </div>
      </div>
    </div>
  );
}