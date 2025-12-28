import { motion } from "framer-motion";
import { Linkedin, Github, Mail } from "lucide-react";

interface TeamMember {
  name: string;
  role: string;
  image: string;
  linkedin?: string;
  github?: string;
  email?: string;
}

const TeamSection = () => {
  const teamMembers: TeamMember[] = [
    {
      name: "Tayseer Laz",
      role: "Web & PR Coordinator",
      image: "/tayseer-laz.jpeg",
    },
    {
      name: "Layth Ayache",
      role: "Computer Vision & Machine Learning Engineer",
      image: "/layth-ayache.jpeg",
    },
    {
      name: "Abu Baker Hussein El Khatib",
      role: "Mobile & Web Application Development",
      image: "/abubaker.jpeg",
    },
    {
      name: "Noor El Hariri",
      role: "Web Developer & Project Coordinator",
      image: "/noor-el-hariri.jpeg",
    },
    {
      name: "Rami Kronbi",
      role: "Computer Vision & Machine Learning Engineer",
      image: "/rami-kronbi.jpeg",
    },
    {
      name: "Dr. Oussama Mustapha",
      role: "Research Advisor and Consultant",
      image: "/oussama-mustapha.jpeg",
    },
  ];

  return (
    <section className="relative py-20 md:py-32 px-6 overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-primary/20" />
      
      {/* Blur Decorations */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-mono text-4xl md:text-6xl font-bold text-foreground mb-6">
            The Team
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Building OmniSign with passion for accessibility and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              className="text-center"
            >
              <div className="relative mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="w-48 h-48 mx-auto rounded-full overflow-hidden border-4 border-border shadow-lg"
                >
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover"
                    style={member.name === "Tayseer Laz" ? { objectPosition: "center top" } : undefined}
                  />
                </motion.div>
              </div>
              <h3 className="font-mono text-xl font-medium text-foreground mb-2">
                {member.name}
              </h3>
              <p className="text-muted-foreground mb-4">{member.role}</p>
              
              {/* Social Links */}
              <div className="flex justify-center gap-3">
                {member.linkedin && (
                  <a
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-foreground transition-colors"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <Linkedin className="w-4 h-4 text-foreground" />
                  </a>
                )}
                {member.github && (
                  <a
                    href={member.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-foreground transition-colors"
                    aria-label={`${member.name} GitHub`}
                  >
                    <Github className="w-4 h-4 text-foreground" />
                  </a>
                )}
                {member.email && (
                  <a
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 rounded-full border-2 border-border flex items-center justify-center hover:border-foreground transition-colors"
                    aria-label={`${member.name} Email`}
                  >
                    <Mail className="w-4 h-4 text-foreground" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

