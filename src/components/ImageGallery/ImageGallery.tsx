"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XMarkIcon,
  MagnifyingGlassPlusIcon,
} from "@heroicons/react/24/outline";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title?: string;
  width?: number;
  height?: number;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  className?: string;
  showLightbox?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
}

const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  className = "",
  showLightbox = true,
  autoPlay = false,
  autoPlayInterval = 5000,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  
  const thumbnailContainerRef = useRef<HTMLDivElement>(null);
  const mainImageRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance
  const minSwipeDistance = 50;

  // Handle touch events for mobile swiping
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

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  // Navigation functions
  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [images.length, isTransitioning]);

  const goToPrevious = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [images.length, isTransitioning]);

  const goToIndex = (index: number) => {
    if (index === activeIndex || isTransitioning) return;
    setIsTransitioning(true);
    setActiveIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  // Lightbox functions
  const openLightbox = (index: number = activeIndex) => {
    if (!showLightbox) return;
    setLightboxIndex(index);
    setIsLightboxOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
    document.body.style.overflow = "unset";
  };

  const lightboxNext = () => {
    setLightboxIndex((prev) => (prev + 1) % images.length);
  };

  const lightboxPrevious = () => {
    setLightboxIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isLightboxOpen) {
        switch (event.key) {
          case "Escape":
            closeLightbox();
            break;
          case "ArrowLeft":
            lightboxPrevious();
            break;
          case "ArrowRight":
            lightboxNext();
            break;
        }
      } else {
        switch (event.key) {
          case "ArrowLeft":
            goToPrevious();
            break;
          case "ArrowRight":
            goToNext();
            break;
          case "Enter":
          case " ":
            if (document.activeElement === mainImageRef.current) {
              event.preventDefault();
              openLightbox();
            }
            break;
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isLightboxOpen, goToNext, goToPrevious]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isLightboxOpen) return;
    
    const interval = setInterval(goToNext, autoPlayInterval);
    return () => clearInterval(interval);
  }, [autoPlay, autoPlayInterval, goToNext, isLightboxOpen]);

  // Scroll thumbnail into view
  useEffect(() => {
    if (thumbnailContainerRef.current) {
      const container = thumbnailContainerRef.current;
      const activeThumbnail = container.children[activeIndex] as HTMLElement;
      
      if (activeThumbnail) {
        const containerWidth = container.offsetWidth;
        const thumbnailLeft = activeThumbnail.offsetLeft;
        const thumbnailWidth = activeThumbnail.offsetWidth;
        const scrollLeft = container.scrollLeft;
        
        if (thumbnailLeft < scrollLeft) {
          container.scrollTo({
            left: thumbnailLeft - 20,
            behavior: "smooth",
          });
        } else if (thumbnailLeft + thumbnailWidth > scrollLeft + containerWidth) {
          container.scrollTo({
            left: thumbnailLeft - containerWidth + thumbnailWidth + 20,
            behavior: "smooth",
          });
        }
      }
    }
  }, [activeIndex]);

  if (!images.length) return null;

  return (
    <>
      <div className={`image-gallery ${className}`}>
        {/* GetYourGuide Hero Gallery Layout */}
        <div className="relative">
          {/* Main Gallery Grid */}
          <div className="flex gap-2 h-[400px] md:h-[500px] lg:h-[600px]">
            {/* Large Main Image - 75% width */}
            <div
              ref={mainImageRef}
              className={`
                relative flex-1 w-3/4 bg-gray-200 rounded-2xl overflow-hidden shadow-lg
                cursor-pointer focus:outline-none focus:ring-2 focus:ring-getyourguide-blue
                hover:shadow-2xl transition-all duration-300 group hover:scale-[1.01]
                ${showLightbox ? "cursor-zoom-in" : ""}
              `}
            onClick={() => openLightbox()}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                openLightbox();
              }
            }}
            tabIndex={0}
            role="button"
            aria-label={`View ${images[activeIndex].alt} in fullscreen`}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
              <img
                src={images[activeIndex].src}
                alt={images[activeIndex].alt}
                className={`
                  w-full h-full object-cover transition-opacity duration-300 ease-in-out
                  ${isTransitioning ? "opacity-0" : "opacity-100"}
                `}
                style={{ minHeight: '200px', backgroundColor: '#f3f4f6' }}
                onError={(e) => {
                  console.error('Image failed to load:', images[activeIndex].src);
                  e.currentTarget.style.backgroundColor = '#ef4444';
                }}
                onLoad={(e) => {
                  console.log('Image loaded successfully:', images[activeIndex].src);
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              />
            
              {/* Zoom Icon Overlay - Always show hint */}
              {showLightbox && (
                <div className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center z-10 pointer-events-none">
                  <div className="bg-white/95 rounded-full p-4 opacity-0 group-hover:opacity-100 transform scale-75 group-hover:scale-100 transition-all duration-300 shadow-xl border-2 border-white/50">
                    <MagnifyingGlassPlusIcon className="w-7 h-7 text-gray-800" />
                  </div>
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-3 py-1 rounded-full text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Click to enlarge
                  </div>
                </div>
              )}

              {/* Navigation Arrows - Desktop */}
              <div className="hidden md:block">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToPrevious();
                  }}
                  className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-4 shadow-xl opacity-70 hover:opacity-100 group-hover:opacity-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-getyourguide-blue hover:scale-110 z-20 border border-gray-200"
                  aria-label="Previous image"
                >
                  <ChevronLeftIcon className="w-6 h-6 text-gray-800" />
                </button>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    goToNext();
                  }}
                  className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/95 hover:bg-white rounded-full p-4 shadow-xl opacity-70 hover:opacity-100 group-hover:opacity-100 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-getyourguide-blue hover:scale-110 z-20 border border-gray-200"
                  aria-label="Next image"
                >
                  <ChevronRightIcon className="w-6 h-6 text-gray-800" />
                </button>
              </div>

              {/* Image Counter */}
              <div className="absolute bottom-6 right-6 bg-black/90 text-white px-4 py-3 rounded-xl text-sm font-bold z-20 backdrop-blur-sm border border-white/20 shadow-xl">
                <div className="flex items-center gap-2">
                  <span>{activeIndex + 1} / {images.length}</span>
                  {showLightbox && (
                    <div className="flex items-center gap-1 text-xs opacity-70">
                      <MagnifyingGlassPlusIcon className="w-3 h-3" />
                      <span>Click to zoom</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Right Column - Thumbnail Grid - 25% width */}
            <div className="w-1/4 flex flex-col gap-2">
              {/* Show up to 4 thumbnails in vertical layout */}
              {images.slice(1, 5).map((image, index) => {
                const imageIndex = index + 1;
                return (
                  <button
                    key={image.id}
                    onClick={() => goToIndex(imageIndex)}
                    className={`
                      relative flex-1 aspect-[4/3] rounded-xl overflow-hidden transition-all duration-300
                      focus:outline-none focus:ring-2 focus:ring-getyourguide-blue cursor-pointer
                      hover:transform hover:scale-[1.05] hover:shadow-xl
                      ${imageIndex === activeIndex 
                        ? "ring-4 ring-getyourguide-blue shadow-xl scale-[1.02]" 
                        : "hover:ring-3 hover:ring-getyourguide-orange opacity-80 hover:opacity-100"
                      }
                    `}
                    aria-label={`View image ${imageIndex + 1}: ${image.alt}`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                      style={{ minHeight: '50px', backgroundColor: '#f3f4f6' }}
                      onError={(e) => {
                        console.error('Thumbnail failed to load:', image.src);
                        e.currentTarget.style.backgroundColor = '#ef4444';
                      }}
                      onLoad={(e) => {
                        console.log('Thumbnail loaded successfully:', image.src);
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    />
                    {/* Show overlay if not active */}
                    {imageIndex !== activeIndex && (
                      <div className="absolute inset-0 bg-gray-900/20 hover:bg-gray-900/5 transition-colors duration-300" />
                    )}
                    
                    {/* Thumbnail hover tooltip */}
                    <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-2 py-1 rounded text-xs opacity-0 hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-30">
                      Image {imageIndex + 1}
                    </div>
                    
                    {/* Show more indicator on last thumbnail if there are more images */}
                    {index === 3 && images.length > 5 && (
                      <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                        <div className="text-white font-bold text-lg">+{images.length - 4}</div>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Thumbnail Strip - Desktop (Hidden - replaced by grid) */}
        <div className="hidden">
          <div
            ref={thumbnailContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide pb-2"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => goToIndex(index)}
                className={`
                  relative flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden
                  border-3 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-getyourguide-blue
                  hover:transform hover:scale-105 hover:shadow-md
                  ${index === activeIndex 
                    ? "border-getyourguide-blue shadow-lg transform scale-105" 
                    : "border-gray-200 hover:border-gray-400"
                  }
                `}
                aria-label={`View image ${index + 1}: ${image.alt}`}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-full object-cover"
                />
                {index !== activeIndex && (
                  <div className="absolute inset-0 bg-gray-900 bg-opacity-30 transition-opacity duration-300" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile Dots Indicator - Only show on mobile */}
        <div className="md:hidden mt-4 flex flex-col items-center gap-3">
          <div className="flex justify-center gap-2">
            {images.slice(0, 8).map((_, index) => (
              <button
                key={index}
                onClick={() => goToIndex(index)}
                className={`
                  h-3 rounded-full transition-all duration-300 cursor-pointer
                  ${index === activeIndex ? "bg-getyourguide-blue w-8 shadow-md" : "bg-gray-300 w-3 hover:bg-getyourguide-orange active:scale-110"}
                `}
                aria-label={`Go to image ${index + 1}`}
              />
            ))}
            {images.length > 8 && (
              <span className="text-xs text-gray-500 ml-2 font-medium">+{images.length - 8}</span>
            )}
          </div>
          <div className="text-center text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
            Tap dots to navigate • Swipe images to browse
          </div>
        </div>
      </div>

      {/* Enhanced Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center animate-in fade-in duration-300">
          <div className="relative w-full h-full flex items-center justify-center p-4">
            {/* Enhanced Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 z-10 bg-white/20 hover:bg-white/30 text-white rounded-full p-3 transition-all duration-200 hover:scale-110 border border-white/20"
              aria-label="Close lightbox (Press Esc)"
            >
              <XMarkIcon className="w-7 h-7" />
            </button>
            
            {/* Instructions */}
            <div className="absolute top-6 left-6 z-10 bg-black/60 text-white px-4 py-2 rounded-full text-sm backdrop-blur-sm border border-white/20">
              Press ESC to close • Use arrow keys to navigate
            </div>

            {/* Lightbox Image */}
            <div className="relative max-w-full max-h-full">
              <img
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].alt}
                className="max-w-full max-h-full object-contain"
                style={{ minHeight: '300px', backgroundColor: '#1f2937' }}
                onError={(e) => {
                  console.error('Lightbox image failed to load:', images[lightboxIndex].src);
                  e.currentTarget.style.backgroundColor = '#ef4444';
                }}
                onLoad={(e) => {
                  console.log('Lightbox image loaded successfully:', images[lightboxIndex].src);
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              />
            </div>

            {/* Enhanced Lightbox Navigation */}
            <button
              onClick={lightboxPrevious}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20"
              aria-label="Previous image (Left arrow key)"
            >
              <ChevronLeftIcon className="w-7 h-7" />
            </button>
            
            <button
              onClick={lightboxNext}
              className="absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white rounded-full p-4 transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/20"
              aria-label="Next image (Right arrow key)"
            >
              <ChevronRightIcon className="w-7 h-7" />
            </button>

            {/* Enhanced Lightbox Counter */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-full backdrop-blur-sm border border-white/20">
              <div className="flex items-center gap-3">
                <span className="font-bold text-lg">{lightboxIndex + 1} of {images.length}</span>
                <div className="w-px h-4 bg-white/30"></div>
                <span className="text-sm opacity-70">Click outside to close</span>
              </div>
            </div>

            {/* Enhanced Image Title */}
            {images[lightboxIndex].title && (
              <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 bg-black/80 text-white px-6 py-3 rounded-xl max-w-2xl text-center backdrop-blur-sm border border-white/20">
                <h3 className="font-semibold text-lg">{images[lightboxIndex].title}</h3>
              </div>
            )}
            
            {/* Click outside to close */}
            <div 
              className="absolute inset-0 -z-10" 
              onClick={closeLightbox}
              aria-label="Click to close lightbox"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;