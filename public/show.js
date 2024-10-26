const textareas = document.querySelectorAll('textarea');

if (textareas.length > 0) {
    // If there are <textarea> elements, set them to readonly
    textareas.forEach(textarea => {
        textarea.setAttribute('readonly', true);
    });
}