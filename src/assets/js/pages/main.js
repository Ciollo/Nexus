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
			// console.log(`Clicked on ${block.text}`);

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
			} else if (
				block.type === "unorderedList" ||
				block.type === "orderedList"
			) {
				newBlock = createListBlock(
					block.text,
					block.type === "unorderedList" ? "ul" : "ol"
				);
			} else {
				newBlock = document.createElement("div");
				newBlock.textContent = block.text;
			}

			newBlock.classList.add(block.type);
			newBlock.classList.add("block-class");
			newBlock.setAttribute("type", block.type); // Add the 'type' as an attribute to the new block
			// console.log(block.type);
			// console.log(newBlock);

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
			// Save the blocks after a new one is added
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

function saveBlocks() {
	let container = document.getElementById("container-user-content");
	let blocks = container.querySelectorAll(".block-class"); // replace '.block-class' with the actual class of your blocks

	// Initialize an empty array to hold the block objects
	let blockObjects = [];

	// Iterate over the blocks

	blocks.forEach((block) => {
		let blockType = block.getAttribute("type");
		let inputContent = "";

		if (blockType === "todo") {
			let inputField = block.querySelector("input[type='text']");
			inputContent = inputField ? inputField.value : "";
		} else if (blockType === "toggleList") {
			let button = block.querySelector("button.toggle-list-button");
			if (button) {
				inputContent = button.textContent.replace(/[>V]/g, "").trim();
			}
		}

		let blockObject = {
			type: blockType,
			text: inputContent,
		};

		// Add the block object to the array
		blockObjects.push(blockObject);
	});
	   let jsonString = JSON.stringify(blockObjects);
 fetch('../includes/saveBlock.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonString,
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });

    // Return the JSON string in case you want to use it elsewhere
	return jsonString;
}
var saveBlock = document.getElementById("save-blocks");

saveBlock.addEventListener("click", function () {
	saveBlocks();
});

let img = document.querySelector(".img-page");
let imagePanel = document.getElementById("image-panel");

img.addEventListener("contextmenu", function (event) {
	// Prevent the default context menu from showing
	event.preventDefault();

	// Open the image selection panel
	imagePanel.style.display = "block";
});

document.addEventListener("click", function (event) {
	// Check if the click was outside the image panel
	if (
		!imagePanel.contains(event.target) &&
		imagePanel.style.display === "block"
	) {
		// Close the panel
		closeImagePanel();
	}
});



function selectImage(imagePath) {
    // Update the source of the main image
    document.querySelector(".img-page").src = imagePath;
    // Close the panel
    closeImagePanel();

    // Create a JSON object with the src of the selected image
    let imageObject = {
        src: imagePath,
    };

    // Convert the image object into a JSON string
    let jsonString = JSON.stringify(imageObject);

    // Log the JSON string to the console
    console.log(jsonString);

    // Send a request to the server to update the profile picture
    fetch("../includes/updateProfilePicture.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: jsonString,
    })
    .then(response => response.text())
    .then(data => console.log(data))
    .catch((error) => {
        console.error('Error:', error);
    });

    console.log("Image selected: " + imagePath);
    // Return the JSON string in case you want to use it elsewhere
    return jsonString;
}

function closeImagePanel() {
	imagePanel.style.display = "none";
}

let images = document.querySelectorAll(".selected-image");

images.forEach(function (image) {
	image.addEventListener("click", function () {
		selectImage(this.src);
	});
});

// When the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get all images with the class 'selected-image'
    let images = document.querySelectorAll(".selected-image");

    // Add an event listener to each image
    images.forEach(function(image) {
        image.addEventListener("click", function() {
            // When an image is clicked, get its 'src' attribute
            let selectedSrc = this.getAttribute("src");

            // Get all other images with the class 'pageImg'
            let allImages = document.querySelectorAll(".pageImg");

            // Update the 'src' attribute of every other image
            allImages.forEach(function(img) {
                img.setAttribute("src", selectedSrc);
            });
        });
    });
});

// When the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    // Get the contenteditable div
    let titleDiv = document.querySelector(".main-page-title-text");

    // Get the navbar title div and the nav link title span
    let navbarTitleDiv = document.querySelector(".navbar-top-title-page");
    let navLinkTitleSpan = document.querySelector(".title-Page");

    // Add an event listener for the 'input' event
    titleDiv.addEventListener("input", function() {
        // When the content changes, create a JSON object with the new title
        let titleJson = JSON.stringify({ title: this.textContent });

        // Log the JSON string to the console
        console.log(titleJson);

        // Also update the content of the navbar title div and the nav link title span
        navbarTitleDiv.textContent = this.textContent;
        navLinkTitleSpan.textContent = this.textContent;

        // You can also use the JSON string elsewhere in your code
    });
});

var userContents = Array.from(document.querySelectorAll('.user-content'));

document.querySelector('.container-user-content').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); // Prevents the default action of the enter key
        var newDiv = document.createElement('div');
        newDiv.className = 'user-content';
		newDiv.className += ' block-class';
        newDiv.contentEditable = 'true';
		      newDiv.setAttribute('type', 'paragraph'); 
        document.querySelector('#container-user-content').appendChild(newDiv);
        userContents.push(newDiv);

        // Add focus event listener
        newDiv.addEventListener('focus', function() {
            if (this.innerText === this.dataset.text) {
                this.innerText = '';
            }
        });
    }
    else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault(); // Prevents the default action of the arrow keys
        var currentIndex = userContents.findIndex(div => div === document.activeElement);
        if (currentIndex !== -1) {
            var nextIndex = event.key === 'ArrowUp' ? currentIndex - 1 : currentIndex + 1;
            if (nextIndex >= 0 && nextIndex < userContents.length) {
                userContents[nextIndex].focus();
            }
        }
    }
});