import { promises } from "fs";
import fs from "fs";
import { createBrotliCompress, BrotliDecompress } from "zlib";

const filecheck = async (path_to_file, path_to_destination) => {
  try {
    await promises.access(path_to_file);
  } catch (error) {
    console.log("Operation failed inside file");
    return true;
  }
  try {
    await promises.stat(path_to_destination);
    console.log("Operation failed inside destination");
    return true;
  } catch (error) {}
  return false;
};

export const compress = async (path_to_file, path_to_destination) => {
  if (!path_to_destination.endsWith(".br")) {
    path_to_destination += ".br";
  }
  const shouldStop = await filecheck(path_to_file, path_to_destination);
  if (shouldStop) {
    return;
  }
  const brotli = createBrotliCompress();
  const readableStream = fs.createReadStream(path_to_file);
  const writableStream = fs.createWriteStream(path_to_destination);
  readableStream.on("error", (err) => {
    console.error("Error reading source file:", err);
  });
  writableStream.on("error", (err) => {
    console.error("Error writing to destination file:", err);
  });
  writableStream.on("finish", () => {
    console.log("File successfully compressed.");
  });
  readableStream.pipe(brotli).pipe(writableStream);
};

export const decompress = async (path_to_file, path_to_destination) => {
  const shouldStop = await filecheck(path_to_file, path_to_destination);
  if (shouldStop) {
    return;
  }
  const brotli = BrotliDecompress();
  const readableStream = fs.createReadStream(path_to_file);
  const writableStream = fs.createWriteStream(path_to_destination);
  readableStream.on("error", (err) => {
    console.error("Error reading compressed file:", err);
  });
  writableStream.on("error", (err) => {
    console.error("Error writing decompressed file:", err);
  });
  writableStream.on("finish", () => {
    console.log("File successfully decompressed.");
  });
  readableStream.pipe(brotli).pipe(writableStream);
};
