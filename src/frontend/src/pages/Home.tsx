import { Link } from "@tanstack/react-router";

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-4rem)] flex items-center">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <div className="max-w-3xl">
          <p className="font-body text-sm font-semibold text-primary uppercase tracking-widest mb-6">
            Agency builder → Educator
          </p>
          <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl leading-[1.05] tracking-tight text-foreground mb-8">
            I&apos;ll teach you how to build your first service business —{" "}
            <span className="text-primary">without the guesswork</span>
          </h1>
          <p className="font-body text-xl text-muted-foreground leading-relaxed mb-12 max-w-2xl">
            I&apos;ve built and scaled agencies from scratch. Now I share
            everything I know so you don&apos;t have to figure it out alone.
          </p>
          <Link
            to="/get-the-guide"
            data-ocid="home.primary_button"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-body font-semibold text-base px-8 py-4 rounded-md hover:opacity-90 active:scale-[0.98] transition-all"
          >
            Get the free 30-day roadmap
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
