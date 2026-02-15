import { motion, useReducedMotion } from "framer-motion";
import { Hand, Heart, Users, ArrowUpRight } from "lucide-react";
import type { CTACard } from "@/content/omnisign";

interface CTACardsProps {
  cards: CTACard[];
}

const iconMap = {
  hand: Hand,
  heart: Heart,
  users: Users,
};

function CTACardComponent({
  card,
  index,
}: {
  card: CTACard;
  index: number;
}) {
  const reduced = useReducedMotion();
  const Icon = iconMap[card.icon];

  const emailLink = `mailto:${card.email}?subject=${encodeURIComponent(card.subject)}`;

  return (
    <motion.a
      href={emailLink}
      className="group relative flex flex-col rounded-2xl border border-slate-200 bg-white p-6 transition-all hover:border-teal-300 hover:shadow-lg"
      initial={{ opacity: 0, y: reduced ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        delay: reduced ? 0 : index * 0.1,
        duration: reduced ? 0.15 : 0.5,
        ease: [0, 0, 0.2, 1],
      }}
      whileHover={reduced ? {} : { y: -4 }}
    >
      {/* Icon */}
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-100">
        <Icon size={24} />
      </div>

      {/* Title */}
      <h3 className="mb-2 font-sans text-lg font-semibold text-slate-800">
        {card.title}
      </h3>

      {/* Description */}
      <p className="mb-4 flex-1 text-sm leading-relaxed text-slate-600">
        {card.description}
      </p>

      {/* Action link */}
      <span className="inline-flex items-center gap-1.5 font-mono text-sm font-medium text-teal-600 transition-colors group-hover:text-teal-700">
        {card.action}
        <ArrowUpRight
          size={14}
          className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
        />
      </span>

      {/* Decorative corner accent */}
      <div className="absolute right-0 top-0 h-16 w-16 overflow-hidden rounded-tr-2xl">
        <div className="absolute -right-8 -top-8 h-16 w-16 rotate-45 bg-gradient-to-br from-teal-50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
    </motion.a>
  );
}

export default function CTACards({ cards }: CTACardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {cards.map((card, index) => (
        <CTACardComponent key={index} card={card} index={index} />
      ))}
    </div>
  );
}
