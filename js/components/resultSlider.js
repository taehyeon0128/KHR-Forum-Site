import { CustomSlider } from '../modules/slider.js';

export function initResultSlider() {
    const resultSlider = new CustomSlider('.result-content', {
        loop: true,
        pagination: true,
        draggable: true,
        autoSlide: true, 
        interval: 5000, 
        renderSlide: (data) => {
            const slide = document.createElement('div');
            slide.classList.add('slide');
            slide.style.background = data.background;
            slide.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.description}</p>
            `;
            if (data.link) {
                slide.addEventListener('click', () => {
                    window.open(data.link, '_blank');
                });
            }
            return slide;
        },
        data: [
            { title: "KHR포럼", description: "누적 고객 10,000명 달성!", background: "#005f99" },
            { title: "2025년 00월 KHR 칼럼", description: "HR 환경 변화 분석", background: "#00b3b3", link: "https://blog.naver.com/yourBlog" }
        ]
    });
    resultSlider.init();
}
