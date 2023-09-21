// Gibt den Wert einer Klasse zurück.
export function getValueByClass(queryClass) {
    return document.querySelector(queryClass).value;
}

// Gibt die das Element mit einer bestimmten Klasse wieder.
export function getElementByClass(queryClass) {
    return document.querySelector(queryClass);
}

// Erstellt einen Alert mit einem dynamischen Input Feld.
export function alertMessage(fieldName) {
    return `${fieldName}` + ' ist ein Pflichtfeld!';
}