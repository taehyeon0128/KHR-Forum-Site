import { CustomSlider } from '../modules/slider.js';

export async function initInsightSlider() {
    try {
        const response = await fetch('data/01_insights.json');
        if (!response.ok) throw new Error("JSON 데이터를 불러올 수 없습니다.");
        const bookData = await response.json();
            
        const bookSlider = new CustomSlider('.insight-content', {
            loop: true,
            pagination: true,
            draggable: true,
            autoSlide: true,
            interval: 5000,
            renderSlide: (data) => {
                const slide = document.createElement('div');
                slide.classList.add('insight-slide');
                slide.innerHTML = `
                    <div class="insight-title-box"><span class="insight-title">${data.topic}</span></div>
                    <p class="insight-description">${data.description}</p>
                    <p class="insight-category">${data.category}</p>
                `;
                slide.addEventListener('click', () => {
                    window.open(data.link, '_blank');
                });
                return slide;
            },
            data: bookData
        });

        bookSlider.init();
    } catch (error) {
        console.error("📌 bookContent JSON 로드 오류:", error);
    }
}
