const { processAnnotations } = require("../src/annotationEngine");

const annotations = processAnnotations();

console.log("=========== Annotation Engine ===========");

annotations.forEach((field) => {
  console.log(field);
});

