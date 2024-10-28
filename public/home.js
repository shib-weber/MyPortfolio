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

const start = document.querySelector('#startgbtn');
const label = document.querySelector('#startbtn');
const cat = document.getElementById("cat");
const obstacle = document.getElementById("obstacle");
let isJumping = false;
let initial = 0; // Score initialization
let speed = 2000; // Initial speed of the obstacle (in ms)

start.addEventListener('click', () => {
    startGame();
});

function startGame() {
    initial = 0;
    label.innerHTML = `Score: ${initial}`;
    start.style.display = 'none';
    obstacle.style.animationPlayState = 'running';
    obstacle.style.animationDuration = `${speed}ms`; // Set initial speed

    // Start listening for both touch and keyboard commands for jumping
    document.addEventListener('keydown', handleJump);
    document.addEventListener('touchstart', handleJump); // For mobile touch support
}

function handleJump(event) {
    // Check for space key or touch event
    if ((event.code === 'Space' || event.type === 'touchstart') && !isJumping) {
        jump();
    }
}

function jump() {
    isJumping = true;
    cat.style.transform = 'translateY(-90px)';
    obstacle.style.transform = `translateX(-100px)`;
    setTimeout(() => {
        cat.style.transform = 'translateY(0)';
        isJumping = false;
        initial += 1;
        label.innerHTML = `Score: ${initial}`;

        // Increase speed every 10 points
        if (initial % 10 === 0 && initial > 0) {
            speed *= 0.9; // Increase speed by reducing the duration
            obstacle.style.animationDuration = `${speed}ms`; // Update animation duration
        }
    }, 700);
}

function checkCollision() {
    const catRect = cat.getBoundingClientRect();
    const obstacleRect = obstacle.getBoundingClientRect();
    
    const rightTolerance = 20; // Allow cat to overlap a bit more on the right side
    if(!initial==0){
    // Detect overlap between cat and obstacle with adjusted right-side tolerance
    if (
        (catRect.right - rightTolerance) > obstacleRect.left &&  // Tolerance on right side of cat
        (catRect.left + rightTolerance) < (obstacleRect.right - 5) && // Adjusted right side of obstacle
        catRect.bottom > obstacleRect.top &&
        catRect.top < obstacleRect.bottom
    ) {
        label.innerHTML = `Game Over ! <br>Score : ${initial}`;
        resetGame();
    }
    }
}

function resetGame() {
    obstacle.style.animationPlayState = 'paused';
    cat.style.transform = 'translateY(0)';
    isJumping = false;
    document.removeEventListener('keydown', handleJump);
    document.removeEventListener('touchstart', handleJump); // Remove mobile touch listener as well
    start.style.display = 'block';
    start.style.outline=`none`
    start.innerHTML=`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="30"
    height="30"
    viewBox="0 0 40 40"
>
    <!-- Arrow -->
    <path
        d="M12 4V1l-4 4 4 4V6a6 6 0 1 1-6 6h2a4 4 0 1 0 4-4H12z"
        fill="#333"
    />
</svg>`
    obstacle.style.animationDuration = '2000ms'; // Reset speed back to initial speed
    speed = 2000; // Reset speed variable for next game
}

// Check for collisions every 50ms
setInterval(checkCollision, 50);

let index2=0
const error=document.querySelector('#error');
const message=`OOops! Not Supported For Your device Width`
function typeWriter2() {
    if (index2 < message.length) {
        error.innerHTML += message.charAt(index2);
        index2++;
        setTimeout(typeWriter2, 50); // Adjust speed by changing the delay (in milliseconds)
    }
}
typeWriter2();
error.innerHTML=''