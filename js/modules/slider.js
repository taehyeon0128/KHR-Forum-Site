export class CustomSlider {
    constructor(containerSelector, options = {}) {
        this.container = document.querySelector(containerSelector);
        this.track = document.createElement('div');
        this.track.classList.add('slider-track');
        this.container.innerHTML = ''; // 기존 내용 제거
        this.container.appendChild(this.track);

        // 기본 옵션 설정
        this.loop = options.loop ?? true;
        this.pagination = options.pagination ?? true;
        this.draggable = options.draggable ?? true;
        this.autoSlide = options.autoSlide ?? false;
        this.interval = options.interval ?? 4000;
        this.data = options.data ?? [];
        this.renderSlide = options.renderSlide;

        this.currentIndex = this.loop ? 0 : 1;
        this.isDragging = false;

        // 슬라이드 추가
        this.createSlides();
        if (this.pagination) this.createPagination();
        this.addEventListeners();

        if (this.autoSlide) this.startAutoSlide();
    }
    
    init() {
        this.updateSlidePosition();
    }
    
    createSlides() {
        this.slides = [];
        this.data.forEach(item => {
            const slide = this.renderSlide(item);
            slide.classList.add('slide');
            this.track.appendChild(slide);
            this.slides.push(slide);
        });
    }

    createPagination() {
        this.paginationContainer = document.createElement('div');
        this.paginationContainer.classList.add('pagination');
        this.container.appendChild(this.paginationContainer);

        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.moveToSlide(index));
            this.paginationContainer.appendChild(dot);
        });
    }

    moveToSlide(index) {
        this.currentIndex = index;
        this.updateSlidePosition();
    }

    updateSlidePosition() {
        this.track.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        
        this.updatePagination();
    }

    updatePagination() {
        if (!this.pagination) return;
        const dots = this.paginationContainer.querySelectorAll('.dot');
        dots.forEach(dot => dot.classList.remove('active'));
        dots[this.currentIndex].classList.add('active');
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.slides.length;
            this.updateSlidePosition();
        }, this.interval);
    }

    addEventListeners() {
        this.container.addEventListener('mouseenter', () => clearInterval(this.autoSlideInterval));
        this.container.addEventListener('mouseleave', () => this.startAutoSlide());
    }
}
