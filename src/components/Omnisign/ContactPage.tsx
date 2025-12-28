import { motion } from "framer-motion";
import { Mail, MessageCircle, ArrowLeft, Clock, Globe, Languages } from "lucide-react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const email = "laythayache5@gmail.com";
  const whatsappNumber = "+96171511302";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`;

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Subtle Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto max-w-4xl relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-12"
        >
          <Link
            to="/projects/omnisign"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to OmniSign
          </Link>
        </motion.div>

        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-16"
        >
          <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-4">
            Ready to bridge communication gaps with OmniSign?
          </p>
          <p className="text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We support communication in all forms—sign language, text, or voice. Reach out in whichever way works best for you.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Email Card */}
          <motion.a
            href={`mailto:${email}?subject=OmniSign Inquiry`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="group relative p-8 border-2 border-border rounded-lg hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-card/80 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors flex-shrink-0">
                <Mail className="w-7 h-7 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-mono text-xl font-bold text-foreground mb-2">
                  Email
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Send us a message in any language. We'll respond within 24 hours.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-border/50">
              <p className="font-mono text-sm text-primary break-all group-hover:text-primary/80 transition-colors">
                {email}
              </p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180" />
            </div>
          </motion.a>

          {/* WhatsApp Card */}
          <motion.a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="group relative p-8 border-2 border-border rounded-lg hover:border-accent/50 transition-all duration-300 hover:shadow-xl bg-card/80 backdrop-blur-sm"
          >
            <div className="flex items-start gap-4 mb-6">
              <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center group-hover:bg-accent/20 transition-colors flex-shrink-0">
                <MessageCircle className="w-7 h-7 text-accent" />
              </div>
              <div className="flex-1">
                <h3 className="font-mono text-xl font-bold text-foreground mb-2">
                  WhatsApp
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Text or send voice messages. Perfect for quick questions or voice communication.
                </p>
              </div>
            </div>
            <div className="pt-4 border-t border-border/50">
              <p className="font-mono text-sm text-accent group-hover:text-accent/80 transition-colors">
                {whatsappNumber}
              </p>
            </div>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <ArrowLeft className="w-5 h-5 text-muted-foreground rotate-180" />
            </div>
          </motion.a>
        </div>

        {/* Communication Support Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
        >
          <div className="p-6 border border-border/50 rounded-lg bg-card/50 text-center">
            <Languages className="w-8 h-8 text-accent mx-auto mb-3" />
            <h4 className="font-mono text-sm font-medium text-foreground mb-2">
              All Languages
            </h4>
            <p className="text-xs text-muted-foreground">
              English, Arabic, Sign Language
            </p>
          </div>
          <div className="p-6 border border-border/50 rounded-lg bg-card/50 text-center">
            <Globe className="w-8 h-8 text-primary mx-auto mb-3" />
            <h4 className="font-mono text-sm font-medium text-foreground mb-2">
              Multiple Formats
            </h4>
            <p className="text-xs text-muted-foreground">
              Text, Voice, Video, Sign
            </p>
          </div>
          <div className="p-6 border border-border/50 rounded-lg bg-card/50 text-center">
            <Clock className="w-8 h-8 text-accent mx-auto mb-3" />
            <h4 className="font-mono text-sm font-medium text-foreground mb-2">
              Quick Response
            </h4>
            <p className="text-xs text-muted-foreground">
              Within 24 hours
            </p>
          </div>
        </motion.div>

        {/* Footer Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <p className="text-sm text-muted-foreground max-w-xl mx-auto">
            We're committed to making communication accessible. Whether you prefer sign language, text, or voice—we're here to connect.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;

