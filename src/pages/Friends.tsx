import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import useDocumentTitle from "@/hooks/useDocumentTitle";

interface Friend {
  name: string;
  description: string;
  url?: string;
}

const friends: Friend[] = [
  {
    name: "Collaborator One",
    description: "Building the infrastructure for human coordination.",
  },
  {
    name: "Collaborator Two",
    description: "Research into distributed systems and emergence.",
  },
  {
    name: "Collaborator Three",
    description: "Design systems for complex information spaces.",
  },
];

const Friends = () => {
  useDocumentTitle("Friends — Layth Ayache");

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h1 className="font-mono text-4xl md:text-5xl font-medium mb-4 text-foreground">
            Friends
          </h1>
          <p className="text-muted-foreground max-w-xl">
            The incubator. Partners in building, thinking, and breaking through.
          </p>
        </motion.header>

        <div className="grid gap-8 md:gap-12">
          {friends.map((friend, index) => (
            <motion.article
              key={friend.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              {friend.url ? (
                <a
                  href={friend.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-8 border border-border rounded-lg hover:border-foreground/30 transition-colors duration-300"
                >
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="font-mono text-2xl font-medium text-foreground">
                      {friend.name}
                    </h2>
                    <motion.div
                      className="text-muted-foreground group-hover:text-foreground transition-colors"
                      whileHover={{ scale: 1.1 }}
                    >
                      <ExternalLink size={18} />
                    </motion.div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {friend.description}
                  </p>
                </a>
              ) : (
                <div className="p-8 border border-border rounded-lg">
                  <h2 className="font-mono text-2xl font-medium text-foreground mb-4">
                    {friend.name}
                  </h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {friend.description}
                  </p>
                </div>
              )}
            </motion.article>
          ))}
        </div>

        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-24 pt-16 border-t border-border text-center"
          aria-label="Collaborate"
        >
          <p className="font-mono text-muted-foreground mb-4">
            Building something interesting?
          </p>
          <a
            href="mailto:laythayache5@gmail.com"
            className="inline-block font-mono text-foreground border-b border-foreground pb-1 hover:border-accent hover:text-accent transition-colors"
          >
            Let's talk
          </a>
        </motion.section>
      </div>
    </div>
  );
};

export default Friends;
