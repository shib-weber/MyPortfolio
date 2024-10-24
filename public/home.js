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

        // Background and Text Color Picker functionality
        document.getElementById('bgColor1').addEventListener('input', function(event) {
            document.getElementById('draggable1').style.backgroundColor = event.target.value;
        });

        document.getElementById('textColor1').addEventListener('input', function(event) {
            document.getElementById('draggable1').style.color = event.target.value;
        });

        document.getElementById('bgColor2').addEventListener('input', function(event) {
            document.getElementById('draggable2').style.backgroundColor = event.target.value;
        });

        document.getElementById('textColor2').addEventListener('input', function(event) {
            document.getElementById('draggable2').style.color = event.target.value;
        });