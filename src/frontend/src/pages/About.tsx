import { Link } from "@tanstack/react-router";

const bio = [
  {
    id: "bio-decade",
    text: "I've spent the last few years building and scaling service businesses from the ground up — no investors, no fancy tools, just strategy and execution.",
  },
  {
    id: "bio-playbook",
    text: "What I've learned along the way would have saved me years of trial and error. That's why I now teach aspiring entrepreneurs the exact playbook I wish I'd had from day one.",
  },
  {
    id: "bio-help",
    text: "Whether you're still deciding what service to offer, or you're ready to go land your first client — I'm here to help you cut through the noise.",
  },
];

export default function About() {
  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <div className="max-w-2xl">
        <h1 className="font-display font-extrabold text-5xl sm:text-6xl leading-[1.05] tracking-tight text-foreground mb-12">
          Hey, I&apos;m Lando.
        </h1>

        <div className="space-y-7 mb-16">
          {bio.map(({ id, text }) => (
            <p
              key={id}
              className="font-body text-xl text-foreground leading-relaxed"
            >
              {text}
            </p>
          ))}
        </div>

        <div className="pt-8 border-t border-border">
          <p className="font-body text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-4">
            Ready to start?
          </p>
          <Link
            to="/get-the-guide"
            data-ocid="about.primary_button"
            className="inline-flex items-center gap-2 font-body font-semibold text-lg text-primary hover:opacity-80 transition-opacity"
          >
            Get the free 30-day roadmap
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
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
