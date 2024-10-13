import readline from "readline";
import { homedir } from "os";
import { changeDir } from "./cd.js";
import { list } from "./list.js";
import { readAFile } from "./read.js";
import { createFile } from "./create.js";
import { renameFile } from "./rename.js";
import { copyAFile } from "./copymove.js";
import { removeAFile } from "./remove.js";
import { displayOSInfo } from "./osinfo.js";

const args = process.argv.slice(2);
let username = "";
args.forEach((arg) => {
  const [key, value] = arg.split("=");
  if (key === "--username") {
    username = value;
  }
});
if (!username) {
  console.error("Username is required. Use --username=your_username");
  process.exit(1);
}

const { stdin, stdout } = process;
let workingDir = homedir();
process.chdir(workingDir);

const startApp = async () => {
  const greetingMessage = `Welcome to the File Manager, ${username}! \n`;
  const exitMessage = `Thank you for using File Manager, ${username}, goodbye! \n`;
  const printCurrentDir = () => {
    stdout.write(`You are currently in ${process.cwd()} \n`);
  };
  const rl = readline.createInterface({
    input: stdin,
    output: stdout,
    prompt: "> ",
  });

  stdout.write(greetingMessage);
  printCurrentDir();
  rl.prompt();

  try {
    rl.on("line", async (line) => {
      const command = line.trim();
      if (command === ".exit") {
        process.exit();
      } else if (command === "up") {
        changeDir("up");
        printCurrentDir();
      } else if (command.startsWith("cd ")) {
        const pathToDirectory = command.slice(3).trim();
        changeDir(pathToDirectory);
        printCurrentDir();
      } else if (command === "ls") {
        await list();
        printCurrentDir();
      } else if (command.startsWith("cat ")) {
        const path_to_file = command.slice(4).trim();
        await readAFile(path_to_file);
        printCurrentDir();
      } else if (command.startsWith("add ")) {
        const new_file_name = command.slice(4).trim();
        await createFile(new_file_name);
        printCurrentDir();
      } else if (command.startsWith("rn ")) {
        const [, path_to_file, new_file_name] = command.split(" ");
        await renameFile(path_to_file, new_file_name);
        printCurrentDir();
      } else if (command.startsWith("cp ")) {
        const [, path_to_file, path_to_new_directory] = command.split(" ");
        await copyAFile(path_to_file, path_to_new_directory, false);
        printCurrentDir();
      } else if (command.startsWith("mv ")) {
        const [, path_to_file, path_to_new_directory] = command.split(" ");
        await copyAFile(path_to_file, path_to_new_directory, true);
        printCurrentDir();
      } else if (command.startsWith("rm ")) {
        const path_to_file = command.slice(3).trim();
        await removeAFile(path_to_file);
        printCurrentDir();
      } else if (command.startsWith("os ")) {
        const option = command.slice(3).trim();
        displayOSInfo(option);
        printCurrentDir();
        
      } else {
        stdout.write("invalid input \n");
      }
      rl.prompt();
    });
  } catch (error) {
    stdout.write("Operation failed \n");
  }
  process.on("exit", () => stdout.write(exitMessage));
};

startApp();
