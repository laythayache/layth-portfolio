import { cp, mkdir, rm, copyFile, readFile, writeFile } from "node:fs/promises";

const output = new URL("../out/", import.meta.url);
const root = new URL("../", import.meta.url);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL("public/", root), output, { recursive: true });
const sourceHtml = await readFile(new URL("index.html", root), "utf8");
const productionHtml = sourceHtml.replace('/src/styles.css', '/styles.css');
await writeFile(new URL("index.html", output), productionHtml);
await copyFile(new URL("src/styles.css", root), new URL("styles.css", output));

console.log("Built static hero to out/");
