const STORAGE_KEY = "rr_reduced_motion";

export function getReducedMotion(): boolean {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const value = localStorage.getItem(STORAGE_KEY);
    return value === "true";
  } catch {
    return false;
  }
}

export function setReducedMotion(value: boolean): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, String(value));
  } catch {
    // Fail silently if localStorage is unavailable
  }
}
