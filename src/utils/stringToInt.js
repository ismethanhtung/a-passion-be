const stringToInt = (data, fieldsToConvert) => {
    return Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] =
            fieldsToConvert.includes(key) && typeof value === "string"
                ? parseInt(value, 10)
                : value;
        return acc;
    }, {});
};

module.exports = stringToInt;
