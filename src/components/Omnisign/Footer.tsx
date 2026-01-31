const Footer = () => {
  return (
    <footer className="border-t border-border/50">
      <div className="container mx-auto px-6 sm:px-12 lg:px-24 py-8 sm:py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 sm:gap-8">
          {/* Brand and Description */}
          <div className="text-center md:text-left">
            <h3 className="font-mono text-base sm:text-lg font-medium text-foreground mb-2">
              OmniSign
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground max-w-md">
              AI-powered sign language translation for Lebanese Sign Language
            </p>
          </div>

          {/* Links - Two columns on mobile, single row on desktop */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-muted-foreground">
            <a 
              href="#features" 
              className="hover:text-foreground transition-colors text-center sm:text-left"
            >
              Features
            </a>
            <a 
              href="#team" 
              className="hover:text-foreground transition-colors text-center sm:text-left"
            >
              Team
            </a>
            <a 
              href="/projects/omnisign/contact" 
              className="hover:text-foreground transition-colors text-center sm:text-left"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-border/30 flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
          <p className="text-xs text-muted-foreground text-center sm:text-left">
            © {new Date().getFullYear()} OmniSign. All rights reserved.
          </p>
          <div className="flex gap-4 sm:gap-6 text-xs text-muted-foreground">
            <span className="hover:text-foreground transition-colors">
              Privacy
            </span>
            <span className="hover:text-foreground transition-colors">
              Terms
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

