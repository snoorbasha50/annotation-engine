
const fs=require('fs');
const path=require('path');
const { resolve } = require('./resolver');
const { formatValue } = require('./formatter');



function loadJsonFile(relativePath) {
   const filePath=path.join(__dirname, relativePath);
   const fileContent=fs.readFileSync(filePath, 'utf-8');
   return JSON.parse(fileContent);
}

function processAnnotations(data, annotations) {
    const taxpayerData=loadJsonFile("../sample-data/taxpayer.json");

    // Load schema file
    const schema=loadJsonFile("../annotation/annotation-schema.json");

    const resolvedData=[]

    for(const field of schema.fields) {
         const value = resolve(
         taxpayerData,
         field.binding.dataRef
        );

        const formattedValue = formatValue(value, field.format);

      resolvedData.push({
      id: field.id,
      label: field.label,
      resolvedValue: value,
      formattedValue: formattedValue,
      position: field.position,
      style: field.style,
      format: field.format,
      behavior: field.behavior
    });
   }

  return resolvedData;

    

}

module.exports = {
    processAnnotations
};