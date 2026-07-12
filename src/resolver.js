function resolve(data, path) {
    console.log("Resolving path:", path);
    console.log("Data:", JSON.stringify(data, null, 2));
  // Remove "$." from the beginning
  const normalizedPath = path.replace(/^\$\./, "");
  console.log("Normalized path:", normalizedPath);

  // Convert array indexes to dot notation
  // Example:
  // income.w2Forms[0].wages
  // becomes
  // income.w2Forms.0.wages
  const keys = normalizedPath
    .replace(/\[(\d+)\]/g, ".$1")
    .split(".");

console.log("Keys:", keys);

  let current = data;

  for (const key of keys) {
    console.log("Processing key:", key);
    if (current == null) {
      return undefined;
    }

    current = current[key];
    console.log("Current value:", current);
  }

  console.log("Final resolved value:", current);
  return current;
}

module.exports = {
  resolve,
};