const fs = require("fs");
const path = require("path");

const { resolve } = require("./resolver");

const taxpayer = JSON.parse(
  fs.readFileSync(
    path.join(__dirname, "../sample-data/taxpayer.json"),
    "utf8"
  )
);

console.log("First Name:", resolve(taxpayer, "$.taxpayer.firstName"));

console.log(
  "Employer:",
  resolve(taxpayer, "$.income.w2Forms[0].employer.name")
);

console.log(
  "Second Wages:",
  resolve(taxpayer, "$.income.w2Forms[1].wages")
);

console.log(
  "Dependent:",
  resolve(taxpayer, "$.dependents[1].firstName")
);

console.log(
  "City:",
  resolve(taxpayer, "$.taxpayer.address.city")
);