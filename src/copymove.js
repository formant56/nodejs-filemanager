import {promises as fs} from"fs"

export const copyAFile = async(path_to_file, path_to_new_directory, deleteOriginal) =>{

    try {
        fs.access(path_to_file)
    } catch (error) {
        console.log("Operation failed")
        return
    }
    try {
        await fs.cp(path_to_file, path_to_new_directory, {
          recursive: true,
          force: false,
          errorOnExist: true,
        });
        if (deleteOriginal) {
          await fs.unlink(path_to_file);
          console.log("Original file deleted");
      }
      } catch (error) {
        
        if (error.code === "ERR_FS_CP_EEXIST") {
          console.log("Operation failed: Target file already exists");
      } else {
          console.log("Operation failed")
        
      }
    
}}