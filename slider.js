// Select all slides and navigation dots
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

// Select the navigation buttons
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Select the slideshow control buttons
const playBtn = document.getElementById("playBtn");
const restartBtn = document.getElementById("restartBtn");

// Select the image counter
const counter = document.getElementById("counter");

// Store the index of the currently displayed image
let currentIndex = 0;

// Store the automatic slideshow timer
let slideTimer = null;

// Set the automatic slide interval to three seconds
const slideInterval = 3000;

// Function to display a selected slide
function showSlide(index) {

    // Move to the last slide if the index is below zero
    if (index < 0) {
        index = slides.length - 1;
    }

    // Return to the first slide after the last slide
    if (index >= slides.length) {
        index = 0;
    }

    // Save the current slide index
    currentIndex = index;

    // Remove the active class from all slides
    slides.forEach(function(slide) {
        slide.classList.remove("active");
    });

    // Remove the active class from all dots
    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });

    // Display the selected slide
    slides[currentIndex].classList.add("active");

    // Highlight the dot for the selected slide
    dots[currentIndex].classList.add("active");

    // Update the image counter
    counter.textContent =
        "Image " + (currentIndex + 1) +
        " of " + slides.length;
}

// Function to display the next slide
function nextSlide() {
    showSlide(currentIndex + 1);
}

// Function to display the previous slide
function previousSlide() {
    showSlide(currentIndex - 1);
}

// Function to start automatic sliding
function startSlideshow() {

    // Stop any existing timer first
    stopSlideshow();

    // Change the image every three seconds
    slideTimer = setInterval(function() {
        nextSlide();
    }, slideInterval);

    // Update the button text
    playBtn.textContent = "Pause Slideshow";
}

// Function to stop automatic sliding
function stopSlideshow() {

    // Check whether the slideshow timer exists
    if (slideTimer !== null) {

        // Stop the automatic timer
        clearInterval(slideTimer);

        // Mark the timer as stopped
        slideTimer = null;
    }

    // Update the button text
    playBtn.textContent = "Start Slideshow";
}

// Move to the previous slide when clicked
prevBtn.addEventListener("click", function() {
    previousSlide();
});

// Move to the next slide when clicked
nextBtn.addEventListener("click", function() {
    nextSlide();
});

// Allow users to select a slide using navigation dots
dots.forEach(function(dot) {

    dot.addEventListener("click", function() {

        // Read the selected slide index from the dot
        const index = Number(dot.dataset.index);

        // Display the selected slide
        showSlide(index);
    });

});

// Pause or resume the automatic slideshow
playBtn.addEventListener("click", function() {

    // Start the slideshow if it is currently stopped
    if (slideTimer === null) {
        startSlideshow();
    } else {

        // Stop the slideshow if it is running
        stopSlideshow();
    }

});

// Return to the first slide and restart the slideshow
restartBtn.addEventListener("click", function() {

    // Display the first image
    showSlide(0);

    // Start automatic sliding again
    startSlideshow();
});

// Support left and right keyboard arrow keys
document.addEventListener("keydown", function(event) {

    // Right arrow displays the next image
    if (event.key === "ArrowRight") {
        nextSlide();
    }

    // Left arrow displays the previous image
    if (event.key === "ArrowLeft") {
        previousSlide();
    }

});

// Display the first image when the page loads
showSlide(0);

// Start the automatic slideshow
startSlideshow();