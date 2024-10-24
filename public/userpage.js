let textCount = 0;
const editor = document.querySelector('#editor');

document.querySelector('#addText').addEventListener('click', () => {
    textCount += 1;
    if (textCount <= 5) {
        // Creating elements
        const backColorInput = document.createElement('input');
        backColorInput.type = 'color';
        const textColorInput = document.createElement('input');
        textColorInput.type = 'color';

        
        const draggableDiv = document.createElement('div');
        const draggerDiv = document.createElement('div');
        const transparentBtn = document.createElement('button');
        
        // Setting class names and properties
        backColorInput.className = 'backcolor';
        textColorInput.className = 'textcolor';
        transparentBtn.className = 'transparent';
        draggerDiv.className = 'dragger';
        draggableDiv.className = 'draggable';
        draggableDiv.innerHTML = `text ${textCount}`;
        
        // Appending elements
        draggableDiv.appendChild(draggerDiv);
        draggableDiv.appendChild(transparentBtn);
        draggableDiv.appendChild(backColorInput);
        draggableDiv.appendChild(textColorInput);
        editor.appendChild(draggableDiv);

        // Setting event listeners for color changes
        backColorInput.addEventListener('input', function(event) {
            draggableDiv.style.backgroundColor = event.target.value;
        });

        textColorInput.addEventListener('input', function(event) {
            draggableDiv.style.color = event.target.value;
        });

        // Setting transparent background on click
        transparentBtn.addEventListener('click', function() {
            draggableDiv.style.backgroundColor = 'transparent';
        });
    }
});

// Draggable functionality
interact('.dragger').draggable({
    listeners: {
        move(event) {
            const target = event.target.closest('.draggable');
            const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute('data-x', x);
            target.setAttribute('data-y', y);
        }
    }
});


document.getElementById('bgcolor').addEventListener('input', function(event) {
    editor.style.backgroundColor = event.target.value;
});
