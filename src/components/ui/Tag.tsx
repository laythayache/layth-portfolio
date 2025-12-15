interface TagProps {
  children: React.ReactNode;
  className?: string;
}

export default function Tag({ children, className = "" }: TagProps) {
  return (
    <span
      className={`px-2 py-1 text-xs rounded border ${className}`}
      style={{
        borderColor: "var(--text)",
        backgroundColor: "var(--bg)",
        color: "var(--text)",
        opacity: 0.6,
      }}
    >
      {children}
    </span>
  );
}
