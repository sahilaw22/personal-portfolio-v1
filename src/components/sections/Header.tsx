
"use client";

import React, { useState } from "react";
import { Terminal, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useAppState } from "@/components/AppStateProvider";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export default function Header() {
  const { portfolioData } = useAppState();
  const navStyle = portfolioData.settings.layout?.navStyle || "top";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("#about");

  React.useEffect(() => {
    const handleScroll = () => {
      const sections = navItems
        .map((item) => document.getElementById(item.href.substring(1)))
        .filter(Boolean) as HTMLElement[];
      const currentScroll = window.scrollY + 100;

      for (const section of sections) {
        if (
          section.offsetTop <= currentScroll &&
          section.offsetTop + section.offsetHeight > currentScroll
        ) {
          setActiveLink(`#${section.id}`);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (href: string) => {
    setIsMenuOpen(false);
    setActiveLink(href);
    const element = document.getElementById(href.substring(1));
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  if (navStyle === "sidebar") return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center justify-between">
        <a
          href="#hero"
          className="flex items-center gap-2"
          onClick={(e) => {
            e.preventDefault();
            handleLinkClick("#hero");
          }}
        >
          <Terminal className="h-8 w-8 text-primary" />
          <span
            className={cn(
              "font-bold text-xl sm:text-2xl",
              document?.documentElement?.dataset?.headingStyle ===
                "all-caps"
                ? "uppercase tracking-wide"
                : document?.documentElement?.dataset?.headingStyle ===
                    "underline"
                  ? "underline decoration-primary/50 underline-offset-8"
                  : ""
            )}
          >
            Portfolio
          </span>
        </a>
        <nav className="hidden md:flex items-center gap-1 text-base">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.href);
              }}
              className={cn(
                "transition-colors hover:text-primary font-medium px-3 py-2 rounded-md text-sm lg:text-base",
                activeLink === item.href
                  ? "text-primary bg-accent/10"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </a>
          ))}
        </nav>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
          <span className="sr-only">Toggle menu</span>
        </Button>
      </div>
      {isMenuOpen && (
        <nav className="md:hidden flex flex-col items-center gap-2 text-base py-4 border-t border-border/40">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(item.href);
              }}
              className={cn(
                "transition-colors hover:text-primary font-medium w-full text-center py-2",
                activeLink === item.href
                  ? "text-primary bg-accent/10"
                  : "text-muted-foreground"
              )}
            >
              {item.name}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
