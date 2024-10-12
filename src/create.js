import { promises as fs } from "fs";

export const createFile = async (filePath) => {
  const fileExists = await fs
    .stat(filePath)
    .then(() => true)
    .catch(() => false);
  if (fileExists) {
    console.log("Operation Failed");
  } else {
    const file = await fs.writeFile(filePath, "");
  }
};
