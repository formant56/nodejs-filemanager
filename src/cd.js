import os from "os";
import process from "process";

export const changeDir = (pathName) => {
  const isRoot =
    os.platform() === "win32"
      ? process.cwd().match(/^[a-zA-Z]:\\$/)
      : process.cwd() === "/";
  if (pathName === "up") {
    if (isRoot) {
      return;
    } else {
      process.chdir("..");
      console.log("going up");
      return;
    }
  }
  try {
    process.chdir(pathName);
  } catch (error) {
    process.stdout.write("Operation failed \n");
  }
};
