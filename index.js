const fs = require("fs");
const sourceMap = require("source-map");

const [, , file, line, column] = process.argv;

const rawSourceMap = JSON.parse(fs.readFileSync(file));

const smc = new sourceMap.SourceMapConsumer(rawSourceMap);

console.log(line, column);
console.log(
  smc.originalPositionFor({
    line: parseInt(line, 10),
    column: parseInt(column, 10)
  })
);

/**
smc.eachMapping(function(m) {
  if (!m.source.startsWith("node_modules")) {
    console.log(m);
  }
});
 **/

console.log(smc.sources.filter(src => !smc.sourceContentFor(src, null)));
console.log(
  "sourcemap has content of all sources: ",
  smc.hasContentsOfAllSources()
);

// console.log(
// k
// smc.generatedPositionFor({
// source: "http://example.com/www/js/two.js",
// line: 2,
// column: 10
// })
// );
// { line: 2, column: 28 }
// console.log(smc.sourceContentFor("/source/compose.js"));
