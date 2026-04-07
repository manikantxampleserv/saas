import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import { DemoModal } from "@/components/demo-modal"

export function CTASection() {
  return (
    <section id="contact" className="border-t border-border bg-secondary/30 px-6 py-24">
      <div className="mx-auto max-w-4xl text-center">
        <h2 className="mb-6 text-3xl font-bold text-foreground md:text-5xl">
          Ready to transform your business?
        </h2>
        <p className="mb-10 text-lg text-muted-foreground">
          Join thousands of companies already using SaaS Controllers to streamline their operations.
          Get started with a free trial today.
        </p>
        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <DemoModal>
            <Button size="lg" className="gap-2">
              Start Free Trial
              <ArrowRight className="h-4 w-4" />
            </Button>
          </DemoModal>
          {/* <DemoModal>
            <Button size="lg" variant="outline">
              Schedule a Demo
            </Button>
          </DemoModal> */}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          No credit card required. 14-day free trial for all plans.
        </p>
      </div>
    </section>
  )
}
