import Link from "next/link";
import { Header } from "@/components/header";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy policy and data protection practices of MKX Industries Pvt Ltd.",
};

export default function PrivacyPage() {
  const lastUpdated = "April 7, 2026";

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="container mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="mb-12 space-y-4">
          <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">Last updated: {lastUpdated}</p>
        </div>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-12">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">1. Introduction</h2>
            <p className="leading-7 text-muted-foreground">
              SaaS Controllers ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and safeguard your information when you use our HRMS, CRMS, and POS systems.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">2. Information We Collect</h2>
            <p className="leading-7 text-muted-foreground">
              We collect information you provide directly to us when you create an account, use our Services, or communicate with us.
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Contact information (e.g., name, email address, phone number).</li>
              <li>Professional information (e.g., company name, company size).</li>
              <li>Payment and billing information.</li>
              <li>Technical data (e.g., IP address, browser type, device information).</li>
              <li>Usage data (e.g., how you interact with our Services).</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">3. How We Use Your Information</h2>
            <p className="leading-7 text-muted-foreground">
              We use the information we collect for various purposes, including:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>Providing, maintaining, and improving our Services.</li>
              <li>Processing transactions and sending related information.</li>
              <li>Sending technical notices, updates, and support messages.</li>
              <li>Communicating with you about products, services, and events.</li>
              <li>Monitoring and analyzing trends, usage, and activities.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">4. Data Security</h2>
            <p className="leading-7 text-muted-foreground">
              We use industry-standard security measures to protect your personal data from unauthorized access, disclosure, or misuse. This includes encryption of data in transit and at rest.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">5. Information Sharing</h2>
            <p className="leading-7 text-muted-foreground">
              We do not sell your personal data. We may share your information with service providers who perform services on our behalf, or as required by law.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">6. Your Rights</h2>
            <p className="leading-7 text-muted-foreground">
              Depending on your location, you may have rights regarding your personal data, such as the right to access, correct, or delete your information. You can manage your communication preferences through your account settings.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-bold border-b pb-2">7. Contact Us</h2>
            <p className="leading-7 text-muted-foreground">
              If you have any questions about this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="rounded-lg bg-card p-6 border border-border">
              <p className="font-semibold">SaaS Controllers Privacy Team</p>
              <p className="text-sm text-muted-foreground">Email: privacy@saascontrollers.com</p>
              <p className="text-sm text-muted-foreground">Address: 123 Tech Lane, Silicon Valley, CA</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t border-border bg-card py-12">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2026 SaaS Controllers. All rights reserved.</p>
          <div className="mt-4 flex justify-center gap-6">
            <Link href="/privacy" className="hover:text-foreground">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
