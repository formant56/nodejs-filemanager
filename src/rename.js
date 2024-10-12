import { promises as fs } from "fs";

export const renameFile = async (path_to_file, new_file_name) => {
  try {
    await fs.access(path_to_file);
  } catch (error) {
    console.log("Operation failed");
    return;
  }
  try {
    await fs.access(new_file_name);
    console.log("FS operation failed");
    return;
  } catch (error) {
    if (error.code !== "ENOENT") {
      console.log("FS operation failed");
      return;
    }
  }

  await fs.rename(path_to_file, new_file_name);
};
