
let textCount = 0;
let imageCount = 0;

$('#addText').on('click', () => {
    if (textCount < 5) {
        textCount++;
        const textField = `<div class="draggable text-field" contenteditable="true">Text ${textCount}
            <div class="drag"></div>
        </div>`;
        $('#editor').append(textField);
        makeInteractive('.draggable');
    }
});

$('#addImage').on('click', () => {
    if (imageCount < 5) {
        imageCount++;
        const imageField = `<div class="draggable image-field">
            <img src="https://via.placeholder.com/100" alt="Image ${imageCount}">
            <div class="drag"></div>
        </div>`;
        $('#editor').append(imageField);
        makeInteractive('.draggable');
    }
});

function makeInteractive(selector) {
    $(selector).draggable({
        //containment: '#editor',
        handle: '.drag' // Only drag with the circular handle
    }).resizable();
}