"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { DemoModal } from "@/components/demo-modal";

export function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-size-[64px_64px]" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary px-4 py-1.5">
          <span className="h-2 w-2 rounded-full bg-accent" />
          <span className="text-sm text-muted-foreground">
            Enterprise Grade Solutions For Modern Businesses
          </span>
        </div>

        <h1 className="mb-6 text-balance text-5xl font-bold tracking-tight text-foreground md:text-7xl">
          The complete platform
          <span className="block">to run your business</span>
        </h1>

        <p className="mx-auto mb-10 max-w-2xl text-pretty text-lg text-muted-foreground md:text-xl">
          MKX Industries brings your team&apos;s toolkit to streamline
          operations. Securely manage HR, customers, and sales with our
          integrated suite of enterprise solutions.
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <DemoModal>
            <Button size="lg" className="gap-2">
              Get a Demo
              <ArrowRight className="h-4 w-4" />
            </Button>
          </DemoModal>
          <Button
            size="lg"
            variant="outline"
            onClick={() => {
              document
                .getElementById("products")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            Explore Products
          </Button>
        </div>
      </div>

      <div className="relative z-10 mt-20 w-full border-t border-border">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 py-12 md:grid-cols-4">
          <div className="text-center md:text-left">
            <p className="text-3xl font-bold text-foreground md:text-4xl">
              20 days
            </p>
            <p className="text-sm text-muted-foreground">saved on average</p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-3xl font-bold text-foreground md:text-4xl">
              98%
            </p>
            <p className="text-sm text-muted-foreground">
              faster time to deploy
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-3xl font-bold text-foreground md:text-4xl">
              300%
            </p>
            <p className="text-sm text-muted-foreground">
              increase in efficiency
            </p>
          </div>
          <div className="text-center md:text-left">
            <p className="text-3xl font-bold text-foreground md:text-4xl">6x</p>
            <p className="text-sm text-muted-foreground">faster to scale</p>
          </div>
        </div>
      </div>
    </section>
  );
}
