-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'TRAVELER',
    "travelStyle" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "GuideProfile" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "bio" TEXT,
    "kycStatus" TEXT NOT NULL DEFAULT 'unverified',
    "payoutMethod" TEXT,
    "stripeAccountId" TEXT,
    "ratingAvg" REAL DEFAULT 0,
    "toursCount" INTEGER NOT NULL DEFAULT 0,
    CONSTRAINT "GuideProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Tour" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guideId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT,
    "startTimes" JSONB,
    "basePrice" INTEGER NOT NULL,
    "currency" TEXT NOT NULL DEFAULT 'USD',
    "minGroup" INTEGER NOT NULL,
    "maxGroup" INTEGER NOT NULL,
    "durationMins" INTEGER NOT NULL,
    "language" TEXT NOT NULL,
    "languages" JSONB,
    "isPayWhatYouWant" BOOLEAN NOT NULL DEFAULT false,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "travelStyles" JSONB,
    "accessibility" JSONB,
    "startWindow" TEXT,
    "instantBook" BOOLEAN NOT NULL DEFAULT false,
    "hostRating" REAL DEFAULT 0,
    "cancellationPolicy" TEXT NOT NULL DEFAULT 'standard',
    "isDropIn" BOOLEAN NOT NULL DEFAULT false,
    "isEarlyBird" BOOLEAN NOT NULL DEFAULT false,
    "latitude" REAL,
    "longitude" REAL,
    "meetingPoint" TEXT,
    "tags" JSONB,
    "searchKeywords" JSONB,
    "whatsIncluded" JSONB,
    "whatsExcluded" JSONB,
    "requirements" JSONB,
    "highlights" JSONB,
    "itinerary" TEXT,
    "difficulty" TEXT,
    "ageRestriction" INTEGER,
    CONSTRAINT "Tour_guideId_fkey" FOREIGN KEY ("guideId") REFERENCES "GuideProfile" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TourMedia" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tourId" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    CONSTRAINT "TourMedia_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Booking" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tourId" TEXT NOT NULL,
    "travelerId" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "priceAtBooking" INTEGER NOT NULL,
    "headcount" INTEGER NOT NULL DEFAULT 1,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Booking_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Booking_travelerId_fkey" FOREIGN KEY ("travelerId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "RefreshToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "revoked" BOOLEAN NOT NULL DEFAULT false,
    "replacedById" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "RefreshToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "VerificationToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "tokenHash" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "VerificationToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "HostApplication" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "guideProfileId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "currentStep" INTEGER NOT NULL DEFAULT 1,
    "phoneVerified" BOOLEAN NOT NULL DEFAULT false,
    "kycSubmitted" BOOLEAN NOT NULL DEFAULT false,
    "payoutConnected" BOOLEAN NOT NULL DEFAULT false,
    "data" JSONB,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "HostApplication_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "HostApplication_guideProfileId_fkey" FOREIGN KEY ("guideProfileId") REFERENCES "GuideProfile" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "GroupFill" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tourId" TEXT NOT NULL,
    "currentCount" INTEGER NOT NULL DEFAULT 0,
    "targetCount" INTEGER NOT NULL,
    "dynamicPrice" INTEGER NOT NULL,
    "maxGroupPrice" INTEGER NOT NULL,
    "priceReductions" JSONB,
    "spotsLeft" INTEGER NOT NULL DEFAULT 0,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "GroupFill_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Preference" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "budgetMin" INTEGER,
    "budgetMax" INTEGER,
    "categories" JSONB,
    "cities" JSONB,
    "countries" JSONB,
    "preferredGroupSize" TEXT,
    "flexibleDates" BOOLEAN NOT NULL DEFAULT false,
    "preferredLanguages" JSONB,
    "travelStyles" JSONB,
    "accessibility" JSONB,
    "preferredDuration" JSONB,
    "startWindows" JSONB,
    "cancellationPolicy" JSONB,
    "maxBudgetAtFull" BOOLEAN NOT NULL DEFAULT false,
    "minHostRating" REAL DEFAULT 0,
    "instantBookOnly" BOOLEAN NOT NULL DEFAULT false,
    "notifyDropIns" BOOLEAN NOT NULL DEFAULT true,
    "notifyEarlyBird" BOOLEAN NOT NULL DEFAULT true,
    "notifyPriceDrops" BOOLEAN NOT NULL DEFAULT true,
    "updatedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Preference_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Alert" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "payload" JSONB NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Alert_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guideId" TEXT NOT NULL,
    "bookingId" TEXT,
    "amount" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "externalRef" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "Referral" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "referrerId" TEXT NOT NULL,
    "referredUserId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "creditAmount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "promoCode" TEXT,
    "discount" INTEGER NOT NULL DEFAULT 0,
    "total" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Cart_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "CartItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cartId" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "priceAtAdd" INTEGER NOT NULL,
    "headcount" INTEGER NOT NULL DEFAULT 1,
    "startTime" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "CartItem_cartId_fkey" FOREIGN KEY ("cartId") REFERENCES "Cart" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "CartItem_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Wishlist" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Wishlist_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "WishlistItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "wishlistId" TEXT NOT NULL,
    "tourId" TEXT NOT NULL,
    "addedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "WishlistItem_wishlistId_fkey" FOREIGN KEY ("wishlistId") REFERENCES "Wishlist" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "WishlistItem_tourId_fkey" FOREIGN KEY ("tourId") REFERENCES "Tour" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "GuideProfile_userId_key" ON "GuideProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HostApplication_userId_key" ON "HostApplication"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "HostApplication_guideProfileId_key" ON "HostApplication"("guideProfileId");

-- CreateIndex
CREATE UNIQUE INDEX "GroupFill_tourId_key" ON "GroupFill"("tourId");

-- CreateIndex
CREATE UNIQUE INDEX "Preference_userId_key" ON "Preference"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_key" ON "Cart"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "CartItem_cartId_tourId_key" ON "CartItem"("cartId", "tourId");

-- CreateIndex
CREATE UNIQUE INDEX "Wishlist_userId_key" ON "Wishlist"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "WishlistItem_wishlistId_tourId_key" ON "WishlistItem"("wishlistId", "tourId");
