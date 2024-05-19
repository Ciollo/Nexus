export function openComponentPanel() {
    console.log("openComponentPanel");
    let overlay = document.getElementById("main-overlay");
    overlay.classList.toggle("display-none");
    overlay.classList.toggle("display-block");
}

export function isAddComponentTriggered(text, triggerCharacter) {
    const numLastCharacters = 2;
    let conditionTriggerEvent = text.slice(-numLastCharacters);
    if (conditionTriggerEvent === triggerCharacter) {
        return true;
    }
    return false;
}

export function closeComponentPanel() {
    let overlay = document.getElementById("main-overlay");
    if (overlay.classList.contains("display-block")) {
        overlay.classList.toggle("display-none");
        overlay.classList.toggle("display-block");
    }
}