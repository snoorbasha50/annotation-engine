function formatValue(value, format) {

    // If value is null or undefined
    if (value === null || value === undefined) {
        return "";
    }

    switch (format.type) {

        case "currency":
            return Number(value).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });

        case "date": {
            const date = new Date(value);

            return date.toLocaleDateString("en-US");
        }

        case "ssn":
            return value;

        case "text":
        default:
            return String(value);
    }
}

module.exports = {
    formatValue
};