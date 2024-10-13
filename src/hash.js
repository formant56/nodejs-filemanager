import { createReadStream } from "fs";
import { createHash } from "crypto";

export const calculateHash = async (filePath) => {
  const hash = createHash("sha256");
  const stream = createReadStream(filePath);
  stream.on("data", (chunk) => {
    hash.update(chunk);
  });
  stream.on("end", () => {
    const hashHex = hash.digest("hex");
    console.log(`SHA256 Hash: ${hashHex}`);
  });

  stream.on("error", (err) => {
    console.error(`Operation failed`);
  });
};
