const root = document.documentElement;
const orbit = document.querySelector(".orbit");
const time = document.querySelector(".local-time");

function updateTime() {
  if (!time) return;

  const current = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Beirut",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(new Date());

  time.textContent = `${current} Beirut`;
}

function handlePointerMove(event) {
  if (!orbit || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const x = event.clientX / window.innerWidth - 0.5;
  const y = event.clientY / window.innerHeight - 0.5;
  root.style.setProperty("--pointer-x", `${x * 18}px`);
  root.style.setProperty("--pointer-y", `${y * 18}px`);
}

updateTime();
window.setInterval(updateTime, 30_000);
window.addEventListener("pointermove", handlePointerMove, { passive: true });
