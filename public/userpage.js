let textCount = 0;
const editor = document.querySelector('#editor');
let cssRules;

document.querySelector('#addText').addEventListener('click', () => {
    textCount += 1;
    if (textCount <= 25) {
        // Creating elements
        const backColorInput = document.createElement('input');
        backColorInput.type = 'color';
        const textColorInput = document.createElement('input');
        textColorInput.type = 'color';

        const draggableDiv = document.createElement('div');
        const texta = document.createElement('textarea');
        const draggerDiv = document.createElement('div');
        const transparentBtn = document.createElement('button');
        const remove = document.createElement('div');
        const textC = document.createElement('div');
        const textD = document.createElement('div');
        const textAlign = document.createElement('div');
        draggableDiv.style.top = `${document.documentElement.scrollTop + 40}px`;

        // Setting class names and properties
        backColorInput.className = 'backcolor';
        textColorInput.className = 'textcolor';
        transparentBtn.className = 'transparent';
        remove.className = 'removebtn';
        textC.className = 'textC';
        textD.className = 'textD';
        textAlign.className = 'textAlign';
        texta.id = 'texta';
        draggerDiv.className = 'dragger';
        draggableDiv.className = 'draggable';
        texta.innerHTML = `Text Here`;
        textC.innerHTML = '+';
        textD.innerHTML = '-';

        // Appending elements
        draggableDiv.appendChild(draggerDiv);
        draggableDiv.appendChild(transparentBtn);
        draggableDiv.appendChild(backColorInput);
        draggableDiv.appendChild(textColorInput);
        draggableDiv.appendChild(texta);
        draggableDiv.appendChild(remove);
        draggableDiv.appendChild(textC);
        draggableDiv.appendChild(textD);
        draggableDiv.appendChild(textAlign);
        editor.appendChild(draggableDiv);

        // Apply draggable and event listeners to the new element
        applyDraggable(draggerDiv, draggableDiv);
        applyEventListeners(draggableDiv, texta, backColorInput, textColorInput, transparentBtn, remove, textC, textD);
    }
});

// Function to apply draggable behavior
function applyDraggable(dragger, draggableDiv) {
    interact(dragger).draggable({
        listeners: {
            move(event) {
                const x = (parseFloat(draggableDiv.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(draggableDiv.getAttribute('data-y')) || 0) + event.dy;
                draggableDiv.style.transform = `translate(${x}px, ${y}px)`;
                draggableDiv.setAttribute('data-x', x);
                draggableDiv.setAttribute('data-y', y);
            }
        }
    });
}

// Function to apply event listeners
function applyEventListeners(draggableDiv, texta, backColorInput, textColorInput, transparentBtn, remove, textC, textD) {
    texta.addEventListener('input', () => {
        texta.innerHTML = texta.value;
    });

    backColorInput.addEventListener('input', function(event) {
        draggableDiv.style.backgroundColor = event.target.value;
    });

    textColorInput.addEventListener('input', function(event) {
        texta.style.color = event.target.value;
    });

    transparentBtn.addEventListener('click', function() {
        draggableDiv.style.backgroundColor = 'transparent';
    });

    remove.addEventListener('click', () => {
        editor.removeChild(draggableDiv);
    });

    // Increase font size
    textC.addEventListener('click', () => {
        const currentSize = parseFloat(window.getComputedStyle(texta).fontSize);
        console.log('Current font size:', currentSize);
        
        if (!isNaN(currentSize)) {
            texta.style.fontSize = `${currentSize + 1}px`;
            console.log('New font size set:', texta.style.fontSize);
        } else {
            console.error('Failed to retrieve font size for texta');
        }
    });

    // Decrease font size
    textD.addEventListener('click', () => {
        const currentSize = parseFloat(window.getComputedStyle(texta).fontSize);
        console.log('Current font size:', currentSize);
        
        if (!isNaN(currentSize)) {
            texta.style.fontSize = `${currentSize - 1}px`;
            console.log('New font size set:', texta.style.fontSize);
        } else {
            console.error('Failed to retrieve font size for texta');
        }
    });
}

// Apply draggable and event listeners to existing draggable elements on page load
document.querySelectorAll('.draggable').forEach(draggableDiv => {
    const draggerDiv = draggableDiv.querySelector('.dragger');
    const texta = draggableDiv.querySelector('textarea');
    const backColorInput = draggableDiv.querySelector('.backcolor');
    const textColorInput = draggableDiv.querySelector('.textcolor');
    const transparentBtn = draggableDiv.querySelector('.transparent');
    const remove = draggableDiv.querySelector('.removebtn');
    const textC = draggableDiv.querySelector('.textC');
    const textD = draggableDiv.querySelector('.textD');

    applyDraggable(draggerDiv, draggableDiv);
    applyEventListeners(draggableDiv, texta, backColorInput, textColorInput, transparentBtn, remove, textC, textD);
});

document.getElementById('bgcolor').addEventListener('input', function(event) {
    editor.style.backgroundColor = event.target.value;
    cssRules = event.target.value;
});

document.querySelector('#Savebtn').addEventListener('click', async (e) => {
    e.preventDefault();

    const Uhtml = editor.innerHTML;
    const response = await fetch(`/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html: Uhtml, css: cssRules }),
    });

    const result = await response.json();
    if (result.success) {
        console.log('Saved successfully!');
    } else {
        console.error('Failed to save:', result.message);
    }
});

document.querySelector('#logoutbtn').addEventListener('click', async () => {
    const response = await fetch('/logout', {
        method: "POST",
        credentials: "include"
    });
    const result = await response.json();

    if (result === 'loggedOut') {
        window.location.href = '/';
    }
});
