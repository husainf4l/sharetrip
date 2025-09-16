"use client";

import { useCart } from "../../contexts/CartContext";
import Link from "next/link";
import Image from "next/image";
import { HeartIcon, ShoppingBagIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function WishlistPage() {
  const {
    wishlistItems,
    removeFromWishlist,
    addToCart,
    cartItems
  } = useCart();

  const formatPrice = (price: number, currency: string = "USD") => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency,
      minimumFractionDigits: 0,
    }).format(price);
  };

  const isInCart = (id: string) => {
    return cartItems.some(item => item.id === id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <HeartIcon className="w-12 h-12 text-gray-400" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your wishlist is empty</h1>
          <p className="text-gray-600 mb-6">Save tours you love for later!</p>
          <Link
            href="/tours"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Browse Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
          <span className="text-gray-600">{wishlistItems.length} items</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-3 right-3 p-2 bg-white rounded-full shadow-sm hover:bg-red-50 transition-colors"
                >
                  <XMarkIcon className="w-4 h-4 text-gray-600 hover:text-red-600" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                  {item.title}
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <span className="text-xl font-bold text-gray-900">
                    {formatPrice(item.price, item.currency)}
                  </span>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => addToCart({
                      id: item.id,
                      title: item.title,
                      price: item.price,
                      currency: item.currency,
                      image: item.image
                    })}
                    disabled={isInCart(item.id)}
                    className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isInCart(item.id)
                        ? 'bg-green-100 text-green-700 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    <ShoppingBagIcon className="w-4 h-4" />
                    {isInCart(item.id) ? 'In Cart' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/tours"
            className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Continue Browsing
          </Link>
        </div>
      </div>
    </div>
  );
}