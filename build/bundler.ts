import { bundle } from "https://deno.land/x/emit/mod.ts";

const url = new URL(import.meta.resolve("../src/main.ts"));

async function build() {
  const { code } = await bundle(url);
  await Deno.writeTextFile("./main.js", code);
  console.log(`[bundler] main.js updated at ${new Date().toLocaleTimeString()}`);
}

await build();

const watcher = Deno.watchFs("./src");
console.log("[bundler] Watching ./src for changes...");
for await (const event of watcher) {
  if (event.kind === "modify" || event.kind === "create" || event.kind === "remove") {
    await build();
  }
}