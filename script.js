const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");
const colorCount = 5;
const copyFeedbackDuration = 1200;

generateBtn.addEventListener("click", generatePalette);
paletteContainer.addEventListener("click", handlePaletteClick);

document.addEventListener("DOMContentLoaded", generatePalette);

function handlePaletteClick(event) {
    const copyIcon = event.target.closest(".copy-btn");
    const colorBox = event.target.closest(".color-box");

    if (copyIcon) {
        const hexValue = copyIcon.closest(".color-info").querySelector(".hex-value").textContent;
        copyToClipboard(hexValue, copyIcon);
        return;
    }

    if (colorBox && (event.target.classList.contains("color") || event.target.classList.contains("hex-value"))) {
        const hexValue = colorBox.querySelector(".hex-value").textContent;
        copyToClipboard(hexValue, colorBox);
    }
}

async function copyToClipboard(value, element) {
    try {
        await navigator.clipboard.writeText(value);
        showCopyFeedback(element);
    } catch (error) {
        console.error("Failed to copy color:", error);
    }
}

function showCopyFeedback(triggerElement) {
    const box = triggerElement.closest(".color-box");
    const copyIcon = box.querySelector(".copy-btn");

    if (!copyIcon) {
        return;
    }

    const originalClass = copyIcon.className;
    const originalTitle = copyIcon.title;
    const originalText = copyIcon.textContent;

    copyIcon.className = "fas fa-check copy-btn";
    copyIcon.title = "Copied!";
    copyIcon.textContent = "";

    setTimeout(() => {
        copyIcon.className = originalClass;
        copyIcon.title = originalTitle;
        copyIcon.textContent = originalText;
    }, copyFeedbackDuration);
}

function generatePalette() {
    const colors = Array.from({ length: colorCount }, generateRandomColor);
    updatePaletteDisplay(colors);
}

function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    for (let i = 0; i < 6; i += 1) {
        color += letters[Math.floor(Math.random() * letters.length)];
    }

    return color;
}

function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    colorBoxes.forEach((box, index) => {
        const color = colors[index] || generateRandomColor();
        const colorDiv = box.querySelector(".color");
        const hexValue = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color;
        hexValue.textContent = color;
    });
}
