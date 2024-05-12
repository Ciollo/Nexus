import { getCaretCoordinates } from "../utils/caretCoordinates.js";
import { createTodoBlock } from "./todoBlock.js";
import { toggleOverlayVisibility } from "../utils/overlay.js";

export function createNotionLikePanel() {
	let mainOverlay = document.getElementById("main-overlay");

	toggleOverlayVisibility();
	// Create a new div for the panel
	let panel = document.createElement("div");
	panel.id = "notion-like-panel";

	// Get the caret coordinates
	const caretCoordinates = getCaretCoordinates();

	// Add styles to the panel
	panel.style.position = "fixed";
	panel.style.left = `${caretCoordinates.x}px`;
	panel.style.top = `${caretCoordinates.y}px`;
	panel.style.width = "300px";
	panel.style.height = "300px";
	panel.style.backgroundColor = "#f5f5f5";
	panel.style.border = "1px solid #ddd";
	panel.style.padding = "10px";
	panel.style.overflow = "auto";

	// Add the panel to the mainOverlay
	mainOverlay.appendChild(panel);

	// Add blocks to the panel
	let blocks = [
		{ type: "todo", text: "To Do" },
		{ type: "toggleList", text: "Toggle List" },
		{ type: "block", text: "Block 3" },
	]; // Add your blocks here
	blocks.forEach((block) => {
		let blockElement = document.createElement("div");
		blockElement.textContent = block.text;
		blockElement.classList.add(block.type); // Add the block type as a class
		blockElement.addEventListener("click", function () {
			// Handle the click event here
			console.log(`Clicked on ${block.text}`);

			// Create the selected block in the userContent div
			let newBlock;
			if (block.type === "todo") {
				newBlock = createTodoBlock(block.text);
			} else {
				newBlock = document.createElement("div");
				newBlock.textContent = block.text;
			}
			newBlock.classList.add(block.type);

			// Replace the current div with the new block
			userContent.replaceChild(newBlock, userContent.firstChild);

			// Remove the panel and hide the overlay
			panel.remove();
			toggleOverlayVisibility();
		});
		panel.appendChild(blockElement);
	});
}

export function openNotionLikePanel() {
	let panel = document.getElementById("notion-like-panel");
	if (panel) {
		// If the panel already exists, remove it
		panel.remove();
	}
	// Always create the panel
	createNotionLikePanel();
}
