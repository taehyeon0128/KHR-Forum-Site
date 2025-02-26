import { CustomSlider } from '../modules/slider.js';

export async function initBookSlider() {
    try {
        const response = await fetch('data/01_books.json');
        if (!response.ok) throw new Error("JSON 데이터를 불러올 수 없습니다.");
        const bookData = await response.json();
            
        const bookSlider = new CustomSlider('.book-content', {
            loop: true,
            pagination: true,
            draggable: true,
            autoSlide: true,
            interval: 5000,
            renderSlide: (data) => {
                const slide = document.createElement('div');
                slide.classList.add('slide');
                slide.innerHTML = `
                    <div class="book-title">${data.topic}</div>
                    <div class="book-image"><img src="${data.image}" alt="${data.topic}"></div>
                    <p class="book-category">${data.category}</p>
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
