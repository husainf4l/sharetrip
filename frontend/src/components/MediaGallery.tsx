'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { HeartIcon, ShareIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartSolidIcon } from '@heroicons/react/24/solid';

export interface MediaItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  poster?: string;
}

interface MediaGalleryProps {
  items: MediaItem[];
  onWishlist?: (item: MediaItem) => void;
  onShare?: (item: MediaItem) => void;
  isWishlisted?: (item: MediaItem) => boolean;
}

export default function MediaGallery({
  items,
  onWishlist,
  onShare,
  isWishlisted = () => false
}: MediaGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!lightboxOpen) return;

    if (e.key === 'Escape') {
      setLightboxOpen(false);
    } else if (e.key === 'ArrowLeft') {
      setLightboxIndex(prev => prev > 0 ? prev - 1 : items.length - 1);
    } else if (e.key === 'ArrowRight') {
      setLightboxIndex(prev => prev < items.length - 1 ? prev + 1 : 0);
    }
  }, [lightboxOpen, items.length]);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    if (lightboxOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [lightboxOpen]);

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isMobile && !lightboxOpen) {
      if (isLeftSwipe && selectedIndex < items.length - 1) {
        setSelectedIndex(prev => prev + 1);
      }
      if (isRightSwipe && selectedIndex > 0) {
        setSelectedIndex(prev => prev - 1);
      }
    } else if (lightboxOpen) {
      if (isLeftSwipe) {
        setLightboxIndex(prev => prev < items.length - 1 ? prev + 1 : 0);
      }
      if (isRightSwipe) {
        setLightboxIndex(prev => prev > 0 ? prev - 1 : items.length - 1);
      }
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (direction === 'next') {
      setLightboxIndex(prev => prev < items.length - 1 ? prev + 1 : 0);
    } else {
      setLightboxIndex(prev => prev > 0 ? prev - 1 : items.length - 1);
    }
  };

  if (!items.length) return null;

  const currentItem = items[selectedIndex];
  const maxThumbnails = 4;
  const visibleThumbnails = items.slice(0, maxThumbnails);
  const remainingCount = items.length - maxThumbnails;

  if (isMobile) {
    return (
      <>
        <div className="relative w-full aspect-video bg-gray-100 overflow-hidden rounded-lg">
          <div
            className="flex transition-transform duration-300 ease-out h-full"
            style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            {items.map((item, index) => (
              <div key={item.id} className="w-full h-full flex-shrink-0 relative">
                {item.type === 'image' ? (
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover cursor-pointer"
                    onClick={() => openLightbox(index)}
                    sizes="100vw"
                  />
                ) : (
                  <video
                    src={item.src}
                    poster={item.poster}
                    className="w-full h-full object-cover cursor-pointer"
                    onClick={() => openLightbox(index)}
                    muted
                    playsInline
                  />
                )}
              </div>
            ))}
          </div>

          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => onWishlist?.(currentItem)}
              className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white/90 transition-colors"
              aria-label={isWishlisted(currentItem) ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isWishlisted(currentItem) ? (
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={() => onShare?.(currentItem)}
              className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white/90 transition-colors"
              aria-label="Share"
            >
              <ShareIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
            {items.map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === selectedIndex ? 'bg-white' : 'bg-white/50'
                }`}
                onClick={() => setSelectedIndex(index)}
                aria-label={`View image ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {renderLightbox()}
      </>
    );
  }

  function renderLightbox() {
    if (!lightboxOpen) return null;

    const lightboxItem = items[lightboxIndex];

    return (
      <div
        className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
        role="dialog"
        aria-modal="true"
        aria-label="Media lightbox"
      >
        <button
          onClick={closeLightbox}
          className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
          aria-label="Close lightbox"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {items.length > 1 && (
          <>
            <button
              onClick={() => navigateLightbox('prev')}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateLightbox('next')}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
              aria-label="Next image"
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </>
        )}

        <div
          className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center p-4"
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          {lightboxItem.type === 'image' ? (
            <Image
              src={lightboxItem.src}
              alt={lightboxItem.alt}
              width={1200}
              height={800}
              className="max-w-full max-h-full object-contain"
              sizes="100vw"
            />
          ) : (
            <video
              src={lightboxItem.src}
              poster={lightboxItem.poster}
              className="max-w-full max-h-full object-contain"
              controls
              autoPlay
            />
          )}
        </div>

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === lightboxIndex ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => setLightboxIndex(index)}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="flex gap-4 h-96">
        <div className="flex-1 relative bg-gray-100 rounded-lg overflow-hidden group">
          {currentItem.type === 'image' ? (
            <Image
              src={currentItem.src}
              alt={currentItem.alt}
              fill
              className="object-cover cursor-pointer transition-transform duration-200 group-hover:scale-105"
              onClick={() => openLightbox(selectedIndex)}
              sizes="(max-width: 768px) 100vw, 70vw"
            />
          ) : (
            <video
              src={currentItem.src}
              poster={currentItem.poster}
              className="w-full h-full object-cover cursor-pointer"
              onClick={() => openLightbox(selectedIndex)}
              muted
              playsInline
            />
          )}

          <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onWishlist?.(currentItem);
              }}
              className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white/90 transition-colors"
              aria-label={isWishlisted(currentItem) ? "Remove from wishlist" : "Add to wishlist"}
            >
              {isWishlisted(currentItem) ? (
                <HeartSolidIcon className="w-5 h-5 text-red-500" />
              ) : (
                <HeartIcon className="w-5 h-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onShare?.(currentItem);
              }}
              className="bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white/90 transition-colors"
              aria-label="Share"
            >
              <ShareIcon className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        <div className="w-32 flex flex-col gap-2">
          {visibleThumbnails.map((item, index) => (
            <div
              key={item.id}
              className={`relative h-20 bg-gray-100 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                index === selectedIndex ? 'border-blue-500 ring-2 ring-blue-200' : 'border-transparent hover:border-gray-300'
              }`}
              onClick={() => setSelectedIndex(index)}
            >
              {item.type === 'image' ? (
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
              ) : (
                <video
                  src={item.src}
                  poster={item.poster}
                  className="w-full h-full object-cover"
                  muted
                />
              )}
              {index === maxThumbnails - 1 && remainingCount > 0 && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">+{remainingCount}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {renderLightbox()}
    </>
  );
}