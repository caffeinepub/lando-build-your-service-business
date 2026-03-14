import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <nav className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link
            to="/"
            className="font-display font-700 text-xl tracking-tight text-foreground hover:text-primary transition-colors"
          >
            Lando
          </Link>
          <div className="flex items-center gap-8">
            <Link
              to="/"
              data-ocid="nav.home_link"
              className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors [&.active]:text-foreground"
            >
              Home
            </Link>
            <Link
              to="/about"
              data-ocid="nav.about_link"
              className="font-body text-sm font-medium text-muted-foreground hover:text-foreground transition-colors [&.active]:text-foreground"
            >
              About
            </Link>
            <Link
              to="/get-the-guide"
              data-ocid="nav.guide_link"
              className="font-body text-sm font-semibold bg-primary text-primary-foreground px-4 py-2 rounded-md hover:opacity-90 transition-opacity"
            >
              Get the Guide
            </Link>
          </div>
        </nav>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t border-border py-8">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()}. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
