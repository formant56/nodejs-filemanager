import { error } from "console";
import { promises as fs } from "fs";


 
export const removeAFile = async (filePath) => {

    
    try {
        await fs.access(filePath);
        const stat = await fs.stat(filePath);
        if (stat.isDirectory()) {
          throw new Error
        }
    } catch (error) {
        console.log("Operation Failed");
        return
    }
    await fs.rm(filePath);
   
}