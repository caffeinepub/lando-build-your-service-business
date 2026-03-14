import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useActor } from "../hooks/useActor";

const bullets = [
  {
    id: "pick-service",
    text: "How to pick the right service to sell — even with zero experience",
  },
  {
    id: "outreach-method",
    text: "The exact outreach method to land your first paying client in 30 days",
  },
  {
    id: "price-deliver",
    text: "How to price, deliver, and retain clients so they keep coming back",
  },
];

export default function LeadMagnet() {
  const { actor } = useActor();
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!actor || !email.trim()) return;
    setIsSubmitting(true);
    try {
      await actor.submitEmail(email.trim());
      setSubmitted(true);
      toast.success("You're in! Check your inbox soon.");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="max-w-5xl mx-auto px-6 py-24">
      <div className="max-w-2xl">
        <p className="font-body text-sm font-semibold text-primary uppercase tracking-widest mb-6">
          Free guide
        </p>
        <h1 className="font-display font-extrabold text-4xl sm:text-5xl leading-[1.1] tracking-tight text-foreground mb-12">
          The First 30 Days: Lando&apos;s No-BS Roadmap to Starting Your Service
          Business
        </h1>

        <ul className="space-y-5 mb-14">
          {bullets.map(({ id, text }) => (
            <li key={id} className="flex items-start gap-4">
              <CheckCircle2
                className="text-primary mt-0.5 shrink-0"
                size={22}
              />
              <span className="font-body text-lg text-foreground leading-snug">
                {text}
              </span>
            </li>
          ))}
        </ul>

        {submitted ? (
          <div
            data-ocid="guide.success_state"
            className="flex items-center gap-4 p-6 bg-accent rounded-lg border border-primary/20"
          >
            <CheckCircle2 className="text-primary shrink-0" size={28} />
            <div>
              <p className="font-display font-bold text-lg text-foreground">
                You&apos;re all set!
              </p>
              <p className="font-body text-muted-foreground mt-1">
                The 30-day roadmap is on its way to your inbox.
              </p>
            </div>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Input
              type="email"
              required
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              data-ocid="guide.input"
              className="flex-1 h-12 font-body text-base border-border focus-visible:ring-primary"
            />
            <Button
              type="submit"
              disabled={isSubmitting || !email.trim()}
              data-ocid={
                isSubmitting ? "guide.loading_state" : "guide.submit_button"
              }
              className="h-12 px-7 font-body font-semibold text-base bg-primary text-primary-foreground hover:opacity-90 active:scale-[0.98] transition-all whitespace-nowrap"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send me the free guide"
              )}
            </Button>
          </form>
        )}

        <p className="font-body text-sm text-muted-foreground mt-4">
          No spam, ever. Unsubscribe anytime.
        </p>
      </div>
    </section>
  );
}
