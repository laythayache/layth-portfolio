import { createHash } from "node:crypto";
import { cp, mkdir, rm, readFile, writeFile, readdir } from "node:fs/promises";

const output = new URL("../out/", import.meta.url);
const root = new URL("../", import.meta.url);

await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(new URL("public/", root), output, { recursive: true });
await cp(new URL("projects/", root), new URL("projects/", output), { recursive: true });
await cp(new URL("writing/", root), new URL("writing/", output), { recursive: true });
await cp(new URL("about/", root), new URL("about/", output), { recursive: true });

const sourceHtml = await readFile(new URL("index.html", root), "utf8");
await writeFile(new URL("index.html", output), sourceHtml);
const stylesheet = await readFile(new URL("src/styles.css", root));
const stylesheetVersion = createHash("sha256").update(stylesheet).digest("hex").slice(0, 12);
await writeFile(new URL("styles.css", output), stylesheet);

async function rewriteStylesheetLinks(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  for (const entry of entries) {
    const target = new URL(entry.name, directory);
    if (entry.isDirectory()) {
      await rewriteStylesheetLinks(new URL(`${entry.name}/`, directory));
      continue;
    }
    if (!entry.name.endsWith(".html")) continue;
    const html = await readFile(target, "utf8");
    await writeFile(target, html.replaceAll('/src/styles.css', `/styles.css?v=${stylesheetVersion}`));
  }
}

await rewriteStylesheetLinks(output);

console.log("Built static portfolio to out/");
