document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".logo-track");
    const logos = [...track.children]; // 기존 로고 요소들 가져오기
  
    // ✅ 기존 로고 복제해서 추가 (더 자연스러운 무한 루프)
    logos.forEach((logo) => {
      const clone = logo.cloneNode(true);
      track.appendChild(clone);
    });
  });
  