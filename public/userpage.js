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
        const texta= document.createElement('textarea')
        const draggerDiv = document.createElement('div');
        const transparentBtn = document.createElement('button');
        const remove =document.createElement('div');
        const textC =document.createElement('div');
        draggableDiv.style.top = `${document.documentElement.scrollTop + 40}px`;

        // Setting class names and properties
        backColorInput.className = 'backcolor';
        textColorInput.className = 'textcolor';
        transparentBtn.className = 'transparent';
        remove.className='removebtn'
        textC.className='textC'
        texta.id='texta';
        draggerDiv.className = 'dragger';
        draggableDiv.className = 'draggable';
        texta.innerHTML = `Text ${textCount}`;
        textC.innerHTML='A'
        
        // Appending elements
        draggableDiv.appendChild(draggerDiv);
        draggableDiv.appendChild(transparentBtn);
        draggableDiv.appendChild(backColorInput);
        draggableDiv.appendChild(textColorInput);
        draggableDiv.appendChild(texta);
        draggableDiv.appendChild(remove);
        draggableDiv.appendChild(textC);
        editor.appendChild(draggableDiv);

        // Setting event listeners for color changes
        backColorInput.addEventListener('input', function(event) {
            draggableDiv.style.backgroundColor = event.target.value;
        });

        textColorInput.addEventListener('input', function(event) {
            texta.style.color = event.target.value;
        });

        // Setting transparent background on click
        transparentBtn.addEventListener('click', function() {
            draggableDiv.style.backgroundColor = 'transparent';
        });

        remove.addEventListener('click',()=>{
            editor.removeChild(draggableDiv);
        })
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
            console.log(document.body.innerHTML)
            /*let cssRules = '';

            for (const sheet of document.styleSheets) {
                try {
                    for (const rule of sheet.cssRules) {
                        cssRules += rule.cssText + '\n';
                    }
                } catch (error) {
                    console.warn('Could not access stylesheet:', sheet.href, error);
                }
            }
            
            console.log(cssRules);*/
        }
    }
});


document.getElementById('bgcolor').addEventListener('input', function(event) {
    editor.style.backgroundColor = event.target.value;
});
