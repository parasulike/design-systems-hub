import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

async function main() {
  const input = process.argv[2];
  if (!input) throw new Error("Usage: npm run import-awesome -- path/to/README.md");

  const rows = (await readFile(input, "utf8"))
    .split("\n")
    .filter((line) => /^\|\s*\[[^\]]+\]\(https?:\/\//.test(line))
    .map((line) => {
      const columns = line.split("|").slice(1, -1).map((column) => column.trim());
      const [, name, site_url] = columns[0].match(/^\[([^\]]+)\]\(([^)]+)\)/) ?? [];
      const source_url = columns[4]?.match(/\((https?:\/\/[^)]+)\)/)?.[1] ?? null;

      return {
        name,
        site_url,
        has_components: columns[1] === "👍",
        has_voice_and_tone: columns[2] === "👍",
        has_designers_kit: columns[3] === "👍",
        source_url,
      };
    });

  if (!rows.length || rows.some(({ name, site_url }) => !name || !site_url)) {
    throw new Error("No valid design-system rows found");
  }

  const output = path.join(process.cwd(), "data", "awesome-design-systems.json");
  await writeFile(output, `${JSON.stringify(rows, null, 2)}\n`);
  console.log(`Imported ${rows.length} systems to ${output}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
