import { motion } from "framer-motion";
import { Mail, MessageCircle, ArrowLeft, Hand } from "lucide-react";
import { Link } from "react-router-dom";

const ContactPage = () => {
  const email = "laythayache5@gmail.com";
  const whatsappNumber = "+96171511302";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, "")}`;

  const signLanguageEmojis = ["🤟", "👋", "✌️", "🙏", "👍", "❤️"];

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-24 relative overflow-hidden">
      {/* Background Sign Language Emojis */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {signLanguageEmojis.map((emoji, index) => (
          <motion.div
            key={index}
            className="absolute text-6xl md:text-8xl opacity-5"
            style={{
              left: `${15 + index * 15}%`,
              top: `${20 + (index % 2) * 60}%`,
            }}
            animate={{
              y: [0, -30, 0],
              rotate: [0, 15, -15, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 6 + index,
              repeat: Infinity,
              delay: index * 0.5,
              ease: "easeInOut",
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto max-w-2xl relative z-10">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/projects/omnisign"
            className="inline-flex items-center gap-2 font-mono text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={16} />
            Back to OmniSign
          </Link>
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="mb-8"
          >
            <motion.div
              className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6"
              animate={{
                rotate: [0, 10, -10, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <span className="text-5xl">🤟</span>
            </motion.div>
          </motion.div>

          <h1 className="font-mono text-4xl md:text-5xl font-bold text-foreground mb-4">
            Let's Connect
          </h1>
          <p className="text-xl text-muted-foreground mb-4 max-w-xl mx-auto leading-relaxed">
            Ready to try OmniSign? We're here to help bridge communication gaps.
          </p>
          <p className="text-lg text-muted-foreground mb-12 max-w-xl mx-auto leading-relaxed">
            Whether you communicate in sign language, spoken language, or both—we're ready to listen.
          </p>

          {/* Sign Language Gesture Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-center gap-4 mb-12"
          >
            {["👋", "🤟", "✌️", "🙏", "👍"].map((emoji, index) => (
              <motion.div
                key={index}
                className="text-4xl"
                animate={{
                  y: [0, -10, 0],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut",
                }}
              >
                {emoji}
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Email */}
            <motion.a
              href={`mailto:${email}?subject=OmniSign Inquiry`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="group p-8 border-2 border-border rounded-lg hover:border-primary/40 transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm"
            >
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                <Mail className="w-8 h-8 text-primary" />
              </div>
              <div className="text-3xl mb-3">✉️</div>
              <h3 className="font-mono text-lg font-medium text-foreground mb-2">
                Email
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                Send us a message in any language
              </p>
              <p className="font-mono text-sm text-primary break-all">
                {email}
              </p>
            </motion.a>

            {/* WhatsApp */}
            <motion.a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="group p-8 border-2 border-border rounded-lg hover:border-accent/40 transition-all duration-300 hover:scale-105 bg-card/50 backdrop-blur-sm"
            >
              <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center mb-4 mx-auto group-hover:bg-accent/20 transition-colors">
                <MessageCircle className="w-8 h-8 text-accent" />
              </div>
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-mono text-lg font-medium text-foreground mb-2">
                WhatsApp
              </h3>
              <p className="text-muted-foreground text-sm mb-3">
                Text or send voice messages
              </p>
              <p className="font-mono text-sm text-accent">
                {whatsappNumber}
              </p>
            </motion.a>
          </div>

          {/* Sign Language Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="p-6 border-2 border-primary/20 rounded-lg bg-primary/5 mb-6"
          >
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="text-2xl">🤟</span>
              <p className="font-mono text-sm text-foreground">
                We support communication in all forms
              </p>
              <span className="text-2xl">👋</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Whether you prefer sign language, text, or voice—we're here to connect.
            </p>
          </motion.div>

          {/* Additional Message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-muted-foreground text-sm"
          >
            We typically respond within 24 hours. <span className="text-foreground">🤟</span>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default ContactPage;

