const Footer = () => {
  const footerLinks = {
    Product: ["Features", "Pricing", "API Docs", "Changelog"],
    Company: ["About", "Blog", "Careers", "Press"],
    Resources: ["Documentation", "Community", "Support", "Status"],
    Legal: ["Privacy", "Terms", "Accessibility", "Cookies"],
  };

  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🤟</span>
              <span className="font-mono text-xl font-bold text-foreground">OmniSign</span>
            </div>
            <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
              AI-powered sign language translation platform breaking communication barriers.
            </p>
            <p className="text-muted-foreground text-xs">
              Made with ❤️ for accessibility
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-mono text-sm font-medium text-foreground mb-4 uppercase tracking-widest">
                {category}
              </h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © 2024 OmniSign. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

