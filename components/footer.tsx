import Link from "next/link";

const footerLinks = {
  products: [
    { name: "HRMS", href: "#" },
    { name: "CRMS", href: "#" },
    { name: "POS System", href: "#" },
    { name: "Integrations", href: "#" },
    { name: "API", href: "#" },
  ],
  company: [
    { name: "About", href: "/#features" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Partners", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Community", href: "#" },
    { name: "Webinars", href: "#" },
    { name: "Case Studies", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Security", href: "#" },
    { name: "GDPR", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="flex relative whitespace-nowrap items-center gap-0.5"
            >
              <span className="rounded-full h-10 w-10 bg-[#A70400]"></span>
              <span className="text-2xl absolute left-[10.5px] tracking-wider font-bold font-orbitron stroke-1 text-foreground text-stroke-black">
                MKX Industries
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              MKX Industries Pvt Ltd. Enterprise-grade business solutions to
              help you scale. HRMS, CRMS, and POS systems built for modern
              businesses.
            </p>
          </div>

          {/* Products */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Products
            </h3>
            <ul className="space-y-2">
              {footerLinks.products.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Company
            </h3>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Resources
            </h3>
            <ul className="space-y-2">
              {footerLinks.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-sm font-semibold text-foreground">
              Legal
            </h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} MKX Industries Pvt Ltd. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              LinkedIn
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
