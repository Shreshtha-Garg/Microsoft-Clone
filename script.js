document.addEventListener('DOMContentLoaded', function () {
    const slides = document.querySelectorAll('.slide');
    const slidesContainer = document.querySelector('.slides');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const firstDot = document.getElementById("first_dot");
    const secondDot = document.getElementById("second_dot");
    const autoplayButton = document.getElementById('autoplayButton');
    const autoplayButtonLabel = document.getElementById('autoplayButtonLabel');
    const iconPause = autoplayButton.querySelector('.icon-pause');
    const iconPlay = autoplayButton.querySelector('.icon-play');
    let currentIndex = 0;
    let intervalId;
    let isPlaying = true;
    const transitionDuration = 1000; // Transition duration in milliseconds
    let maxHeight = 0;

    // Calculate the maximum height among all slides
    slides.forEach(slide => {
        const slideHeight = slide.offsetHeight;
        if (slideHeight > maxHeight) {
            maxHeight = slideHeight;
        }
    });

    // Set the height of the slides container to the maximum height
    slidesContainer.style.height = `${maxHeight}px`;

    // Function to remove border from all buttons inside .btns
    function removeBorder() {
        const btns = document.querySelectorAll('.btns button');
        btns.forEach(button => {
            button.style.borderColor = 'transparent';
        });
    }

    // Function to add border to clicked button
    function addBorder(button) {
        button.style.border = '3px dotted black';
    }

    function showSlide(index) {
        slides.forEach((slide, i) => {
            const screenWidth = window.innerWidth;

            if (i === index) {
                firstDot.style.backgroundColor = i === 0 ? "black" : "white";
                secondDot.style.backgroundColor = i === 1 ? "black" : "white";
            }

            if (screenWidth >= 1024) {
                slide.style.display = i === index ? 'flex' : 'none';
            } else {
                slide.style.display = i === index ? 'block' : 'none';
            }
        });
    }

    async function animateSlideOut(slide, direction) {
        return new Promise(resolve => {
            slide.classList.remove('enterClockwise', 'enterAntiClockwise');
            slide.classList.add(direction === 'next' ? 'exitClockwise' : 'exitAntiClockwise');
            setTimeout(() => {
                slide.classList.remove('exitClockwise', 'exitAntiClockwise');
                slide.style.display = 'none';
                resolve();
            }, transitionDuration);
        });
    }

    async function animateSlideIn(slide, direction) {
        return new Promise(resolve => {
            const screenWidth = window.innerWidth;
    
            if (screenWidth < 1024) { // Below lg breakpoints
                slide.style.display = 'block';
            } else {
                slide.style.display = 'flex';
            }
    
            slide.classList.add(direction === 'next' ? 'enterClockwise' : 'enterAntiClockwise');
    
            setTimeout(() => {
                slide.classList.remove('enterClockwise', 'enterAntiClockwise');
                resolve();
            }, transitionDuration);
        });
    }    

    async function nextSlide() {
        const currentSlide = slides[currentIndex];
        currentIndex = (currentIndex + 1) % slides.length;
        const nextSlide = slides[currentIndex];

        await Promise.all([animateSlideOut(currentSlide, 'next'), animateSlideIn(nextSlide, 'next')]);

        showSlide(currentIndex);
    }

    async function prevSlide() {
        const currentSlide = slides[currentIndex];
        currentIndex = (currentIndex - 1 + slides.length) % slides.length;
        const prevSlide = slides[currentIndex];

        await Promise.all([animateSlideIn(prevSlide, 'prev'), animateSlideOut(currentSlide, 'prev')]);

        showSlide(currentIndex);
    }

    function startAutoSlide() {
        intervalId = setInterval(nextSlide, 5000);
    }

    function stopAutoSlide() {
        clearInterval(intervalId);
    }

    prevButton.addEventListener('click', () => {
        stopAutoSlide();
        if (isPlaying) {
            startAutoSlide();
        }
        removeBorder();
        addBorder(prevButton);
        prevSlide();
    });

    nextButton.addEventListener('click', () => {
        stopAutoSlide();
        if (isPlaying) {
            startAutoSlide();
        }
        removeBorder();
        addBorder(nextButton);
        nextSlide();
    });

    autoplayButton.addEventListener('click', () => {
        if (isPlaying) {
            autoplayButton.setAttribute('aria-pressed', 'true');
            autoplayButtonLabel.innerText = 'Play';
            iconPause.style.display = 'none';
            iconPlay.style.display = 'flex';
            stopAutoSlide();
        } else {
            autoplayButton.setAttribute('aria-pressed', 'false');
            autoplayButtonLabel.innerText = 'Pause';
            iconPause.style.display = 'flex';
            iconPlay.style.display = 'none';
            startAutoSlide();
        }
        isPlaying = !isPlaying; // Toggle the play state
        removeBorder(); // Remove border when autoplay button is clicked
        addBorder(autoplayButton); // Add border to the autoplay button when clicked
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.btns button')) {
            removeBorder(); // Remove border if any other part of the document is clicked
        }
    });

    showSlide(currentIndex);
    startAutoSlide();

    // Additional JavaScript for dropdown and hamburger menu
    const allMicrosoft = document.querySelector('.all-microsoft');
    const allMicrosoftDropdown = document.getElementById('allMicrosoftDropdown');
    const hamburgerContainer = document.querySelector('.hamburger-container');
    const hamburger = document.querySelector('.hamburger');
    const close = document.querySelector('.close');
    const hamburgerDropdown = document.getElementById('hamburgerDropdown');

    allMicrosoft.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click from propagating to the document listener
        allMicrosoftDropdown.classList.toggle('hidden');
    });

    hamburgerContainer.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevent the click from propagating to the document listener
        hamburgerDropdown.classList.toggle('hidden');
        hamburger.classList.toggle('hidden');
        close.classList.toggle('hidden');
    });

    document.addEventListener('click', (event) => {
        if (!event.target.closest('.all-microsoft') && !event.target.closest('#allMicrosoftDropdown')) {
            allMicrosoftDropdown.classList.add('hidden');
        }
        if (!event.target.closest('.hamburger-container') && !event.target.closest('#hamburgerDropdown')) {
            hamburgerDropdown.classList.add('hidden');
            hamburger.classList.remove('hidden');
            close.classList.add('hidden');
        }
    });
});
