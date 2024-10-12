import fs from "fs/promises";
import path from "path";

const file = process.argv[2];

const fixImports = async (file: string) => {
  const content = await fs.readFile(file, "utf-8");

  /**
   * replace #import <AsyncDisplayKit/ASLayout.h>
   * with #import "ASLayout.h"
   */
  const newContent = content.replace(
    /#import <AsyncDisplayKit\/(.*?)>/g,
    '#import "$1"'
  );

  await fs.writeFile(file, newContent);
}

const fixImportsInDir = async (dir: string) => {
  const files = await fs.readdir(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = await fs.lstat(filePath);
    if (stat.isDirectory()) {
      await fixImportsInDir(filePath);
    } else {
      await fixImports(filePath);
    }
  }
}


if (file) {
  fixImports(file);
} else {
  fixImportsInDir("spm-sources");
}
