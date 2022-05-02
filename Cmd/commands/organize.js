let fs = require("fs");
let path = require("path");
const { types } = require("../utility");

function oragnizeFn(dirPath) {
  let destPath;
  if (dirPath == undefined) {
    destPath = process.cwd();
    return;
  } else {
    let doesExist = fs.existsSync(dirPath);
    if (doesExist) {
      destPath = path.join(dirPath, "Organized_File");
      if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath);
      }
    } else {
      console.log("Kindly Enter The Path");
      return;
    }
  }
  oragnizeHelper(dirPath, destPath);
}

function oragnizeHelper(src, dest) {
  let childNames = fs.readdirSync(src);
  for (let i = 0; i < childNames.length; i++) {
    let childAddress = path.join(src, childNames[i]);
    let isFile = fs.lstatSync(childAddress).isFile();
    if (isFile) {
      let category = getCategory(childNames[i]);
      sendFiles(childAddress, dest, category);
    }
  }
}

function getCategory(name) {
  let extn = path.extname(name);
  extn = extn.slice(1);
  for (let type in types) {
    let cTypeArray = types[type];
    for (let i = 0; i < cTypeArray.length; i++) {
      if (extn == cTypeArray[i]) {
        return type;
      }
    }
  }
  return "others";
}

function sendFiles(srcFilePath, dest, category) {
  let categoryPath = path.join(dest, category);
  if (fs.existsSync(categoryPath) == false) {
    fs.mkdirSync(categoryPath);
  }
  let fileName = path.basename(srcFilePath);
  let destFilePath = path.join(categoryPath, fileName);
  fs.copyFileSync(srcFilePath, destFilePath);
  fs.unlinkSync(srcFilePath);
  console.log(fileName, "copied to ", category);
}

module.exports = oragnizeFn;
