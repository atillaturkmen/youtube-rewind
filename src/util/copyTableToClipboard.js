export function copyTableToClipboard(elementId) {
    // Get the table element
    let table = document.getElementById(elementId);

    // Create a range object
    let range = document.createRange();

    // Select the contents of the table
    range.selectNode(table);

    // Create a new selection object
    let selection = window.getSelection();

    // Remove any existing selections
    selection.removeAllRanges();

    // Add the range to the selection
    selection.addRange(range);

    // Copy the selection to the clipboard
    document.execCommand('copy');

    // Clear the selection
    selection.removeAllRanges();

    // Alert the user
    alert('Table copied to clipboard!');
}
