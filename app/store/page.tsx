"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Button,
  Badge,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Modal,
  Alert,
  Input,
  Progress,
  Spinner,
  Toast,
  Tooltip,
  Avatar,
} from "@/components/ui";

// ─── Static product data ──────────────────────────────────────────────────────

const PRODUCTS = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    emoji: "🎧",
    price: 1299,
    originalPrice: 1999,
    rating: 4.8,
    reviews: 2341,
    stock: "in-stock" as const,
    color: "primary" as const,
    initials: "WH",
  },
  {
    id: 2,
    name: "Smart Fitness Band",
    emoji: "⌚",
    price: 799,
    originalPrice: 1199,
    rating: 4.5,
    reviews: 1872,
    stock: "low-stock" as const,
    color: "secondary" as const,
    initials: "FB",
  },
  {
    id: 3,
    name: "Portable Charger 20000mAh",
    emoji: "🔋",
    price: 549,
    originalPrice: 899,
    rating: 4.6,
    reviews: 4120,
    stock: "in-stock" as const,
    color: "info" as const,
    initials: "PC",
  },
  {
    id: 4,
    name: "Running Shoes (Men's)",
    emoji: "👟",
    price: 1849,
    originalPrice: 2499,
    rating: 4.7,
    reviews: 987,
    stock: "last-few" as const,
    color: "warning" as const,
    initials: "RS",
  },
  {
    id: 5,
    name: "Minimalist Backpack",
    emoji: "🎒",
    price: 999,
    originalPrice: 1499,
    rating: 4.4,
    reviews: 653,
    stock: "in-stock" as const,
    color: "success" as const,
    initials: "MB",
  },
  {
    id: 6,
    name: "Bamboo Desk Organiser",
    emoji: "🗂️",
    price: 399,
    originalPrice: 599,
    rating: 4.3,
    reviews: 421,
    stock: "in-stock" as const,
    color: "neutral" as const,
    initials: "DO",
  },
];

type Product = typeof PRODUCTS[0];
type CartItem = { product: Product; qty: number };

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StarRating({ value }: { value: number }) {
  return (
    <span className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <svg
          key={s}
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill={s <= Math.round(value) ? "#F59E0B" : "none"}
          stroke="#F59E0B"
          strokeWidth="1"
          aria-hidden="true"
        >
          <path d="M6 1l1.2 3.6H11L8.1 6.8l1.1 3.6L6 8.4l-3.2 2 1.1-3.6L1 4.6h3.8L6 1z" />
        </svg>
      ))}
    </span>
  );
}

function StockBadge({ stock }: { stock: Product["stock"] }) {
  if (stock === "in-stock")  return <Badge variant="success" size="sm" dot>In Stock</Badge>;
  if (stock === "low-stock") return <Badge variant="warning" size="sm" dot>Low Stock</Badge>;
  return                            <Badge variant="error"   size="sm" dot>Last 2 Left</Badge>;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function StorePage() {
  const [cart, setCart]               = useState<CartItem[]>([]);
  const [promoCode, setPromoCode]     = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [exitOpen, setExitOpen]       = useState(false);
  const [showToast, setShowToast]     = useState(false);
  const [otpLoading, setOtpLoading]   = useState(false);
  const [otpSent, setOtpSent]         = useState(false);
  const [phone, setPhone]             = useState("");
  const hasTriggeredExit              = useRef(false);

  // ── Cart helpers ────────────────────────────────────────────────────────────
  const addToCart = useCallback((product: Product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      if (existing) {
        return prev.map((i) =>
          i.product.id === product.id ? { ...i, qty: i.qty + 1 } : i
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  }, []);

  const removeFromCart = useCallback((id: number) => {
    setCart((prev) => prev.filter((i) => i.product.id !== id));
  }, []);

  const cartCount = cart.reduce((s, i) => s + i.qty, 0);
  const subtotal  = cart.reduce((s, i) => s + i.product.price * i.qty, 0);
  const discount  = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const total     = subtotal - discount;
  const FREE_SHIP = 999;

  // ── Exit-intent detection ───────────────────────────────────────────────────
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasTriggeredExit.current && cart.length > 0) {
        hasTriggeredExit.current = true;
        setExitOpen(true);
      }
    };
    document.addEventListener("mouseleave", handleMouseLeave);
    return () => document.removeEventListener("mouseleave", handleMouseLeave);
  }, [cart.length]);

  // ── OTP flow ────────────────────────────────────────────────────────────────
  const handleSendOtp = () => {
    setOtpLoading(true);
    setTimeout(() => {
      setOtpLoading(false);
      setOtpSent(true);
    }, 1800);
  };

  const handleExitClose = () => {
    setExitOpen(false);
    setShowToast(true);
  };

  // ── Apply promo ─────────────────────────────────────────────────────────────
  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "STAY10" || promoCode.trim().toUpperCase() === "FIRST10") {
      setPromoApplied(true);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 font-sans">

      {/* ── Navbar ───────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-border-default bg-neutral-0 shadow-xs">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 md:px-8">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-500">
              <span className="text-xs font-black text-white">SE</span>
            </div>
            <span className="text-base font-bold text-text-primary hidden sm:block">ShopEasy</span>
            <Badge variant="primary" size="sm">SALE</Badge>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 ml-4">
            {["Home", "Products", "Deals", "About"].map((label) => (
              <Button key={label} variant="ghost" size="sm">{label}</Button>
            ))}
          </nav>

          {/* Search */}
          <div className="flex-1 max-w-sm hidden sm:block">
            <Input
              placeholder="Search products…"
              inputSize="sm"
              fullWidth
              prefix={
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.25"/>
                  <path d="M9.5 9.5L12.5 12.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
                </svg>
              }
            />
          </div>

          <div className="ml-auto flex items-center gap-2">
            {/* Wishlist */}
            <Tooltip content="Wishlist" position="bottom">
              <Button variant="ghost" size="sm" aria-label="Wishlist">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <path d="M9 15.5S2 11 2 5.8A3.8 3.8 0 019 3.2a3.8 3.8 0 017 2.6C16 11 9 15.5 9 15.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
                </svg>
              </Button>
            </Tooltip>

            {/* Cart */}
            <Tooltip content={cartCount > 0 ? `${cartCount} item${cartCount > 1 ? "s" : ""} in cart` : "Your cart is empty"} position="bottom">
              <div className="relative">
                <Button variant="outline" size="sm" aria-label="Cart">
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                    <path d="M2 2h2l2.6 8.6a1 1 0 00.96.7h6.88a1 1 0 00.96-.73L16 6H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <circle cx="8" cy="15" r="1" fill="currentColor"/>
                    <circle cx="14" cy="15" r="1" fill="currentColor"/>
                  </svg>
                </Button>
                {cartCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 pointer-events-none">
                    <Badge variant="error" size="sm">{cartCount}</Badge>
                  </span>
                )}
              </div>
            </Tooltip>

            {/* Guest avatar */}
            <Avatar initials="?" size="sm" color="neutral" />
          </div>
        </div>
      </header>

      {/* ── Promo banner ─────────────────────────────────────────────────────── */}
      <div className="bg-primary-500 px-4 py-2 text-center">
        <p className="text-xs font-medium text-white">
          🚚 Free shipping on orders above ₹999 &nbsp;·&nbsp;
          Use code <strong className="font-black">FIRST10</strong> for 10% off your first order
        </p>
      </div>

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">

        {/* ── Alert: new arrivals ────────────────────────────────────────────── */}
        <Alert variant="info" className="mb-6">
          <strong>New arrivals every Friday!</strong> Sign in to get early access + exclusive member pricing.{" "}
          <button className="underline font-medium text-info-text hover:text-info-dark transition-colors">
            Create account →
          </button>
        </Alert>

        {/* ── Hero banner ───────────────────────────────────────────────────── */}
        <Card variant="filled" padding="none" className="mb-8 overflow-hidden">
          <div className="relative flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-500 px-8 py-10 md:py-12">
            <div className="text-center md:text-left mb-6 md:mb-0">
              <Badge variant="neutral" className="mb-3 bg-white/20 text-white border-white/30">
                Summer Sale — Up to 60% OFF
              </Badge>
              <h1 className="text-3xl md:text-4xl font-black text-white mb-2 leading-tight">
                Shop Smart,<br />Save More.
              </h1>
              <p className="text-primary-100 text-sm mb-6 max-w-xs">
                Premium products at unbeatable prices. Trusted by 10 lakh+ shoppers across India.
              </p>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                <Button variant="secondary" size="lg">
                  Shop Now
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-white border-white/40 hover:bg-white/10"
                >
                  View Deals
                </Button>
              </div>
            </div>
            <div className="flex gap-4">
              {["🎧", "⌚", "👟"].map((emoji, i) => (
                <div
                  key={i}
                  className={cn(
                    "flex items-center justify-center rounded-2xl bg-white/20 text-4xl shadow-primary-md backdrop-blur-sm",
                    i === 1 ? "w-20 h-20 -mt-4" : "w-16 h-16"
                  )}
                >
                  {emoji}
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* ── Product grid + Cart ────────────────────────────────────────────── */}
        <div className="flex flex-col lg:flex-row gap-6">

          {/* Product grid */}
          <div className="flex-1 min-w-0">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-text-primary">
                Featured Products
                <span className="ml-2 text-sm font-normal text-text-tertiary">({PRODUCTS.length})</span>
              </h2>
              <div className="flex gap-2">
                <Button variant="ghost" size="xs">Newest</Button>
                <Button variant="ghost" size="xs">Price ↑</Button>
                <Button variant="outline" size="xs">Popular</Button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {PRODUCTS.map((product) => {
                const inCart = cart.find((i) => i.product.id === product.id);
                return (
                  <Card key={product.id} variant="default" padding="none" className="flex flex-col group hover:shadow-md transition-shadow duration-200">
                    {/* Product image area */}
                    <div className={cn(
                      "relative flex items-center justify-center h-36 rounded-t-2xl text-5xl",
                      `bg-${product.color}-50`,
                    )}>
                      <span role="img" aria-label={product.name}>{product.emoji}</span>
                      <div className="absolute top-2.5 left-2.5">
                        <StockBadge stock={product.stock} />
                      </div>
                      {inCart && (
                        <div className="absolute top-2.5 right-2.5">
                          <Badge variant="primary" size="sm">In cart ×{inCart.qty}</Badge>
                        </div>
                      )}
                    </div>

                    <div className="flex flex-col flex-1 p-4 gap-2">
                      {/* Name */}
                      <p className="text-sm font-semibold text-text-primary leading-snug line-clamp-2">
                        {product.name}
                      </p>

                      {/* Rating */}
                      <Tooltip
                        content={`${product.rating} · ${product.reviews.toLocaleString()} verified reviews`}
                        position="top"
                      >
                        <button type="button" className="flex items-center gap-1.5 w-fit">
                          <StarRating value={product.rating} />
                          <span className="text-xs text-text-secondary tabular-nums">
                            {product.rating} ({product.reviews.toLocaleString()})
                          </span>
                        </button>
                      </Tooltip>

                      {/* Price */}
                      <div className="flex items-baseline gap-2 mt-auto">
                        <span className="text-lg font-black text-primary-600">₹{product.price.toLocaleString()}</span>
                        <span className="text-xs text-text-tertiary line-through">₹{product.originalPrice.toLocaleString()}</span>
                        <Badge variant="success" size="sm">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% off
                        </Badge>
                      </div>

                      {/* Add to cart */}
                      <Button
                        variant={inCart ? "outline" : "primary"}
                        size="sm"
                        fullWidth
                        onClick={() => addToCart(product)}
                        iconLeft={
                          inCart ? undefined : (
                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                              <path d="M7 3v8M3 7h8" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round"/>
                            </svg>
                          )
                        }
                      >
                        {inCart ? `Add another (×${inCart.qty + 1})` : "Add to Cart"}
                      </Button>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* ── Cart summary ────────────────────────────────────────────────── */}
          <aside className="lg:w-80 xl:w-96 shrink-0">
            <div className="sticky top-20">
              <Card variant="elevated" padding="md">
                <CardHeader
                  title="Your Cart"
                  action={
                    cartCount > 0
                      ? <Badge variant="primary">{cartCount} item{cartCount > 1 ? "s" : ""}</Badge>
                      : <Badge variant="neutral">Empty</Badge>
                  }
                />
                <CardBody>
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 py-8 text-center">
                      <span className="text-5xl">🛒</span>
                      <p className="text-sm text-text-secondary">Your cart is empty</p>
                      <p className="text-xs text-text-tertiary">Add products to get started</p>
                    </div>
                  ) : (
                    <div className="flex flex-col gap-3">
                      {/* Cart items */}
                      {cart.map(({ product, qty }) => (
                        <div key={product.id} className="flex items-center gap-3">
                          <Avatar
                            initials={product.initials}
                            size="md"
                            variant="rounded"
                            color={product.color}
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-text-primary truncate">{product.name}</p>
                            <p className="text-xs text-text-secondary">
                              ₹{product.price.toLocaleString()} × {qty}
                            </p>
                          </div>
                          <div className="flex items-center gap-1 shrink-0">
                            <span className="text-sm font-bold text-text-primary tabular-nums">
                              ₹{(product.price * qty).toLocaleString()}
                            </span>
                            <Button
                              variant="ghost"
                              size="xs"
                              aria-label={`Remove ${product.name}`}
                              onClick={() => removeFromCart(product.id)}
                              className="text-text-tertiary hover:text-error-default"
                            >
                              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                                <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                              </svg>
                            </Button>
                          </div>
                        </div>
                      ))}

                      {/* Free shipping progress */}
                      <div className="pt-2 border-t border-border-subtle">
                        {subtotal >= FREE_SHIP ? (
                          <Alert variant="success" className="py-2 text-xs">
                            🎉 You qualify for <strong>free shipping!</strong>
                          </Alert>
                        ) : (
                          <Progress
                            value={(subtotal / FREE_SHIP) * 100}
                            variant="primary"
                            size="sm"
                            label={`Add ₹${(FREE_SHIP - subtotal).toLocaleString()} more for free shipping`}
                            showValue={false}
                          />
                        )}
                      </div>

                      {/* Promo code */}
                      <div className="flex gap-2 pt-1">
                        <Input
                          placeholder="Promo code"
                          inputSize="sm"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          fullWidth
                          className={promoApplied ? "text-success-text" : ""}
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={handleApplyPromo}
                          disabled={promoApplied || !promoCode.trim()}
                          className="shrink-0"
                        >
                          {promoApplied ? "✓" : "Apply"}
                        </Button>
                      </div>
                      {promoApplied && (
                        <p className="text-xs text-success-text">
                          ✓ Code applied — 10% discount
                        </p>
                      )}

                      {/* Price breakdown */}
                      <div className="pt-2 border-t border-border-subtle space-y-1.5">
                        <div className="flex justify-between text-xs text-text-secondary">
                          <span>Subtotal</span>
                          <span className="tabular-nums">₹{subtotal.toLocaleString()}</span>
                        </div>
                        {promoApplied && (
                          <div className="flex justify-between text-xs text-success-text">
                            <span>Discount (10%)</span>
                            <span className="tabular-nums">−₹{discount.toLocaleString()}</span>
                          </div>
                        )}
                        <div className="flex justify-between text-xs text-text-secondary">
                          <span>Shipping</span>
                          <span>{subtotal >= FREE_SHIP ? <span className="text-success-text font-medium">FREE</span> : "₹49"}</span>
                        </div>
                        <div className="flex justify-between text-xs text-text-secondary">
                          <span>GST (18%)</span>
                          <span className="tabular-nums">₹{Math.round(total * 0.18).toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-sm font-bold text-text-primary pt-1 border-t border-border-subtle">
                          <span>Total</span>
                          <span className="tabular-nums">₹{(total + (subtotal >= FREE_SHIP ? 0 : 49) + Math.round(total * 0.18)).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </CardBody>

                <CardFooter>
                  <div className="flex flex-col gap-2 w-full">
                    <Button
                      variant="primary"
                      size="lg"
                      fullWidth
                      disabled={cart.length === 0}
                      iconRight={
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      }
                    >
                      Proceed to Checkout
                    </Button>
                    <Button variant="link" size="sm" fullWidth disabled={cart.length === 0}>
                      Or checkout as guest →
                    </Button>

                    {/* Trust badges */}
                    <div className="flex justify-center gap-4 pt-2 border-t border-border-subtle">
                      {[
                        { icon: "🔒", label: "Secure" },
                        { icon: "↩️", label: "7-day returns" },
                        { icon: "⚡", label: "Fast checkout" },
                      ].map(({ icon, label }) => (
                        <div key={label} className="flex flex-col items-center gap-0.5">
                          <span className="text-base">{icon}</span>
                          <span className="text-[10px] text-text-tertiary">{label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </aside>
        </div>
      </main>

      {/* ══════════════════════════════════════════════════════════════════════ */}
      {/*  EXIT-INTENT MODAL                                                    */}
      {/*  Fires once when cursor leaves viewport top (toward browser chrome)   */}
      {/* ══════════════════════════════════════════════════════════════════════ */}
      <Modal
        open={exitOpen}
        onClose={handleExitClose}
        size="sm"
        closeOnBackdrop={true}
        showCloseButton={true}
      >
        <div className="flex flex-col items-center text-center gap-5 pb-2">

          {/* Illustration */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full bg-primary-50 flex items-center justify-center text-4xl shadow-primary-sm">
              🛍️
            </div>
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-error-default flex items-center justify-center text-white text-xs font-black shadow-sm">
              {cartCount > 0 ? cartCount : "!"}
            </span>
          </div>

          {/* Headline */}
          <div>
            <h2 className="text-xl font-black text-text-primary leading-tight mb-1">
              Wait! Don&apos;t leave yet 👋
            </h2>
            {cartCount > 0 ? (
              <p className="text-sm text-text-secondary">
                You have <strong className="text-text-primary">{cartCount} item{cartCount > 1 ? "s" : ""}</strong>{" "}
                worth{" "}
                <strong className="text-primary-600">₹{subtotal.toLocaleString()}</strong>{" "}
                waiting in your cart.
              </p>
            ) : (
              <p className="text-sm text-text-secondary">
                Don&apos;t miss out on our sale prices — grab your items before they sell out!
              </p>
            )}
          </div>

          {/* Discount alert */}
          <Alert variant="success" className="w-full text-left">
            <span className="text-sm">
              Use code{" "}
              <strong className="font-black tracking-wider bg-success-bg text-success-dark px-1.5 py-0.5 rounded font-mono">
                STAY10
              </strong>{" "}
              for an extra <strong>10% off</strong> — expires in{" "}
              <strong className="text-success-dark">10 mins!</strong>
            </span>
          </Alert>

          {/* OTP checkout */}
          {!otpSent ? (
            <div className="w-full flex flex-col gap-3">
              <Input
                label="Checkout in 30 seconds with your phone"
                placeholder="Enter mobile number"
                type="tel"
                inputSize="md"
                fullWidth
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                prefix={
                  <span className="text-xs text-text-secondary font-medium">+91</span>
                }
                helperText="No account needed · OTP sent instantly"
              />
              <Button
                variant="primary"
                size="lg"
                fullWidth
                loading={otpLoading}
                onClick={handleSendOtp}
                disabled={phone.length < 10}
              >
                Send OTP &amp; Complete Purchase
              </Button>
            </div>
          ) : (
            <Alert variant="success" className="w-full">
              <strong>OTP sent to +91 {phone}!</strong> Check your SMS to complete checkout.
            </Alert>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1 h-px bg-border-default" />
            <span className="text-xs text-text-tertiary">or</span>
            <div className="flex-1 h-px bg-border-default" />
          </div>

          {/* Continue browsing */}
          <Button
            variant="outline"
            size="md"
            fullWidth
            onClick={handleExitClose}
          >
            Continue browsing
          </Button>

          {/* Fine print */}
          <p className="text-xs text-text-tertiary leading-relaxed">
            No account needed &nbsp;·&nbsp; No spam &nbsp;·&nbsp; Cart saved for 30 mins
          </p>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-3 flex-wrap">
            {[
              { label: "🔒 Secure checkout" },
              { label: "✓ No spam" },
              { label: "⚡ 30-sec checkout" },
              { label: "↩️ Easy returns" },
            ].map(({ label }) => (
              <Badge key={label} variant="neutral" size="sm">{label}</Badge>
            ))}
          </div>
        </div>
      </Modal>

      {/* ── Toast (shown after closing exit modal) ────────────────────────── */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            variant="warning"
            title="Items reserved for 30 mins"
            description="Complete your purchase before they sell out!"
            duration={5000}
            onClose={() => setShowToast(false)}
            action={{ label: "Go to cart", onClick: () => setShowToast(false) }}
          />
        </div>
      )}
    </div>
  );
}
