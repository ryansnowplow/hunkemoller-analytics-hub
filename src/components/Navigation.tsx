"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Menu, X } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/", dividerAfter: true },
  { label: "Unified", href: "/unified" },
  { label: "Ecommerce", href: "/ecommerce" },
  { label: "Attribution", href: "/attribution", dividerAfter: true },
  { label: "Chart Guide", href: "/chart-guide", dividerAfter: true },
  { label: "Dashboard Guide", href: "/dashboard-guide" },
];

interface NavigationProps {
  onSearchOpen?: () => void;
}

export default function Navigation({ onSearchOpen }: NavigationProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSearchClick = useCallback(() => {
    onSearchOpen?.();
  }, [onSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onSearchOpen?.();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onSearchOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="sticky top-0 z-50">
      {/* Top bar: soft pink with centered logo */}
      <div className="bg-hkm-blush">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center h-[40px] relative">
            {/* Left: Analytics Hub label */}
            <span className="absolute left-0 text-[10px] font-semibold text-hkm-primary tracking-[0.2em] uppercase hidden sm:block">
              Analytics Hub
            </span>

            {/* Center: Logo */}
            <Link href="/" className="flex items-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://eu-images.contentstack.com/v3/assets/bltfd5061d1d103c767/bltd13b4e919339e08f/696f5b722d05b953b744a5a7/logoHKM.svg?width=1920&quality=85&auto=webp"
                alt="Hunkemöller"
                style={{ width: 159, height: 22 }}
              />
            </Link>

            {/* Right: Powered by Snowplow */}
            <div className="absolute right-0 hidden sm:flex items-center gap-1.5">
              <span className="text-[8px] font-medium text-hkm-text-muted text-right whitespace-nowrap">
                powered by
              </span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/snowplow-logo.png"
                alt="Snowplow"
                className="h-4 w-auto"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar: white with nav links + search */}
      <div className="bg-hkm-white border-b border-hkm-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-11">
            {/* Nav Links (desktop) */}
            <div className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <span key={link.href} className="flex items-center">
                  <Link
                    href={link.href}
                    className={`group relative px-3 py-1.5 text-[14px] font-bold transition-colors ${
                      isActive(link.href)
                        ? "text-hkm-nav-active"
                        : "text-hkm-nav-text"
                    }`}
                  >
                    {link.label}
                    {/* Hover underline: slides in from left */}
                    {!isActive(link.href) && (
                      <span className="absolute bottom-0 left-3 right-3 h-[1.5px] bg-hkm-nav-text origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    )}
                  </Link>
                  {link.dividerAfter && (
                    <span className="text-hkm-text-muted text-[8px] mx-1 select-none">&#x2022;</span>
                  )}
                </span>
              ))}
            </div>

            {/* Mobile: Hamburger (left side) */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 -ml-2 text-hkm-text-muted hover:text-hkm-primary cursor-pointer"
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            {/* Right: Search */}
            <div className="flex items-center">
              <button
                onClick={handleSearchClick}
                className="hidden md:flex items-center gap-2 px-3 py-1 text-[13px] text-hkm-text-muted hover:text-hkm-primary transition-colors cursor-pointer"
              >
                <Search size={15} />
                <span>Search</span>
                <kbd className="ml-1 px-1.5 py-0.5 text-[9px] font-mono text-hkm-text-muted bg-hkm-blush border border-hkm-border-light rounded">
                  ⌘K
                </kbd>
              </button>

              {/* Mobile: Search icon */}
              <button
                onClick={handleSearchClick}
                className="md:hidden p-2 -mr-2 text-hkm-text-muted hover:text-hkm-primary cursor-pointer"
              >
                <Search size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-b border-hkm-border bg-hkm-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(link.href)
                    ? "text-hkm-primary bg-hkm-blush border-l-2 border-hkm-gold"
                    : "text-hkm-text-muted hover:text-hkm-primary hover:bg-hkm-blush"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
