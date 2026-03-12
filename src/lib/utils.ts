import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function statusColor(status: string) {
  switch (status) {
    case "completed":
      return "bg-emerald-500";
    case "ongoing":
      return "bg-amber-500";
    case "paused":
      return "bg-slate-400";
    default:
      return "bg-slate-300";
  }
}
