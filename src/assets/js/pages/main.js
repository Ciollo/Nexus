// import { addClickListenersToButtons } from "../components/settingsPanel.js";
import { addSettingPanel } from "../components/addSettingPanel.js";
import {
	openComponentPanel,
	closeComponentPanel,
	isAddComponentTriggered,
} from "../utils/addComponent.js";

let btnSettings = document.getElementById("btn-page-settings");
let mainOverlay = document.getElementById("main-overlay");
let userContent = document.getElementById("user-content");

function toggleOverlayVisibility() {
	mainOverlay.classList.toggle("display-none");
	mainOverlay.classList.toggle("display-block");
}

function openSettingsPanel() {
	toggleOverlayVisibility();
	addSettingPanel(mainOverlay);
}

addClickListenersToButtons();

btnSettings.addEventListener("click", openSettingsPanel);

mainOverlay.addEventListener("click", function (event) {
	let settingsPanel = document.getElementById("container-user-settings-panel");
	if (settingsPanel && !settingsPanel.contains(event.target)) {
		mainOverlay.innerHTML = "";
		toggleOverlayVisibility();
	}
});

function addClickListenersToButtons() {
	document.querySelectorAll(".setting-element").forEach((button) => {
		button.addEventListener("click", function () {
			let settingContent = document.getElementById("setting-content");
			switch (button.id) {
				case "setting-element-setting":
					settingsPanelContent(settingContent);
					break;
				case "setting-element-people":
					peoplePanelContent(settingContent);
					break;
				default:
				case "setting-element-upgrade":
					upgradePanelContent(settingContent);
					break;
					console.error("Button not found");
			}
		});
	});
}
mainOverlay.addEventListener("click", function (event) {
	let notionPanel = document.getElementById("notion-like-panel");
	if (notionPanel && !notionPanel.contains(event.target)) {
		notionPanel.remove();
		toggleOverlayVisibility();
	}
});

userContent.addEventListener("input", function (event) {
	let newTextContent = event.target.textContent;

	const triggerCharacter = "/+";
	console.log("ciao");

	if (isAddComponentTriggered(newTextContent, triggerCharacter)) {
		openNotionLikePanel();
	} else {
		closeComponentPanel();
	}
});

function createNotionLikePanel() {
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
function openNotionLikePanel() {
	let panel = document.getElementById("notion-like-panel");
	if (panel) {
		// If the panel already exists, remove it
		panel.remove();
	}
	// Always create the panel
	createNotionLikePanel();
}

function getCaretCoordinates() {
	let x = 0,
		y = 0;
	const sel = window.getSelection();
	if (sel.rangeCount) {
		const range = sel.getRangeAt(0);
		if (range.getClientRects().length) {
			const rect = range.getClientRects()[0];
			x = rect.left;
			y = rect.bottom;
		}
	}
	return { x, y };
}

function createTodoBlock(placeholder) {
	let newBlock = document.createElement("div");
	let checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.id = "todo";
	let input = document.createElement("input");
	input.type = "text";
	input.placeholder = placeholder;
	newBlock.appendChild(checkbox);
	newBlock.appendChild(input);
	newBlock.classList.add("todo");
	return newBlock;
}
