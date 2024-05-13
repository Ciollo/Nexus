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
		{ type: "unorderedList", text: "Unordered List" }, 
		{ type: "orderedList", text: "Ordered List" }, 
	];
	blocks.forEach((block) => {
		let blockElement = document.createElement("div");
		blockElement.textContent = block.text;
		blockElement.classList.add(block.type);
		blockElement.addEventListener("click", function () {

			let newBlock;

			if (block.type === "todo") {
				newBlock = createTodoBlock(block.text);
			} else if (block.type === "toggleList") {
				let toggleListName = window.prompt(
					"Enter the name for the toggle list:"
				);
				if (toggleListName) {

					newBlock = createToggleListBlock(toggleListName);
				} else {
					return; 
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
			newBlock.setAttribute("type", block.type); 

			targetDiv.textContent = targetDiv.textContent.replace(
				triggerCharacter,
				""
			);

			targetDiv.parentNode.insertBefore(newBlock, targetDiv.nextSibling);

			let newEditableDiv = document.createElement("div");
			newEditableDiv.contentEditable = "true";
			newEditableDiv.classList.add("user-content");
			addInputEventListener(newEditableDiv);

			newBlock.parentNode.insertBefore(newEditableDiv, newBlock.nextSibling);

			panel.remove();
			toggleOverlayVisibility();

		});
		panel.appendChild(blockElement);
	});
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

	checkbox.addEventListener("click", function () {
		if (checkbox.checked) {

			console.log("Checkbox is checked");
		} else {

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
	let isOpened = false; 

	let toggleButton = document.createElement("button");
	toggleButton.textContent = `> ${title}`; 
	toggleButton.className = "toggle-list-button";
	toggleButton.style.backgroundColor = "transparent"; 
	toggleButton.style.border = "none"; 
	toggleButton.style.cursor = "pointer"; 
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

function saveBlocks() {
	let container = document.getElementById("container-user-content");
	let blocks = container.querySelectorAll(".block-class"); 

	let blockObjects = [];

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

	return jsonString;
}
var saveBlock = document.getElementById("save-blocks");

saveBlock.addEventListener("click", function () {
	saveBlocks();
});

let img = document.querySelector(".img-page");
let imagePanel = document.getElementById("image-panel");

img.addEventListener("contextmenu", function (event) {

	event.preventDefault();

	imagePanel.style.display = "block";
});

document.addEventListener("click", function (event) {

	if (
		!imagePanel.contains(event.target) &&
		imagePanel.style.display === "block"
	) {

		closeImagePanel();
	}
});

function selectImage(imagePath) {

    document.querySelector(".img-page").src = imagePath;

    closeImagePanel();

    let imageObject = {
        src: imagePath,
    };

    let jsonString = JSON.stringify(imageObject);

    console.log(jsonString);

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

document.addEventListener("DOMContentLoaded", function() {

    let images = document.querySelectorAll(".selected-image");

    images.forEach(function(image) {
        image.addEventListener("click", function() {

            let selectedSrc = this.getAttribute("src");

            let allImages = document.querySelectorAll(".pageImg");

            allImages.forEach(function(img) {
                img.setAttribute("src", selectedSrc);
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function() {

    let titleDiv = document.querySelector(".main-page-title-text");

    let navbarTitleDiv = document.querySelector(".navbar-top-title-page");
    let navLinkTitleSpan = document.querySelector(".title-Page");

    titleDiv.addEventListener("input", function() {

        let titleJson = JSON.stringify({ title: this.textContent });

        console.log(titleJson);

        navbarTitleDiv.textContent = this.textContent;
        navLinkTitleSpan.textContent = this.textContent;

    });
});

var userContents = Array.from(document.querySelectorAll('.user-content'));

document.querySelector('.container-user-content').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault(); 
        var newDiv = document.createElement('div');
        newDiv.className = 'user-content';
		newDiv.className += ' block-class';
        newDiv.contentEditable = 'true';
		      newDiv.setAttribute('type', 'paragraph'); 
        document.querySelector('#container-user-content').appendChild(newDiv);
        userContents.push(newDiv);

        newDiv.addEventListener('focus', function() {
            if (this.innerText === this.dataset.text) {
                this.innerText = '';
            }
        });
    }
    else if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
        event.preventDefault(); 
        var currentIndex = userContents.findIndex(div => div === document.activeElement);
        if (currentIndex !== -1) {
            var nextIndex = event.key === 'ArrowUp' ? currentIndex - 1 : currentIndex + 1;
            if (nextIndex >= 0 && nextIndex < userContents.length) {
                userContents[nextIndex].focus();
            }
        }
    }
});