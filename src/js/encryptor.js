function getElements() {
    return {
        btnEncrypt: document.querySelector(".btn-encrypt"),
        txtEncrypt: document.querySelector(".encrypt"),
        warning: document.querySelector(".txt-warning"),
        response: document.querySelector(".analyze"),
        content: document.querySelector(".contain-card"),
        btnCopy: document.querySelector(".btn-copy"),
        btnDecrypt: document.querySelector(".btn-decrypt")
    };
}

// Mostrar reglas - Show rules
function showWarning(warning, message) {
    warning.style.background = "#0A3871";
    warning.style.color = "#FFFF";
    warning.style.fontWeight = "800";
    warning.textContent = message;
    setTimeout(() => {
        warning.removeAttribute("style");
    }, 1500);
}

// Encriptar texto - Encrypt text
function processText(text, mode) {
    let newText = text;
    if (mode === "encrypt") {
        newText = newText.replace(/e/mg, "enter")
                        .replace(/i/mg, "imes")
                        .replace(/a/mg, "ai")
                        .replace(/o/mg, "ober")
                        .replace(/u/mg, "ufat");
    } else if (mode === "decrypt") {
        newText = newText.replace(/enter/mg, "e")
                        .replace(/imes/mg, "i")
                        .replace(/ai/mg, "a")
                        .replace(/ober/mg, "o")
                        .replace(/ufat/mg, "u");
    }
    return newText;
}

// Validar texto - Validate text
function validateText(text, warning) {
    const normalizedText = text.normalize("NFD").replace(/[$\.¿\?~!\¡@#%^&*()_|}\{[\]>\<:"`;,\u0300-\u036f']/g, " ");
    if (text === "") {
        showWarning(warning, "El campo de texto no debe estar vacío");
        return false;
    } else if (text !== normalizedText) {
        showWarning(warning, "No debe tener acentos y caracteres especiales");
        return false;
    } else if (text !== text.toLowerCase()) {
        showWarning(warning, "El texto debe ser todo en minúscula");
        return false;
    }
    return true;
}

// Cifrar o descifrar texto - Encrypt or decrypt text
function handleText(e, mode, elements) {
    e.preventDefault();
    const texto = elements.txtEncrypt.value.trim();
    const warning = elements.warning;
    if (validateText(texto, warning)) {
        const processedText = processText(texto, mode);
        elements.response.textContent = processedText;
        // Mostrar el botón de copiar solo si hay texto de respuesta
        elements.btnCopy.style.display = processedText ? "inline-block" : "none";
        elements.response.style.display = processedText ? "inline-block" : "none";
        elements.content.remove();
    }
}

// Copiar texto al portapapeles - copy text to clipboard
function copyTextToClipboard(response) {
    response.select();
    document.execCommand("copy");
}

const elements = getElements();

// Event Listeners
elements.btnEncrypt.addEventListener("click", e => handleText(e, "encrypt", elements));
elements.btnDecrypt.addEventListener("click", e => handleText(e, "decrypt", elements));
elements.btnCopy.addEventListener("click", e => {
    e.preventDefault();
    copyTextToClipboard(elements.response);
});
