const { formatValue } = require("../src/formatter");

console.log(formatValue(85000, {
    type: "currency"
}));

console.log(formatValue("1988-05-12", {
    type: "date"
}));

console.log(formatValue("123-45-6789", {
    type: "ssn"
}));

console.log(formatValue("John", {
    type: "text"
}));