function strikeThrough(ev) {
    var textElement = ev.target.parentNode.querySelector('.item-text');
    if (textElement.style.textDecoration === "line-through") {
        textElement.style.textDecoration = "none";
    } else {
        textElement.style.textDecoration = "line-through";
    }
}

function addItem() {
    var maxChars = 50;  // Define the maximum number of characters allowed

    // create variables for the list item, and get the inputted text
    var li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    var inputText = document.getElementById("task-input").value;

    // Check if the input text exceeds the maximum number of characters
    if (inputText.length > maxChars) {
        alert(`Please limit the text to ${maxChars} characters.`);
        return; 
    }

    // create a span element to hold the text
    var textSpan = document.createElement("span");
    textSpan.className = "item-text";
    textSpan.innerText = inputText;

    // delete button
    var deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm";
    deleteButton.innerText = "Delete";
    deleteButton.onclick = deleteItem;

    // add done button
    var doneButton = document.createElement("button");
    doneButton.className = "btn btn-primary btn-sm";
    doneButton.innerText = "Complete";
    doneButton.onclick = function(ev) {
        strikeThrough(ev);
    };

    // check if textbox has text
    if (inputText === '') {
        alert("Please put text in the input box");
    } else {
        // add item to list
        li.appendChild(doneButton);
        li.appendChild(textSpan);
        li.appendChild(deleteButton);
        document.getElementById("items-list").appendChild(li);
    }

    // Clear the input box after adding the item
    document.getElementById("task-input").value = '';
}

// delete button functionality
function deleteItem() {
    this.parentNode.remove();
}
