var itemToDelete = null;

function strikeThrough(ev) {
    var textElement = ev.target.closest('li').querySelector('.item-text');
    if (textElement.style.textDecoration === "line-through") {
        textElement.style.textDecoration = "none";
    } else {
        textElement.style.textDecoration = "line-through";
    }
}

function addItem() {
    var maxChars = 50;

    // Create variables for the list item, and get the inputted text
    var li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center";
    var inputText = document.getElementById("task-input").value;

    // Check if the input text exceeds the maximum number of characters
    if (inputText.length > maxChars) {
        alert(`Please limit the text to ${maxChars} characters.`);
        return;
    }

    // Create a span element to hold the text
    var textSpan = document.createElement("span");
    textSpan.className = "form-control"; 
    textSpan.innerText = inputText;

    var buttonContainer = document.createElement("div");
    buttonContainer.className = "d-flex ms-auto";

    // Delete button
    var deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-danger btn-sm ms-2";
    deleteButton.innerText = "Delete";
    deleteButton.onclick = function(ev) {
        displayModal(ev);
    };

    // Add done button
    var doneButton = document.createElement("button");
    doneButton.className = "btn btn-primary btn-sm ms-2";
    doneButton.innerText = "Complete";
    doneButton.onclick = function(ev) {
        strikeThrough(ev);
    };

    // Check if textbox has text
    if (inputText === '') {
        alert("Please put text in the input box");
    } else {
        // Add item to list
        li.appendChild(textSpan);
        buttonContainer.appendChild(deleteButton);
        buttonContainer.appendChild(doneButton);
        li.appendChild(buttonContainer);
        document.getElementById("items-list").appendChild(li);
    }

    // Clear the input box after adding the item
    document.getElementById("task-input").value = '';
}

function displayModal(ev) {
    itemToDelete = ev.target.closest('li');
    document.getElementById('id01').style.display = 'block';
}

function closeModal() {
    document.getElementById('id01').style.display = 'none';
}

function deleteItem() {
    if (itemToDelete) {
        itemToDelete.remove();
        itemToDelete = null;
    }
    closeModal();
}
