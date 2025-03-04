export function initResultSlider() {
  const slides = document.querySelectorAll(".result-slide");
  const dots = document.querySelectorAll(".result-pagination .dot");
  let currentIndex = 0;
  let autoSlideInterval;

  function updateSlide(index) {
      slides.forEach((slide, i) => {
          slide.classList.toggle("active", i === index);
          dots[i].classList.toggle("active", i === index);
      });
  }

  function resetAutoSlide() {
      clearInterval(autoSlideInterval);
      autoSlideInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % slides.length;
          updateSlide(currentIndex);
      }, 8000);
  }

  dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
          currentIndex = index;
          updateSlide(currentIndex);
          resetAutoSlide();
      });
  });

  // ✅ 처음 실행 시 자동 슬라이드 시작
  resetAutoSlide();
  updateSlide(0); // 초기 배경 적용
}
