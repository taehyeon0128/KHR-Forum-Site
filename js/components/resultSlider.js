export function initResultSlider() {
  const slides = document.querySelectorAll(".result-slide");
  const dots = document.querySelectorAll(".result-pagination .dot");
  let currentIndex = 0;
  let autoSlideInterval;
  let isCounted = false;

  function animateNumber(targetElement, start, end, duration) {
    let current = start;
    const increment = (end - start) / (duration / 16); // 16ms마다 업데이트
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            current = end; // 최종 숫자로 고정
            clearInterval(timer);
        }
        targetElement.innerText = Math.floor(current); // 반올림
    }, 16);
}

  function updateSlide(index) {
      slides.forEach((slide, i) => {
          slide.classList.toggle("active", i === index);
          dots[i].classList.toggle("active", i === index);
      });
      // ✅ 첫 번째 슬라이드에서만 카운트업 실행
      if (index === 0 && !isCounted) {
        const numberElement = slides[0].querySelector(".count-number");
        animateNumber(numberElement, 0, 10000, 2000); // 0부터 10,000까지 2초 동안 증가
        isCounted = true; // ✅ 한 번 실행 후 다시 실행되지 않도록 설정
    }
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
