import type { ThankItem } from "@/content/omnisign";

interface ThanksListProps {
  items: ThankItem[];
}

export default function ThanksList({ items }: ThanksListProps) {
  return (
    <ul className="flex flex-col gap-4">
      {items.map((item) => (
        <li key={item.name} className="border-l-2 border-border pl-4">
          <p className="font-sans text-sm font-medium text-text-primary">
            {item.link ? (
              <a
                href={item.link}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 hover:text-text-secondary"
              >
                {item.name}
              </a>
            ) : (
              item.name
            )}
          </p>
          <p className="text-[13px] text-text-muted">{item.note}</p>
        </li>
      ))}
    </ul>
  );
}
