import { addSettingPanel } from "../components/addSettingPanel.js";
import {
	openComponentPanel,
	closeComponentPanel,
	isAddComponentTriggered,
} from "../utils/addComponent.js";

const triggerCharacter = "/+";
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

function addInputEventListener(element) {
	element.addEventListener("input", function (event) {
		let newTextContent = event.target.textContent;

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
        { type: "unorderedList", text: "Unordered List" }, // Added option for unordered list
        { type: "orderedList", text: "Ordered List" }, // Added option for ordered list
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
            } else if (block.type === "toggleList") {
                let toggleListName = window.prompt(
                    "Enter the name for the toggle list:"
                );
                if (toggleListName) {
                    // Check if user entered a name
                    newBlock = createToggleListBlock(toggleListName);
                } else {
                    return; // Exit function if user cancels
                }
            } else if (block.type === "unorderedList" || block.type === "orderedList") {
                newBlock = createListBlock(block.text, block.type === "unorderedList" ? "ul" : "ol");
            } else {
                newBlock = document.createElement("div");
                newBlock.textContent = block.text;
            }
            newBlock.classList.add(block.type);

            // Replace the trigger character in the target div's text content
            targetDiv.textContent = targetDiv.textContent.replace(
                triggerCharacter,
                ""
            );

            // Insert the new block as a sibling to the target div
            targetDiv.parentNode.insertBefore(newBlock, targetDiv.nextSibling);

            let newEditableDiv = document.createElement("div");
            newEditableDiv.contentEditable = "true";
            newEditableDiv.classList.add("user-content");
            addInputEventListener(newEditableDiv);

            // Insert the new editable div as a sibling to the new block
            newBlock.parentNode.insertBefore(newEditableDiv, newBlock.nextSibling);

            panel.remove();
            toggleOverlayVisibility();
        });
        panel.appendChild(blockElement);
    });
}


// Function to create a list block
function createListBlock(title, listType) {
    let newBlock = createNewDiv("list-block", "list-block");
    let list = document.createElement(listType);
    let numItems = parseInt(prompt("Enter the number of items for the list:"));
    if (isNaN(numItems) || numItems <= 0) {
        return null; // Exit function if the user enters an invalid number
    }
    for (let i = 0; i < numItems; i++) {
        let itemText = prompt(`Enter text for item ${i + 1}:`);
        if (itemText.trim() === "") {
            continue; // Skip empty items
        }
        list.appendChild(createListItem(itemText));
    }
    newBlock.appendChild(list);
    return newBlock;
}


// Function to create a list item
function createListItem(text) {
	let listItem = document.createElement("li");
	listItem.textContent = text;
	return listItem;
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

	// Add event listener to toggle checkbox state
	checkbox.addEventListener("click", function () {
		if (checkbox.checked) {
			// Checkbox is checked
			console.log("Checkbox is checked");
		} else {
			// Checkbox is unchecked
			console.log("Checkbox is unchecked");
		}
	});

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

function createToggleListBlock(title) {
	let newBlock = createNewDiv("toggle-list", "toggle-list");
	let isOpened = false; // Variable to track if the toggle list is opened or closed

	// Create the button to toggle visibility
	let toggleButton = document.createElement("button");
	toggleButton.textContent = `> ${title}`; // Add ">" symbol before the title
	toggleButton.className = "toggle-list-button";
	toggleButton.style.backgroundColor = "transparent"; // Set button background color to transparent
	toggleButton.style.border = "none"; // Remove button border
	toggleButton.style.cursor = "pointer"; // Change cursor to pointer on hover
	toggleButton.addEventListener("click", function () {
		let listItems = newBlock.querySelectorAll(".toggle-list-item");
		listItems.forEach((item) => {
			item.classList.toggle("hidden");
		});

		// Toggle between ">" and "V" symbols
		isOpened = !isOpened;
		toggleButton.textContent = `${isOpened ? "V" : ">"} ${title}`;
	});
	newBlock.appendChild(toggleButton);

	newBlock.addEventListener("contextmenu", function (event) {
		event.preventDefault(); // Prevent the default context menu from appearing

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
			// Implement edit action here
			let titleElement = newBlock.querySelector(".toggle-list-button");
			let titleText = titleElement.textContent;
			let inputField = document.createElement("input");
			inputField.type = "text";
			inputField.value = titleText.substring(2); // Exclude the ">" symbol
			inputField.className = "edit-title-input";
			inputField.addEventListener("blur", function () {
				// When the input field loses focus, update the title text
				let newText = inputField.value;
				titleElement.textContent = `${isOpened ? "V" : ">"} ${newText}`; // Add ">" or "V" symbol before the new text
				inputField.remove();
			});
			titleElement.textContent = "";
			titleElement.appendChild(inputField);
			inputField.focus(); // Automatically focus on the input field
			// Hide the context menu after clicking "Edit"
			contextMenu.remove();
		});

		deleteOption.addEventListener("click", function () {
			// Implement delete action here
			console.log("Delete option clicked");
			// Hide the context menu after clicking "Delete"
			contextMenu.remove();
		});

		// Append the context menu to the body
		document.body.appendChild(contextMenu);

		// Close the context menu when clicking outside of it
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