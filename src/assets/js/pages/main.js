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

addInputEventListener(userContent);
userContent.addEventListener("keydown", function (event) {
	if (event.key === "Enter") {
		console.log("Enter key pressed");
		event.preventDefault(); 
		let newDiv = createNewDiv("newDivId", "user-content");
		userContent.appendChild(newDiv);
	}
});

function addInputEventListener(element) {
	element.addEventListener("input", function (event) {
		let newTextContent = event.target.textContent;

		const triggerCharacter = "/+";

		if (isAddComponentTriggered(newTextContent, triggerCharacter)) {
			openNotionLikePanel(document.activeElement);
		} else {
			closeComponentPanel();
		}
	});
}
function createNotionLikePanel(targetDiv) {
	let mainOverlay = document.getElementById("main-overlay");

	toggleOverlayVisibility();

	let panel = document.createElement("div");
	panel.id = "notion-like-panel";

	const caretCoordinates = getCaretCoordinates();

	panel.style.position = "fixed";
	panel.style.left = `${caretCoordinates.x}px`;
	panel.style.top = `${caretCoordinates.y}px`;
	panel.style.width = "300px";
	panel.style.height = "300px";
	panel.style.backgroundColor = "#f5f5f5";
	panel.style.border = "1px solid #ddd";
	panel.style.padding = "10px";
	panel.style.overflow = "auto";

	mainOverlay.appendChild(panel);

	let blocks = [
		{ type: "todo", text: "To Do" },
		{ type: "toggleList", text: "Toggle List" },
		{ type: "block", text: "Block 3" },
	]; 
	blocks.forEach((block) => {
		let blockElement = document.createElement("div");
		blockElement.textContent = block.text;
		blockElement.classList.add(block.type); 
		blockElement.addEventListener("click", function () {

			console.log(`Clicked on ${block.text}`);

			let newBlock;
			if (block.type === "todo") {
				newBlock = createTodoBlock(block.text);
			} else {
				newBlock = document.createElement("div");
				newBlock.textContent = block.text;
			}
			newBlock.classList.add(block.type);

			targetDiv.textContent = "";
			targetDiv.appendChild(newBlock);

			let newEditableDiv = document.createElement("div");
			newEditableDiv.contentEditable = "true";
			newEditableDiv.classList.add("user-content");
			addInputEventListener(newEditableDiv);

			targetDiv.parentNode.insertBefore(newEditableDiv, targetDiv.nextSibling);

			panel.remove();
			toggleOverlayVisibility();
		});
		panel.appendChild(blockElement);
	});
}

function openNotionLikePanel(targetDiv) {
	let panel = document.getElementById("notion-like-panel");
	if (panel) {

		panel.remove();
	}

	createNotionLikePanel(targetDiv); 
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
	let newBlock = createNewDiv("todo", "todo");
	newBlock.className += " invisible-background";
	let checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.id = "todo";
	let input = document.createElement("input");
	input.type = "text";
	input.placeholder = placeholder;
	input.className = "todo-input-field"; 
	newBlock.appendChild(checkbox);
	newBlock.appendChild(input);
	return newBlock;
}

function createNewDiv(id, className) {
	let newDiv = document.createElement("div");
	newDiv.id = id;
	newDiv.className = className;
	newDiv.contentEditable = "true";
	return newDiv;
}