import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const TestimonialsSection = () => {
  const specialThanks = [
    {
      name: "Sign with Naila",
      link: "https://www.instagram.com/signwithnaila/",
      description: "Instagram",
    },
    {
      name: "Father Charbel and the Sin el fil Church",
      link: null,
      description: null,
    },
    {
      name: "The Aaramoun Orphanage",
      link: null,
      description: "Lebanon",
    },
  ];

  return (
    <section id="testimonials" className="py-20 md:py-32 px-6 bg-muted/30">
      <div className="container mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-mono text-4xl md:text-5xl font-bold text-foreground mb-4">
            Special Thanks
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We are grateful to the following for their support and collaboration
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {specialThanks.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="relative p-8 border-2 border-border rounded-lg bg-card text-center"
            >
              <Heart className="w-8 h-8 text-primary/30 mb-4 mx-auto" />
              {item.link ? (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <p className="font-mono text-lg font-medium text-foreground mb-2 hover:text-accent transition-colors">
                    {item.name}
                  </p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  )}
                </a>
              ) : (
                <>
                  <p className="font-mono text-lg font-medium text-foreground mb-2">
                    {item.name}
                  </p>
                  {item.description && (
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  )}
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

