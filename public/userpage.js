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
        texta.style.textAlign = 'left';
        textAlign.innerHTML = '→';

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
        applyEventListeners(draggableDiv, texta, backColorInput, textColorInput, transparentBtn, remove, textC, textD, textAlign);
        const tooltip = document.getElementById('tooltip');

        function showTooltip(event, message) {
            tooltip.innerText = message;
            tooltip.style.display = 'block';
            tooltip.style.left = `${event.pageX + 10}px`;
            tooltip.style.top = `${event.pageY + 10}px`;
        }
    
        function hideTooltip() {
            tooltip.style.display = 'none';
        }
        const colorInputs = [
            { element: backColorInput, message: 'Background Color' },
            { element: textColorInput, message: 'Text Color' },
            { element: transparentBtn, message: 'Makes Transparent' },
            { element: remove, message: 'Permanently Removes' },
            {element:textC , message:'Increase Font Size'},
            {element:textD , message:'Decrease Font Size'},
            {element:textAlign , message:'Aligns Text'},
        ];
    
        colorInputs.forEach(({ element, message }) => {
            element.addEventListener('mouseenter', (event) => showTooltip(event, message));
            element.addEventListener('mouseleave', hideTooltip);
        });
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
function applyEventListeners(draggableDiv, texta, backColorInput, textColorInput, transparentBtn, remove, textC, textD, textAlign) {
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
        tooltip.style.display = 'none';
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

    textAlign.addEventListener('click', () => {
        if (texta.style.textAlign === 'left') {
            texta.style.textAlign = 'center';
            textAlign.innerHTML = '→'; // Change symbol to indicate right alignment
        } else if (texta.style.textAlign === 'center') {
            texta.style.textAlign = 'right';
            textAlign.innerHTML = '←'; // Change symbol to indicate left alignment
        } else {
            texta.style.textAlign = 'left';
            textAlign.innerHTML = '→'; // Reset symbol to indicate center alignment
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
    const textAlign = draggableDiv.querySelector('.textAlign');

    applyDraggable(draggerDiv, draggableDiv);
    applyEventListeners(draggableDiv, texta, backColorInput, textColorInput, transparentBtn, remove, textC, textD, textAlign);
    const tooltip = document.getElementById('tooltip');

    function showTooltip(event, message) {
        tooltip.innerText = message;
        tooltip.style.display = 'block';
        tooltip.style.left = `${event.pageX + 10}px`;
        tooltip.style.top = `${event.pageY + 10}px`;
    }

    function hideTooltip() {
        tooltip.style.display = 'none';
    }
    const colorInputs = [
        { element: backColorInput, message: 'Background Color' },
        { element: textColorInput, message: 'Text Color' },
        { element: transparentBtn, message: 'Makes Transparent' },
        { element: remove, message: 'Permanently Removes' },
        {element:textC , message:'Increase Font Size'},
        {element:textD , message:'Decrease Font Size'},
        {element:textAlign , message:'Aligns Text'},
    ];

    colorInputs.forEach(({ element, message }) => {
        element.addEventListener('mouseenter', (event) => showTooltip(event, message));
        element.addEventListener('mouseleave', hideTooltip);
    });
});

document.getElementById('bgcolor').addEventListener('input', function(event) {
    editor.style.backgroundColor = event.target.value;
    cssRules = event.target.value;
});

// Handle image upload button click
const imageUpload = document.querySelector('#imageUpload');

// Trigger file selection on button click
document.querySelector('#addImage').addEventListener('click', (event) => {
    event.preventDefault();
    imageUpload.click();
});

// Handle file selection and add the image to the editor
imageUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();
        
        reader.onload = () => {
            // Create a container for the image
            const imgContainer = document.createElement('div');
            imgContainer.style.position = 'absolute';
            imgContainer.style.top = `${document.documentElement.scrollTop + 40}px`;

            const img = document.createElement('img');
            img.src = reader.result; // Set uploaded image as the source
            img.className = 'draggableresizable';
            img.style.width = '100px'; // Default size
            img.style.height = '100px';

            // Create the delete button
            const del = document.createElement('div');
            del.className = 'delImg';
            del.innerText = 'X'; // You can style this or use an icon
            del.style.cursor = 'pointer';
            del.style.position = 'absolute';
            del.style.top = '0'; // Position it relative to the image
            del.style.right = '0'; // Position it relative to the image

            // Add event listener to the delete button
            del.addEventListener('click', () => {
                editor.removeChild(imgContainer); // Remove the entire container
            });

            // Append the image to the container
            imgContainer.appendChild(img);
            // Append the delete button to the container
            imgContainer.appendChild(del);
            
            // Append the container to the editor
            editor.appendChild(imgContainer);
            
            // Apply draggable and resizable functionality
            setTimeout(() => applyDraggable2(imgContainer), 100); // Use imgContainer for dragging
            applyResizable(img); // Apply resizing directly to the image
        };
        
        reader.readAsDataURL(file); // Read file as a data URL
    }
});
function applyDraggable2(element) {
    if (!element) {
        console.error("Draggable element is not available.");
        return;
    }
    interact(element).draggable({
        listeners: {
            move(event) {
                const x = (parseFloat(element.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(element.getAttribute('data-y')) || 0) + event.dy;
                element.style.transform = `translate(${x}px, ${y}px)`;
                element.setAttribute('data-x', x);
                element.setAttribute('data-y', y);
            }
        }
    });
}

// Function to apply resizable behavior
function applyResizable(element) {
    interact(element).resizable({
        edges: { left: true, right: true, bottom: true, top: true }
    }).on('resizemove', (event) => {
        let { width, height } = event.rect;
        element.style.width = `${width}px`;
        element.style.height = `${height}px`;
    });
}

// Apply draggable and resizable to existing images (if any)
document.querySelectorAll('.draggableresizable').forEach(dragr => {
    applyDraggable2(dragr);
    applyResizable(dragr);
});

document.querySelector('#Savebtn').addEventListener('click', async (e) => {
    e.preventDefault();

    const Uhtml = editor.innerHTML;
    const images = Array.from(editor.querySelectorAll('img')).map(img => img.src);

    const response = await fetch(`/save`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html: Uhtml, css: cssRules, photo: images }),
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
const url=window.location.href
const id = url.substring(url.lastIndexOf('/') + 1);
document.querySelector('.copy-text').innerHTML=`https://myportfolio-98i0.onrender.com/Portfolio/${id}`

document.querySelector('.copy-button').addEventListener('click',()=>{
    copyText();
})
function copyText() {
    const textToCopy = document.getElementById("textToCopy").innerText;
    const copyButton = document.querySelector('.copy-button');

    navigator.clipboard.writeText(textToCopy).then(() => {
      // Change the button text to a tick mark
    copyButton.innerHTML = '✔️';
    
      // Revert back to "Copy" after 2 seconds
    setTimeout(() => {
        copyButton.innerHTML = 'Copy';
    }, 4000);
    }).catch((err) => {
    console.error("Could not copy text: ", err);
    });
}
