document.addEventListener('DOMContentLoaded', () => {
    const bannerTrack = document.querySelector('.banner-track');
    let currentIndex = 0;
    const totalSlides = document.querySelectorAll('.banner-slide').length;

    function updateSlidePosition() {
        bannerTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    setInterval(() => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateSlidePosition();
    }, 5000);
});
