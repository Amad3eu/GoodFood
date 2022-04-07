// Function for scrolling header

function scrollHeader() {
    var header = document.getElementById('header'),
        headerHeight = header.offsetHeight, // Header height
        content = document.getElementById('content'),
        previousScroll = content.scrollTop; // Get onload Scrolling

    content.onscroll = function() {
        currentScroll = content.scrollTop; // Get the current scrolling position

        // Hide the header only if the header height is scroll
        if (currentScroll > headerHeight) {
            if (currentScroll > previousScroll) {
                header.style.transform = 'translateY(-' + headerHeight + 'px)'; // Hide header
            } else {
                header.style.transform = 'translateY(0)'; // Show header
            }
        }
        previousScroll = currentScroll;
    };
}
scrollHeader(); 



function toggleMenu() {
    var navToggle = document.getElementById('nav-toggle');

    navToggle.onclick = function() {
        document.body.classList.toggle("open");
    };
}
toggleMenu(); 

// Function for real clock

function updateClock() {
    var now = new Date(), // current date
        time = now.getHours() + ':' + now.getMinutes(),
        target = document.getElementById('time');

    // set the content of the element with the ID time to the formatted string
    target.innerHTML = [time];

    // call this function again in 3000ms
    setTimeout(updateClock, 3000);
}
updateClock(); // init function
