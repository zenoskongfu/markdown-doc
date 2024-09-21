import path from "path";
import checkDirIsExist from "./util/checkDirIsExist";

export const TempPath = path.resolve(__dirname, "../node_modules/.temp");

checkDirIsExist(TempPath);
