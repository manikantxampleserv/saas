import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Check } from "lucide-react";
import { DemoModal } from "./demo-modal";

const plans = [
  {
    name: "Starter",
    description: "Perfect for small teams getting started",
    price: "₹49",
    period: "/user/month",
    features: [
      "Up to 25 users",
      "1 product module",
      "Basic analytics",
      "Email support",
      "5GB storage",
    ],
    cta: "Start Free Trial",
    highlighted: false,
  },
  {
    name: "Professional",
    description: "For growing businesses with advanced needs",
    price: "₹99",
    period: "/user/month",
    features: [
      "Up to 100 users",
      "All product modules",
      "Advanced analytics",
      "Priority support",
      "50GB storage",
      "Custom integrations",
      "API access",
    ],
    cta: "Start Free Trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    description: "Custom solutions for large organizations",
    price: "Custom",
    period: "",
    features: [
      "Unlimited users",
      "All product modules",
      "Enterprise analytics",
      "24/7 dedicated support",
      "Unlimited storage",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
    ],
    cta: "Contact Sales",
    highlighted: false,
  },
];

export function PricingSection() {
  return (
    <section id="pricing" className="border-t border-border px-6 py-24">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-5xl">
            Simple, transparent pricing
          </h2>
          <p className="mx-auto max-w-2xl text-muted-foreground">
            Choose the plan that fits your business. All plans include a 14-day
            free trial.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.name}
              className={`relative border-border ${
                plan.highlighted ? "border-accent bg-accent/5" : "bg-card"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                    Most Popular
                  </span>
                </div>
              )}
              <CardHeader className="text-center">
                <CardTitle className="text-xl text-card-foreground">
                  {plan.name}
                </CardTitle>
                <CardDescription>{plan.description}</CardDescription>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground ">{plan.period}</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-accent/20">
                        <Check className="h-3 w-3 text-accent" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                <DemoModal>
                  <Button
                    className="w-full"
                    variant={plan.highlighted ? "default" : "outline"}
                  >
                    {plan.cta}
                  </Button>
                </DemoModal>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
