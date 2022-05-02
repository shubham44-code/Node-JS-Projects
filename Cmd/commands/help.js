function helpFn(dirPath) {
  console.log(`
      *****List Of All Commands*****
          node main.js tree ${dirPath}
          node main.js oragnize ${dirPath}
          node main.js help
    `);
}

module.exports = helpFn;
