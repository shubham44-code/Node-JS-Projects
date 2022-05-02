let fs = require("fs");
let path = require("path");

function treeFn(dirPath) {
  // let destPath;
  if (dirPath == undefined) {
    treeHelper(process.cwd(), "");
    return;
  } else {
    let doesExist = fs.existsSync(dirPath);
    if (doesExist) {
      treeHelper(dirPath, "");
    } else {
      console.log("Kindly Enter The Path");
      return;
    }
  }
}

function treeHelper(dirPath, indent) {
  let isFile = fs.lstatSync(dirPath).isFile();
  if (isFile) {
    let fileName = path.basename(dirPath);
    console.log(indent + "├──" + fileName);
  } else {
    let dirName = path.basename(dirPath);
    console.log(indent + "└──" + dirName);
    let chidrens = fs.readdirSync(dirPath);
    for (let i = 0; i < chidrens.length; i++) {
      let childPath = path.join(dirPath, chidrens[i]);
      treeHelper(childPath, `${indent}\t`);
    }
  }
}

module.exports = treeFn;
