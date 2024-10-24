document.addEventListener("DOMContentLoaded", () => {
    const textArea = document.getElementById("textinfo");
    const text = `Welcome to MyPortfolio!
Create your customized portfolio site in seconds by simply dragging elements, changing colors, and much more.
Unlock features by creating an account or logging in today!`;

    let index = 0;

    function typeWriter() {
        if (index < text.length) {
            textArea.value += text.charAt(index);
            index++;
            setTimeout(typeWriter, 50); // Adjust speed by changing the delay (in milliseconds)
        }
    }

    // Clear initial value in text area and start typing effect
    textArea.value = "";
    typeWriter();

    // Initialize draggable functionality
    interact('.draggable-div').draggable({
        listeners: {
            move(event) {
                const target = event.target;
                // Keep track of the drag position
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                // Update the element's style and store the position
                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            }
        }
    });

    // Tooltip functionality
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

    // Add event listeners for the color input fields
    const colorInputs = [
        { id: 'bgColor0', message: 'Background Color' },
        { id: 'textColor0', message: 'Text Color' },
        { id: 'bgColor1', message: 'Background Color' },
        { id: 'textColor1', message: 'Text Color' },
        { id: 'bgColor2', message: 'Background Color' },
        { id: 'textColor2', message: 'Text Color' },
        { id: 'bgColor3', message: 'Background Color' },
        { id: 'textColor3', message: 'Text Color' },
        { id: 'bgColor4', message: 'Background Color' },
        { id: 'textColor4', message: 'Text Color' }
    ];

    colorInputs.forEach(input => {
        const element = document.getElementById(input.id);
        element.addEventListener('mouseenter', (event) => showTooltip(event, input.message));
        element.addEventListener('mouseleave', hideTooltip);
    });

    // Background and Text Color Picker functionality
    document.getElementById('bgColor0').addEventListener('input', function(event) {
        document.getElementById('info').style.backgroundColor = event.target.value;
    });

    document.getElementById('textColor0').addEventListener('input', function(event) {
        document.getElementById('textinfo').style.color = event.target.value;
    });

    document.getElementById('bgColor1').addEventListener('input', function(event) {
        document.getElementById('draggable1').style.backgroundColor = event.target.value;
    });

    document.getElementById('textColor1').addEventListener('input', function(event) {
        document.getElementById('textinfo1').style.color = event.target.value;
    });

    document.getElementById('bgColor2').addEventListener('input', function(event) {
        document.getElementById('draggable2').style.backgroundColor = event.target.value;
    });

    document.getElementById('textColor2').addEventListener('input', function(event) {
        document.getElementById('textinfo2').style.color = event.target.value;
    });

    document.getElementById('bgColor3').addEventListener('input', function(event) {
        document.getElementById('draggable3').style.backgroundColor = event.target.value;
    });

    document.getElementById('textColor3').addEventListener('input', function(event) {
        document.getElementById('textinfo3').style.color = event.target.value;
    });

    document.getElementById('bgColor4').addEventListener('input', function(event) {
        document.getElementById('draggable4').style.backgroundColor = event.target.value;
    });

    document.getElementById('textColor4').addEventListener('input', function(event) {
        document.getElementById('textinfo4').style.color = event.target.value;
    });
});

window.history.pushState(null, '', window.location.href);
window.onpopstate = function () {
    window.history.pushState(null, '', window.location.href);
};
