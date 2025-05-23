// Get DOM element references
const inputText = document.getElementById('inputText');
const outputText = document.getElementById('outputText');
const separateButton = document.getElementById('separateButton');
const removeDuplicatesButton = document.getElementById('removeDuplicatesButton');
const wordCount = document.getElementById('wordCount');

// Core logic for separating text
function processSeparation(text) {
    const trimmedText = text.trim();
    if (trimmedText === '') {
        return { processedText: '', count: 0 };
    }
    const words = trimmedText.split(/[\s\n]+/).filter(word => word !== '');
    return { processedText: words.join(', '), count: words.length };
}

// Core logic for removing duplicate words
function processRemoveDuplicates(text, isCommaSeparatedInput = false) {
    const trimmedText = text.trim();
    if (trimmedText === '') {
        return { processedText: '', count: 0 };
    }

    let words;
    if (isCommaSeparatedInput) {
        // Handles comma-separated text
        words = trimmedText.split(',').map(word => word.trim()).filter(word => word !== '');
    } else {
        // Handles space/newline separated text
        words = trimmedText.split(/[\s\n]+/).map(word => word.trim()).filter(word => word !== '');
    }

    const uniqueWords = [];
    const seenWords = new Set();

    for (const word of words) {
        if (!seenWords.has(word.toLowerCase())) { // Case-insensitive check for duplicates
            uniqueWords.push(word);
            seenWords.add(word.toLowerCase());
        }
    }
    return { processedText: uniqueWords.join(', '), count: uniqueWords.length };
}

// Function to separate text with commas (DOM interaction)
function separateText() {
    const result = processSeparation(inputText.value);
    outputText.value = result.processedText;
    wordCount.textContent = `Word count: ${result.count}`;
}

// Add event listener for separateButton
if (separateButton) {
    separateButton.addEventListener('click', separateText);
}

// Function to remove duplicate words (DOM interaction)
function removeDuplicates() {
    let sourceText = outputText.value.trim();
    let isCommaSeparated = true;

    if (sourceText === '') {
        sourceText = inputText.value.trim();
        isCommaSeparated = false; // Input from inputText is not assumed to be comma separated
    }
    
    // If both are empty, process inputText (which will result in empty)
    if (sourceText === '' && inputText.value.trim() === '') {
        sourceText = inputText.value.trim();
        isCommaSeparated = false;
    }


    const result = processRemoveDuplicates(sourceText, isCommaSeparated);
    outputText.value = result.processedText;
    wordCount.textContent = `Word count: ${result.count}`;
}

// Add event listener for removeDuplicatesButton
if (removeDuplicatesButton) {
    removeDuplicatesButton.addEventListener('click', removeDuplicates);
}

// Export functions for testing if running in Node.js environment (for QUnit CLI or similar)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { processSeparation, processRemoveDuplicates };
}
