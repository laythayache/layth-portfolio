import { cp, mkdir, rm, copyFile } from "node:fs/promises";

const output = new URL("../out/", import.meta.url);
const root = new URL("../", import.meta.url);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL("public/", root), output, { recursive: true });
await copyFile(new URL("index.html", root), new URL("index.html", output));
await copyFile(new URL("src/styles.css", root), new URL("styles.css", output));
await copyFile(new URL("src/main.js", root), new URL("main.js", output));

console.log("Built static hero to out/");
