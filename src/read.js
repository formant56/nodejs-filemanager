import { promises as fs } from "fs";

export const readAFile = async (filePath) => {
  try {
    await fs.access(filePath);
  } catch (error) {
    console.log("Operation failed");
    return;
  }
  const file = await fs.readFile(filePath, { encoding: "utf8" });
  console.log(file);
};
