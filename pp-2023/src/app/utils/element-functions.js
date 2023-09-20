// returns the value from a specific class
export function getValueByClass(queryClass) {
    return document.querySelector(queryClass).value;
}

// returns the element from a specific class
export function getElementByClass(queryClass) {
    return document.querySelector(queryClass);
}

// creates an alert with a dynamic fieldName
export function alertMessage(fieldName) {
    return `${fieldName}` + ' ist ein Pflichtfeld!';
}