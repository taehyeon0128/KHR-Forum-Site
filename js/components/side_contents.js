import { initResultSlider } from './resultSlider.js';
import { initInsightSlider } from './insightSlider.js';

document.addEventListener('DOMContentLoaded', () => {
    initResultSlider();  // ✅ resultSlider는 독립적으로 동작
    initInsightSlider(); // ✅ 기존처럼 유지
});
