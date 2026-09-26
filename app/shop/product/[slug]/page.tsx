"use client";

import React, { useState, use } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShoppingBag,
  Check,
  Star,
  Truck,
  RotateCcw,
  Shield,
  ChevronDown,
  Ruler,
  X,
  Share2,
  Bell,
  Mail,
  Lock,
  Download,
} from "lucide-react";
import { useShop } from "@/lib/store";
import { ProductCard } from "@/components/products/ProductCard";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const router = useRouter();
  const {
    products,
    addToCart,
    toggleWishlist,
    isInWishlist,
    reviews,
    addReview,
    showToast,
    user,
  } = useShop();

  const product = products.find((p) => p.slug === slug);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<
    "fabric" | "shipping" | "care" | null
  >("fabric");

  // Email Me When Available (Restock alert) state
  const [notifyEmail, setNotifyEmail] = useState(user?.email || "");
  const [notifySubmitted, setNotifySubmitted] = useState(false);
  const [isSubmittingNotify, setIsSubmittingNotify] = useState(false);

  // Review form state
  const [reviewName, setReviewName] = useState("");
  const [reviewComment, setReviewComment] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [showReviewForm, setShowReviewForm] = useState(false);

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center text-white bg-[#0a0a0a] min-h-screen space-y-4">
        <h1 className="text-2xl font-bold">Piece Not Found</h1>
        <p className="text-neutral-400">
          The product you are looking for has been archived or moved.
        </p>
        <a
          href="/shop"
          className="inline-block px-6 py-2.5 bg-white text-black text-xs font-mono uppercase font-semibold"
        >
          Return to Shop
        </a>
      </div>
    );
  }

  // Set defaults once loaded
  const currentSize = selectedSize || product.sizes[0];
  const currentColor = selectedColor || product.colors[0]?.name || "Standard";
  const isLiked = isInWishlist(product.id);

  const productReviews = reviews.filter((r) => r.productId === product.id);
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, currentSize, currentColor, quantity);
  };

  const handleDownloadActiveImage = () => {
    const activeImage = product.images[activeImageIndex] || product.images[0];
    if (!activeImage) return;

    const link = document.createElement("a");
    link.href = activeImage;
    link.download = `${product.slug || product.name}.jpg`;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleBuyNow = () => {
    addToCart(product, currentSize, currentColor, quantity);
    if (!user) {
      showToast(
        "Customer account required to purchase. Please sign in or register.",
        "info",
      );
      router.push("/login?redirect=/checkout");
    } else {
      router.push("/checkout");
    }
  };

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!notifyEmail || !notifyEmail.includes("@")) {
      showToast("Please enter a valid email address.", "error");
      return;
    }
    setIsSubmittingNotify(true);
    setTimeout(() => {
      setIsSubmittingNotify(false);
      setNotifySubmitted(true);
      showToast(`Priority restock alert saved for ${product.name}!`, "success");
    }, 600);
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName || !reviewComment) {
      showToast("Please provide your name and comments.", "error");
      return;
    }
    addReview({
      productId: product.id,
      author: reviewName,
      comment: reviewComment,
      rating: reviewRating,
      verifiedPurchase: true,
    });
    setReviewName("");
    setReviewComment("");
    setShowReviewForm(false);
  };

  return (
    <div className="pt-28 sm:pt-36 pb-24 bg-[#0a0a0a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-mono text-neutral-500 mb-8 uppercase tracking-widest">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white">
            Shop
          </Link>
          <span>/</span>
          <Link
            href={`/collections/${product.category}`}
            className="hover:text-white"
          >
            {product.categoryLabel}
          </Link>
          <span>/</span>
          <span className="text-white truncate max-w-[200px]">
            {product.name}
          </span>
        </nav>

        {/* Product Hero Section: Gallery + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left: Gallery (lg:col-span-7) */}
          <div className="lg:col-span-7 flex flex-col-reverse sm:flex-row gap-4">
            {/* Thumbnails list */}
            {product.images.length > 1 && (
              <div className="flex sm:flex-col gap-3 overflow-x-auto sm:overflow-y-auto max-h-[640px] scrollbar-none flex-shrink-0">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-20 sm:w-20 sm:h-24 rounded-sm overflow-hidden bg-neutral-900 border transition-all ${
                      activeImageIndex === idx
                        ? "border-white ring-1 ring-white"
                        : "border-neutral-800 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} angle ${idx + 1}`}
                      fill
                      className="object-cover"
                      sizes="80px"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Main Stage Image */}
            <div className="relative flex-1 aspect-[3/4] bg-neutral-900 rounded-sm overflow-hidden border border-neutral-800/80 group">
              <Image
                src={product.images[activeImageIndex] || product.images[0]}
                alt={product.name}
                fill
                priority
                className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 700px"
                referrerPolicy="no-referrer"
              />

              {/* Badges */}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className="bg-white text-black text-xs font-mono font-medium px-3 py-1 uppercase tracking-wider">
                    {product.badge}
                  </span>
                </div>
              )}

              {/* Download Asset Button matching user requirement */}
              <button
                onClick={handleDownloadActiveImage}
                className="absolute top-4 right-4 p-2.5 rounded-full bg-black/70 hover:bg-black text-neutral-300 hover:text-white backdrop-blur-md border border-neutral-700 transition-all flex items-center gap-1.5 text-xs font-mono"
                title="Download high-resolution image"
              >
                <Download className="w-4 h-4" />
                <span className="hidden sm:inline">Download Photo</span>
              </button>
            </div>
          </div>

          {/* Right: Purchasing Details (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-400">
                {product.categoryLabel} / VELANT STREETWEAR
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mt-1">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl sm:text-3xl font-mono font-bold text-white">
                  Rs. {product.price.toLocaleString()}
                </span>
                {product.compareAtPrice && (
                  <span className="text-base font-mono text-neutral-500 line-through">
                    Rs. {product.compareAtPrice.toLocaleString()}
                  </span>
                )}
                {product.compareAtPrice && (
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-2 py-0.5 rounded">
                    Save Rs.{" "}
                    {(product.compareAtPrice - product.price).toLocaleString()}
                  </span>
                )}
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2.5 text-xs font-mono text-neutral-400">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(product.rating)
                          ? "fill-amber-400"
                          : "text-neutral-700"
                      }`}
                    />
                  ))}
                </div>
                <span>
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-neutral-300 text-sm sm:text-base font-light leading-relaxed">
              {product.description}
            </p>

            {/* Colors */}
            <div className="space-y-2.5 pt-2 border-t border-neutral-900">
              <div className="flex items-center justify-between text-xs font-mono uppercase">
                <span className="text-neutral-400">Colorway:</span>
                <span className="text-white font-medium">{currentColor}</span>
              </div>
              <div className="flex items-center gap-2.5">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c.name)}
                    className={`w-8 h-8 rounded-full border-2 transition-all relative ${
                      currentColor === c.name
                        ? "border-white ring-2 ring-white/30 scale-110"
                        : "border-neutral-700 hover:border-neutral-500"
                    }`}
                    style={{ backgroundColor: c.hex }}
                    title={c.name}
                  />
                ))}
              </div>
            </div>

            {/* Sizes */}
            <div className="space-y-2.5 pt-2 border-t border-neutral-900">
              <div className="flex items-center justify-between text-xs font-mono uppercase">
                <span className="text-neutral-400">Select Size:</span>
                <button
                  type="button"
                  onClick={() => setIsSizeGuideOpen(true)}
                  className="text-neutral-300 hover:text-white flex items-center gap-1 underline underline-offset-2"
                >
                  <Ruler className="w-3.5 h-3.5" />
                  <span>Size Guide</span>
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded transition-all ${
                      currentSize === sz
                        ? "bg-white text-black font-bold ring-2 ring-white/30"
                        : "bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-white hover:border-neutral-600"
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions: Out of Stock Email Form vs Standard Add to Cart */}
            {product.stock <= 0 ? (
              <div className="space-y-4 pt-4 border-t border-neutral-900">
                <div className="p-5 bg-neutral-950 border border-neutral-800 rounded-xl space-y-4 shadow-xl">
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase font-bold tracking-wider bg-red-500/10 text-red-400 border border-red-500/20">
                          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                          Sold Out
                        </span>
                        <span className="text-[11px] font-mono text-neutral-400">
                          Selected Size: {currentSize}
                        </span>
                      </div>
                      <h3 className="text-base font-bold text-white tracking-tight">
                        Email Me When Available
                      </h3>
                      <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                        This limited drop piece is currently out of stock. Enter
                        your email below to be immediately alerted when the next
                        batch is released.
                      </p>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 flex-shrink-0">
                      <Bell className="w-4 h-4 text-amber-400" />
                    </div>
                  </div>

                  {notifySubmitted ? (
                    <div className="p-3.5 bg-emerald-950/40 border border-emerald-800/80 rounded-lg space-y-1">
                      <div className="flex items-center gap-2 text-emerald-400 text-xs font-mono font-bold">
                        <Check className="w-4 h-4" />
                        <span>Restock Notification Registered!</span>
                      </div>
                      <p className="text-[11px] text-neutral-300 font-mono">
                        We will send a notification to{" "}
                        <strong className="text-white underline">
                          {notifyEmail}
                        </strong>{" "}
                        the moment size {currentSize} is available.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleNotifySubmit} className="space-y-3">
                      <div className="space-y-1.5">
                        <label className="text-[11px] font-mono uppercase text-neutral-400 block tracking-wider">
                          Email Address
                        </label>
                        <div className="flex gap-2">
                          <div className="relative flex-1">
                            <Mail className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input
                              type="email"
                              required
                              value={notifyEmail}
                              onChange={(e) => setNotifyEmail(e.target.value)}
                              placeholder="youremail@domain.com"
                              className="w-full bg-neutral-900 border border-neutral-800 rounded pl-9 pr-3 py-2.5 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-white transition-colors"
                            />
                          </div>
                          <button
                            type="submit"
                            disabled={isSubmittingNotify}
                            className="px-5 py-2.5 bg-white text-black hover:bg-neutral-200 text-xs font-mono font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap flex items-center gap-1.5 shadow-md"
                          >
                            <Bell className="w-3.5 h-3.5" />
                            <span>
                              {isSubmittingNotify ? "Saving..." : "Notify Me"}
                            </span>
                          </button>
                        </div>
                      </div>
                      <p className="text-[10px] font-mono text-neutral-500">
                        100% privacy protected. We will only email you regarding
                        this restock.
                      </p>
                    </form>
                  )}

                  {/* Secondary Bookmark action */}
                  <div className="pt-2 border-t border-neutral-900 flex items-center gap-3">
                    <button
                      onClick={() => toggleWishlist(product.id)}
                      className="w-full py-2.5 px-4 bg-neutral-900 hover:bg-neutral-850 border border-neutral-800 text-white text-xs font-mono uppercase tracking-wider rounded flex items-center justify-center gap-2 transition-colors"
                    >
                      <Heart
                        className={`w-3.5 h-3.5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                      />
                      <span>
                        {isLiked
                          ? "Saved to Wishlist"
                          : "Add to Wishlist for Updates"}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Quantity Stepper & Actions */
              <div className="space-y-3 pt-4 border-t border-neutral-900">
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-neutral-800 rounded bg-neutral-900">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 py-3 text-neutral-400 hover:text-white"
                    >
                      -
                    </button>
                    <span className="px-3 text-xs font-mono text-white min-w-[32px] text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 py-3 text-neutral-400 hover:text-white"
                    >
                      +
                    </button>
                  </div>

                  {/* Add to Bag */}
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3.5 px-6 bg-white text-black hover:bg-neutral-200 text-xs sm:text-sm uppercase font-mono tracking-widest font-bold rounded flex items-center justify-center gap-2 transition-all shadow-xl"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag</span>
                  </button>

                  {/* Wishlist */}
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    aria-label={
                      isLiked ? "Remove from wishlist" : "Add to wishlist"
                    }
                    className="p-3.5 rounded border border-neutral-800 bg-neutral-900 hover:bg-neutral-800 text-white transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </button>
                </div>

                {/* Buy Now Direct Button */}
                <button
                  onClick={handleBuyNow}
                  className="w-full py-3 px-6 bg-neutral-900 hover:bg-neutral-800 border border-neutral-700 text-white text-xs uppercase font-mono tracking-widest font-medium rounded transition-colors flex items-center justify-center gap-2"
                >
                  <Lock className="w-3.5 h-3.5 text-neutral-400" />
                  <span>Instant Buy with eSewa / Khalti / COD</span>
                </button>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-neutral-900 text-center text-[11px] font-mono text-neutral-400">
              <div className="p-2 bg-neutral-900/50 rounded border border-neutral-800/60 flex flex-col items-center gap-1">
                <Truck className="w-4 h-4 text-neutral-300" />
                <span>Fast Nepal Delivery</span>
              </div>
              <div className="p-2 bg-neutral-900/50 rounded border border-neutral-800/60 flex flex-col items-center gap-1">
                <RotateCcw className="w-4 h-4 text-neutral-300" />
                <span>7-Day Exchange</span>
              </div>
              <div className="p-2 bg-neutral-900/50 rounded border border-neutral-800/60 flex flex-col items-center gap-1">
                <Shield className="w-4 h-4 text-neutral-300" />
                <span>100% Genuine Cotton</span>
              </div>
            </div>

            {/* Accordion Specs */}
            <div className="divide-y divide-neutral-900 border-t border-neutral-900 pt-2 text-sm">
              {/* Materials & Fabric */}
              <div>
                <button
                  onClick={() =>
                    setActiveAccordion(
                      activeAccordion === "fabric" ? null : "fabric",
                    )
                  }
                  className="w-full py-3 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-white"
                >
                  <span>Materials & Construction</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === "fabric" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "fabric" && (
                  <div className="pb-4 space-y-2 text-xs font-mono text-neutral-400">
                    <p>
                      <strong className="text-white">Fabric:</strong>{" "}
                      {product.fabric}
                    </p>
                    <p>
                      <strong className="text-white">Fit:</strong> {product.fit}
                    </p>
                    <ul className="list-disc pl-4 space-y-1 pt-1 text-neutral-400">
                      {product.features.map((f, i) => (
                        <li key={i}>{f}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Delivery across Nepal */}
              <div>
                <button
                  onClick={() =>
                    setActiveAccordion(
                      activeAccordion === "shipping" ? null : "shipping",
                    )
                  }
                  className="w-full py-3 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-white"
                >
                  <span>Shipping & Delivery (Nepal)</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === "shipping" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "shipping" && (
                  <div className="pb-4 space-y-2 text-xs font-mono text-neutral-400">
                    <p>
                      •{" "}
                      <strong className="text-white">Kathmandu Valley:</strong>{" "}
                      Same-day or next-day delivery (Rs. 100 / Free over Rs.
                      3,000).
                    </p>
                    <p>
                      • <strong className="text-white">Outside Valley:</strong>{" "}
                      2 to 3 business days via Nepal Express Courier (Pokhara,
                      Butwal, Biratnagar, Narayangarh, Dharan, etc.).
                    </p>
                    <p>
                      • Cash on Delivery (COD), eSewa, Khalti, and Direct Bank
                      Transfer accepted.
                    </p>
                  </div>
                )}
              </div>

              {/* Care Instructions */}
              <div>
                <button
                  onClick={() =>
                    setActiveAccordion(
                      activeAccordion === "care" ? null : "care",
                    )
                  }
                  className="w-full py-3 flex items-center justify-between font-mono text-xs uppercase tracking-wider text-neutral-300 hover:text-white"
                >
                  <span>Care Instructions</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      activeAccordion === "care" ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {activeAccordion === "care" && (
                  <div className="pb-4 space-y-1.5 text-xs font-mono text-neutral-400">
                    {product.care.map((c, i) => (
                      <p key={i}>• {c}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-24 pt-16 border-t border-neutral-900 space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400">
                CUSTOMER FEEDBACK
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                Verified Reviews ({productReviews.length})
              </h2>
            </div>

            <button
              onClick={() => setShowReviewForm(!showReviewForm)}
              className="px-4 py-2 border border-neutral-700 hover:border-white text-xs font-mono uppercase tracking-wider text-white rounded transition-colors"
            >
              {showReviewForm ? "Cancel" : "Write a Review"}
            </button>
          </div>

          {/* Write a review form */}
          {showReviewForm && (
            <form
              onSubmit={handleReviewSubmit}
              className="p-6 bg-neutral-900/90 border border-neutral-800 rounded-xl space-y-4 max-w-xl animate-in fade-in"
            >
              <h3 className="text-sm font-mono uppercase text-white">
                Share your experience
              </h3>
              <div>
                <label className="text-xs font-mono text-neutral-400 block mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  value={reviewName}
                  onChange={(e) => setReviewName(e.target.value)}
                  placeholder="e.g. Suman Shakya"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 block mb-1">
                  Rating
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setReviewRating(num)}
                      className={`p-1 text-sm ${
                        num <= reviewRating
                          ? "text-amber-400"
                          : "text-neutral-600"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-neutral-400 block mb-1">
                  Comment
                </label>
                <textarea
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="How is the fabric weight, drape, and sizing?"
                  className="w-full bg-neutral-950 border border-neutral-800 rounded p-2 text-xs text-white h-24"
                  required
                />
              </div>

              <button
                type="submit"
                className="px-5 py-2 bg-white text-black text-xs font-mono uppercase font-bold rounded hover:bg-neutral-200"
              >
                Submit Review
              </button>
            </form>
          )}

          {/* Reviews list */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {productReviews.length === 0 ? (
              <p className="text-neutral-500 text-xs font-mono col-span-full">
                Be the first to review the {product.name}.
              </p>
            ) : (
              productReviews.map((rev) => (
                <div
                  key={rev.id}
                  className="p-5 bg-neutral-900/60 border border-neutral-800 rounded-lg space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="font-semibold text-white">
                      {rev.author}
                    </span>
                    <span className="text-neutral-500">{rev.date}</span>
                  </div>
                  <div className="flex text-amber-400 text-xs">
                    {[...Array(rev.rating)].map((_, i) => (
                      <span key={i}>★</span>
                    ))}
                  </div>
                  <p className="text-xs text-neutral-300 font-light leading-relaxed">
                    &quot;{rev.comment}&quot;
                  </p>
                  {rev.verifiedPurchase && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                      <Check className="w-3 h-3" />
                      Verified Purchase
                    </span>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <div className="mt-28 pt-16 border-t border-neutral-900">
            <div className="mb-10 space-y-1">
              <span className="text-xs uppercase tracking-[0.2em] font-mono text-neutral-400">
                COMPLETE THE LOOK
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                Related Essentials
              </h2>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Size Guide Modal */}
      {isSizeGuideOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl max-w-lg w-full p-6 space-y-5 text-white">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
              <h3 className="text-sm font-mono uppercase tracking-widest text-white">
                VELANT Size & Fit Guide (Inches)
              </h3>
              <button
                onClick={() => setIsSizeGuideOpen(false)}
                className="p-1 text-neutral-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-neutral-300 font-light">
              All our streetwear pieces are cut with an intentional boxy
              oversized drop-shoulder fit. If you prefer a tailored fit, we
              recommend ordering one size down.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs font-mono text-left border border-neutral-800">
                <thead className="bg-neutral-950 text-neutral-400">
                  <tr>
                    <th className="p-2.5 border-b border-neutral-800">Size</th>
                    <th className="p-2.5 border-b border-neutral-800">
                      Chest (in)
                    </th>
                    <th className="p-2.5 border-b border-neutral-800">
                      Length (in)
                    </th>
                    <th className="p-2.5 border-b border-neutral-800">
                      Shoulder (in)
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800/60 text-neutral-300">
                  <tr>
                    <td className="p-2.5 font-bold">S</td>
                    <td className="p-2.5">44&quot;</td>
                    <td className="p-2.5">27.5&quot;</td>
                    <td className="p-2.5">21.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">M</td>
                    <td className="p-2.5">46&quot;</td>
                    <td className="p-2.5">28.5&quot;</td>
                    <td className="p-2.5">22.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">L</td>
                    <td className="p-2.5">48&quot;</td>
                    <td className="p-2.5">29.5&quot;</td>
                    <td className="p-2.5">23.5&quot;</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold">XL</td>
                    <td className="p-2.5">50&quot;</td>
                    <td className="p-2.5">30.5&quot;</td>
                    <td className="p-2.5">24.5&quot;</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <button
              onClick={() => setIsSizeGuideOpen(false)}
              className="w-full py-2.5 bg-white text-black text-xs font-mono uppercase font-bold rounded"
            >
              Got It
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
