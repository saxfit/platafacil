document.addEventListener("DOMContentLoaded", function() {
    const slider = document.querySelector('.slider');
    const slides = slider.querySelectorAll('li');
    const slideWidth = slides[0].clientWidth;
    let currentIndex = 0;
    const slideCount = slides.length;
    const slideInterval = 3000; // Interval between slides in milliseconds

    // Set initial position of the slider
    slider.querySelector('ul').style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // Function to move to the next slide
    function moveToNextSlide() {
        if (currentIndex < slideCount - 1) {
            currentIndex++;
        } else {
            currentIndex = 0;
        }
        slider.querySelector('ul').style.transform = `translateX(-${currentIndex * slideWidth}px)`;
    }

    // Function to start automatic sliding
    function startSlider() {
        setInterval(moveToNextSlide, slideInterval);
    }

    // Start the slider
    startSlider();
});
