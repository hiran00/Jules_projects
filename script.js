document.addEventListener('DOMContentLoaded', () => {
    const inputText = document.getElementById('inputText');
    const separateButton = document.getElementById('separateButton');
    const outputText = document.getElementById('outputText');

    if (separateButton) {
        separateButton.addEventListener('click', () => {
            const rawText = inputText.value;
            const trimmedText = rawText.trim();

            if (trimmedText === "") {
                outputText.value = "";
                return;
            }

            const wordsArray = trimmedText.split(/\s+/);
            const filteredWordsArray = wordsArray.filter(word => word !== "");
            const resultString = filteredWordsArray.join(', ');

            outputText.value = resultString;
        });
    } else {
        console.error("Button with ID 'separateButton' not found.");
    }

    // Ensure outputText is not directly editable (already set in HTML, but good for JS to be aware)
    if (outputText) {
        outputText.readOnly = true;
    } else {
        console.error("Textarea with ID 'outputText' not found.");
    }

    if (!inputText) {
        console.error("Textarea with ID 'inputText' not found.");
    }
});
