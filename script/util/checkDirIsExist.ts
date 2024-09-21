import fs from "fs";

const checkDirIsExist = (_path: string) => {
  if (!fs.existsSync(_path)) {
    fs.mkdirSync(_path);
  }
};

export default checkDirIsExist;
