// returns the value from a spezific class
export function getValueByClass (queryClass) {
    return document.querySelector(queryClass).value;
};

// returns the element from a spezific class
export function getElementByClass (queryClass) {
    return document.querySelector(queryClass);
};