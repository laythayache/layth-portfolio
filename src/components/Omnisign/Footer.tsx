const Footer = () => {
  return (
    <footer className="border-t border-border/50">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand and Description */}
          <div className="text-center md:text-left">
            <h3 className="font-mono text-lg font-medium text-foreground mb-2">
              OmniSign
            </h3>
            <p className="text-sm text-muted-foreground max-w-md">
              AI-powered sign language translation for Lebanese Sign Language
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <a 
              href="#features" 
              className="hover:text-foreground transition-colors"
            >
              Features
            </a>
            <a 
              href="#team" 
              className="hover:text-foreground transition-colors"
            >
              Team
            </a>
            <a 
              href="/projects/omnisign/contact" 
              className="hover:text-foreground transition-colors"
            >
              Contact
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} OmniSign. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-muted-foreground">
            <a 
              href="#" 
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </a>
            <a 
              href="#" 
              className="hover:text-foreground transition-colors"
            >
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

