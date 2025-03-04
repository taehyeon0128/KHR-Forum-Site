document.addEventListener('DOMContentLoaded', () => {
    const quickContent = document.querySelector('.quick-content .slider-track');
    const prevBtn = document.querySelector('.prev-quick');
    const nextBtn = document.querySelector('.next-quick');
    const slides = document.querySelectorAll('.quick-content .slide');

    let currentIndex = 0;
    const totalSlides = slides.length;

    function updateSlidePosition() {
        quickContent.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateSlidePosition();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlidePosition();
    });

    function resetAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateSlide(currentIndex);
        }, 8000);
    }
});
