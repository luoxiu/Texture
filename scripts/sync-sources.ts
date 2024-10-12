import fs from "fs/promises";
import path from "path";

const sourcesDir = "spm-sources"

if (await fs.exists(sourcesDir)) {
  await fs.rm(sourcesDir, { recursive: true });
}
await fs.mkdir(sourcesDir);

const headersDir = path.join(sourcesDir, "spm-headers")
await fs.mkdir(headersDir);

const copyDirRecursively = async (fromDir: string, toDir: string) => {
  if (!await fs.exists(toDir)) {
    await fs.mkdir(toDir);  
  }

  const files = await fs.readdir(fromDir);
  for (const file of files) {
    const from = path.join(fromDir, file)
    const to = path.join(toDir, file)

    const stat = await fs.lstat(from);
    if (stat.isDirectory()) {
      await copyDirRecursively(
        from,
        to
      );
    } else {
      if (file.endsWith(".h")) {
        await fs.copyFile(from, path.join(headersDir, file));
      } else {
        await fs.copyFile(from, to);
      }
    }
  }
}

await copyDirRecursively("source", sourcesDir);
