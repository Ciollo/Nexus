let mainOverlay = document.getElementById("main-overlay");

export function toggleOverlayVisibility() {
    mainOverlay.classList.toggle("display-none");
    mainOverlay.classList.toggle("display-block");
}