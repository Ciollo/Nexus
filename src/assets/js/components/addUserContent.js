import { toggleOverlayVisibility } from "./overlay.js";
import { TRIGGER_CHARACTER } from "../utils/constants.js";
import { getCaretCoordinates } from "../utils/coordinates.js";

export function openSelectionBlockPanel(currentFocusDiv) {
	let selectionBlockPanel = document.getElementById("block-selection-panel");
	if (selectionBlockPanel) {
		selectionBlockPanel.remove();
	}

	createSelectionBlockPanel(currentFocusDiv);
}

function createSelectionBlockPanel(currentFocusDiv) {
	let mainOverlay = document.getElementById("main-overlay");

	let selectionBlockPanel = document.createElement("div");
	selectionBlockPanel.id = "block-selection-panel";

	const caretCoordinates = getCaretCoordinates();

	selectionBlockPanel.classList.add("selection-block-panel");

	selectionBlockPanel.style.left = `${caretCoordinates.x}px`;
	selectionBlockPanel.style.top = `${caretCoordinates.y}px`;
	mainOverlay.appendChild(selectionBlockPanel);

	let blocks = [
		{ type: "title", text: "Title" },
		{ type: "subTitle", text: "Sub Title" },
		{ type: "todo", text: "To Do" },
		{ type: "toggleList", text: "Toggle List" },
		{ type: "unorderedList", text: "Unordered List" },
		{ type: "orderedList", text: "Ordered List" },
	];
	blocks.forEach((block) => {
		let blockElement = document.createElement("div");
		blockElement.textContent = block.text;
        blockElement.classList.add("block-element");
		blockElement.classList.add(block.type);
		blockElement.addEventListener("click", function () {
			let newBlock = createBlock(block);

			if (!newBlock) {
				return;
			}

			currentFocusDiv.textContent = currentFocusDiv.textContent.replace(
				TRIGGER_CHARACTER,
				""
			);

			currentFocusDiv.parentNode.insertBefore(
				newBlock,
				currentFocusDiv.nextSibling
			);

			// let newEditableDiv = document.createElement("div");
			// newEditableDiv.contentEditable = "true";
			// newEditableDiv.classList.add("user-content");
			// addInputEventListener(newEditableDiv);

			// newBlock.parentNode.insertBefore(newEditableDiv, newBlock.nextSibling);

			selectionBlockPanel.remove();
			toggleOverlayVisibility();
		});
		selectionBlockPanel.appendChild(blockElement);
	});
}

function createNewTitleSection(placeholder) {
	let newBlock = createNewDiv(
		"section-title-container",
		"section-title-container"
	);

	let input = createNewDiv("section-title", "section-title");
	input.setAttribute("data-placeholder", placeholder);
	input.contentEditable = true;
	input.textContent = placeholder; // set the initial text to the placeholder

	input.addEventListener("focus", function () {
		if (input.textContent === placeholder) {
			input.textContent = "";
		}
	});

	input.addEventListener("blur", function () {
		if (input.textContent === "") {
			input.textContent = placeholder;
		}
	});

	newBlock.contentEditable = false;
	newBlock.appendChild(input);

	return newBlock;
}

function createNewSubTitleSection(placeholder) {
	let newBlock = createNewDiv(
		"section-sub-title-container",
		"section-sub-title-container"
	);

	let input = createNewDiv("section-sub-title", "section-sub-title");
	input.setAttribute("data-placeholder", placeholder);
	input.contentEditable = true;
	input.textContent = placeholder; // set the initial text to the placeholder

	input.addEventListener("focus", function () {
		if (input.textContent === placeholder) {
			input.textContent = "";
		}
	});

	input.addEventListener("blur", function () {
		if (input.textContent === "") {
			input.textContent = placeholder;
		}
	});

	newBlock.contentEditable = false;
	newBlock.appendChild(input);

	return newBlock;
}
function createBlock(block) {
	let newBlock;

	switch (block.type) {
		case "title":
			newBlock = createNewTitleSection(block.text);
			break;
		case "subTitle":
			newBlock = createNewSubTitleSection(block.text);
			break;
		case "todo":
			newBlock = createTodoBlock(block.text);
			newBlock.classList.add("todo-block");
			break;
		case "toggleList":
			let toggleListName = window.prompt("Enter the name for the toggle list:");
			if (toggleListName) {
				newBlock = createToggleListBlock(toggleListName);
			}
			break;
		case "unorderedList":
		case "orderedList":
			newBlock = createListBlock(
				block.text,
				block.type === "unorderedList" ? "ul" : "ol"
			);
			// newBlock.classList.add("list-block");
			break;
		default:
			newBlock = document.createElement("div");
			newBlock.textContent = block.text;
			break;
	}

	newBlock.classList.add(block.type);
	newBlock.classList.add("block-class");
	newBlock.setAttribute("type", block.type);

	return newBlock;
}

function createListBlock(title, listType) {
	let newBlock = createNewDiv("list-block", "list-block");
	let list = document.createElement(listType);
	let numItems = parseInt(prompt("Enter the number of items for the list:"));
	if (isNaN(numItems) || numItems <= 0) {
		return null;
	}
	for (let i = 0; i < numItems; i++) {
		let itemText = prompt(`Enter text for item ${i + 1}:`);
		if (itemText.trim() === "") {
			continue;
		}
		list.appendChild(createListItem(itemText));
	}
	newBlock.appendChild(list);
	return newBlock;
}

function createListItem(text) {
	let listItem = document.createElement("li");
	listItem.textContent = text;
	return listItem;
}

function createTodoBlock(placeholder) {
	let newBlock = createNewDiv("todo", "todo");
	let checkbox = document.createElement("input");
	checkbox.type = "checkbox";

	checkbox.addEventListener("click", function (event) {
		event.stopPropagation();
	});

	let input = document.createElement("input");
	input.type = "text";
	input.placeholder = placeholder;
	input.className = "todo-input-field";

	input.addEventListener("click", function (event) {
		event.stopPropagation();
	});

	newBlock.contentEditable = false;
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

function createToggleListBlock(title) {
	let newBlock = createNewDiv("toggle-list", "toggle-list");
	let isOpened = false;

	let toggleButton = document.createElement("button");
	toggleButton.textContent = `> ${title}`;
	toggleButton.className = "toggle-list-button";
	toggleButton.addEventListener("click", function () {
		let listItems = newBlock.querySelectorAll(".toggle-list-item");
		listItems.forEach((item) => {
			item.classList.toggle("hidden");
		});

		isOpened = !isOpened;
		toggleButton.textContent = `${isOpened ? "V" : ">"} ${title}`;
	});
	newBlock.appendChild(toggleButton);

	newBlock.addEventListener("contextmenu", function (event) {
		event.preventDefault();

		let contextMenu = document.createElement("div");
		contextMenu.className = "context-menu";
		contextMenu.innerHTML = `
        <div class="context-menu-item">Edit</div>
        <div class="context-menu-item">Delete</div>
    `;

		contextMenu.style.position = "fixed";
		contextMenu.style.left = `${event.clientX}px`;
		contextMenu.style.top = `${event.clientY}px`;

		let editOption = contextMenu.querySelector(
			".context-menu-item:nth-child(1)"
		);
		let deleteOption = contextMenu.querySelector(
			".context-menu-item:nth-child(2)"
		);

		editOption.addEventListener("click", function () {
			let titleElement = newBlock.querySelector(".toggle-list-button");
			let titleText = titleElement.textContent;
			let inputField = document.createElement("input");
			inputField.type = "text";
			inputField.value = titleText.substring(2);
			inputField.className = "edit-title-input";
			inputField.addEventListener("blur", function () {
				let newText = inputField.value;
				titleElement.textContent = `${isOpened ? "V" : ">"} ${newText}`;
				inputField.remove();
			});
			titleElement.textContent = "";
			titleElement.appendChild(inputField);
			inputField.focus();

			contextMenu.remove();
		});

		deleteOption.addEventListener("click", function () {
			console.log("Delete option clicked");

			contextMenu.remove();
		});

		document.body.appendChild(contextMenu);

		document.addEventListener("click", function (e) {
			if (!contextMenu.contains(e.target)) {
				contextMenu.remove();
			}
		});
	});

	let listItem1 = createNewListItem();
	newBlock.appendChild(listItem1);

	return newBlock;
}

function createNewListItem() {
	let listItem = createNewDiv("toggle-list-item", "toggle-list-item hidden");
	let input = document.createElement("input");
	input.type = "text";
	input.placeholder = "Enter item text";
	input.className = "toggle-list-input";
	listItem.appendChild(input);
	return listItem;
}
