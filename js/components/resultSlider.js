import { CustomSlider } from "../modules/slider.js";

export function initResultSlider() {
  const resultSlider = new CustomSlider(".result-content", {
    loop: true,
    pagination: true,
    draggable: true,
    autoSlide: true,
    interval: 8000,
    renderSlide: (data) => {
      const slide = document.createElement("div");
      slide.classList.add("result-slide");
      slide.style.background = data.background;
      slide.innerHTML = `
                <span>${data.title}</span>
                <h1>${data.description}</h1>
                <p>${data.quick}</p>
            `;
      if (data.link) {
        slide.addEventListener("click", () => {
          window.open(data.link, "_blank");
        });
      }
      return slide;
    },
    data: [
      {
        title: "KHR 포럼의 누적 고객 수",
        description: "10,000명 달성!",
        quick: " ",
        background: "#005f99",
      },
      {
        title: "ChatGPT HR 챗봇",
        description: "GPTs 에릭",
        quick: "바로가기",
        background: "#00b3b3",
        link: "https://blog.naver.com/yourBlog",
      },
    ],
  });
  resultSlider.init();
}
