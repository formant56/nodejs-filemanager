import { promises as fs } from "fs";
import path from "path";

export const list = async () => {
  try {
    const workingDir = process.cwd();
    await fs.access(workingDir);
    const items = await fs.readdir(workingDir);
    let files = [];
    let folders = [];

    for (const item of items) {
      const itemPath = path.join(workingDir, item);
      const stat = await fs.stat(itemPath);
      if (stat.isDirectory()) {
        folders.push(item);
      } else {
        files.push(item);
      }
    }
    folders.sort();
    files.sort();

    const sortedList = folders
      .map((folder) => ({ Name: folder, Type: "directory" }))
      .concat(files.map((file) => ({ Name: file, Type: "file" })));

    console.table(sortedList);
  } catch (error) {
    throw new Error("FS operation failed");
  }
};
