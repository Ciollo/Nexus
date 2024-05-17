// Import
import { addSettingPanel } from "../components/addSettingPanel.js";
import {
	openComponentPanel,
	closeComponentPanel,
	isAddComponentTriggered,
} from "../utils/addComponent.js";

import { openSelectionBlockPanel } from "../components/addUserContent.js";
import { TRIGGER_CHARACTER } from "../utils/constants.js";

// Const & Variables
let btnSettings = document.getElementById("btn-page-settings");
let mainOverlay = document.getElementById("main-overlay");
let userContent = document.getElementById("user-content");
var saveBlock = document.getElementById("save-blocks");
var userContents = Array.from(document.querySelectorAll(".user-content"));
let img = document.querySelector(".img-page");
let imagePanel = document.getElementById("image-panel");
let images = document.querySelectorAll(".selected-image");
let pageTitle = document.getElementById("page-title");

// Functions
export function toggleOverlayVisibility() {
	mainOverlay.classList.toggle("display-none");
	mainOverlay.classList.toggle("display-block");
}

function openSettingsPanel() {
	toggleOverlayVisibility();
	addSettingPanel(mainOverlay);
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
	fetch("../includes/saveBlock.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: jsonString,
	})
		.then((response) => response.text())
		.then((data) => console.log(data))
		.catch((error) => {
			console.error("Error:", error);
		});

	return jsonString;
}

function selectImage(imagePath) {
	document.querySelector(".img-page").src = imagePath;

	closeImagePanel();

	let imageObject = {
		src: imagePath,
	};

	let jsonString = JSON.stringify(imageObject);

	console.log(jsonString);

	fetch("../includes/updateProfilePicture.php", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: jsonString,
	})
		.then((response) => response.text())
		.then((data) => console.log(data))
		.catch((error) => {
			console.error("Error:", error);
		});

	console.log("Image selected: " + imagePath);

	return jsonString;
}

function closeImagePanel() {
	imagePanel.style.display = "none";
}

// Event Listeners
images.forEach(function (image) {
	image.addEventListener("click", function () {
		selectImage(this.src);
	});
});

document.addEventListener("DOMContentLoaded", function () {
	let images = document.querySelectorAll(".selected-image");

	images.forEach(function (image) {
		image.addEventListener("click", function () {
			let selectedSrc = this.getAttribute("src");

			let allImages = document.querySelectorAll(".pageImg");

			allImages.forEach(function (img) {
				img.setAttribute("src", selectedSrc);
			});
		});
	});
});

document.addEventListener("DOMContentLoaded", function () {
	let titleDiv = document.querySelector(".main-page-title-text");

	let navbarTitleDiv = document.querySelector(".navbar-top-title-page");
	let navLinkTitleSpan = document.querySelector(".title-Page");

	titleDiv.addEventListener("input", function () {
		let titleJson = JSON.stringify({ title: this.textContent });

		console.log(titleJson);

		navbarTitleDiv.textContent = this.textContent;
		navLinkTitleSpan.textContent = this.textContent;
	});
});

document
	.querySelector(".container-user-content")
	.addEventListener("keydown", function (event) {
		if (event.key === "Enter") {
			event.preventDefault();
			var newDiv = document.createElement("div");
			newDiv.className = "user-content";
			newDiv.className += " block-class";
			newDiv.contentEditable = "true";
			newDiv.setAttribute("type", "paragraph");
			document.querySelector("#container-user-content").appendChild(newDiv);
			userContents.push(newDiv);

			newDiv.addEventListener("focus", function () {
				if (this.innerText === this.dataset.text) {
					this.innerText = "";
				}
			});
			newDiv.focus();
		} else if (event.key === "ArrowUp" || event.key === "ArrowDown") {
			event.preventDefault();
			var currentIndex = userContents.findIndex(
				(div) => div === document.activeElement
			);
			if (currentIndex !== -1) {
				var nextIndex =
					event.key === "ArrowUp" ? currentIndex - 1 : currentIndex + 1;
				if (nextIndex >= 0 && nextIndex < userContents.length) {
					userContents[nextIndex].focus();
				}
			}
		}
	});

saveBlock.addEventListener("click", function () {
	saveBlocks();
});

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

btnSettings.addEventListener("click", openSettingsPanel);

mainOverlay.addEventListener("click", function (event) {
	let settingsPanel = document.getElementById("container-user-settings-panel");
	if (settingsPanel && !settingsPanel.contains(event.target)) {
		mainOverlay.innerHTML = "";
		toggleOverlayVisibility();
	}
});

mainOverlay.addEventListener("click", function (event) {
	let notionPanel = document.getElementById("notion-like-panel");
	if (notionPanel && !notionPanel.contains(event.target)) {
		notionPanel.remove();
		toggleOverlayVisibility();
	}
});

function addInputEventListener(element) {
	element.addEventListener("input", function (event) {
		let newTextContent = event.target.textContent;

		if (isAddComponentTriggered(newTextContent, TRIGGER_CHARACTER)) {
			toggleOverlayVisibility();
			openSelectionBlockPanel(document.activeElement);
		} else {
			closeComponentPanel();
		}
	});
}
addInputEventListener(userContent);

pageTitle.addEventListener("blur", function () {
	if (pageTitle.textContent === "") {
		pageTitle.textContent = pageTitle.getAttribute("data-placeholder");
		pageTitle.classList.add("placeholder");
	}
});

userContent.addEventListener("blur", function () {
	if (userContent.textContent === "") {
		userContent.textContent = userContent.getAttribute("data-text");
		userContent.classList.add("placeholder");
	}
});

userContent.addEventListener("focus", function () {
	if (userContent.textContent === userContent.getAttribute("data-text")) {
		userContent.textContent = "";
	}
});

userContent.addEventListener("blur", function () {
	if (userContent.textContent === "") {
		userContent.textContent = userContent.getAttribute("data-text");
	}
});

pageTitle.addEventListener("keydown", function () {
    if (pageTitle.classList.contains("placeholder")) {
        pageTitle.textContent = "";
        pageTitle.classList.remove("placeholder");
    }
});

userContent.addEventListener("keydown", function () {
    if (userContent.classList.contains("placeholder")) {
        userContent.textContent = "";
        userContent.classList.remove("placeholder");
    }
});