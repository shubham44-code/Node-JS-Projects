#!/usr/bin/env node
const helpFn = require("./commands/help");
const oragnizeFn = require("./commands/organize");
const treeFn = require("./commands/tree");
let inputArr = process.argv.slice(2);
let cmd = inputArr[0];

switch (cmd) {
  case "tree":
    treeFn(inputArr[1]);
    break;
  case "oragnize":
    oragnizeFn(inputArr[1]);
    break;
  case "help":
    helpFn(inputArr[1]);
    break;
  default:
    console.log("Enter Right Command");
    break;
}
