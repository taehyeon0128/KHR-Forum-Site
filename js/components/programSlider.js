document.addEventListener('DOMContentLoaded', async () => {
    const programContainer = document.querySelector('.program-slider-container');

    try {
        // ✅ JSON 데이터 불러오기
        const response = await fetch('data/03_open_programs.json');
        if (!response.ok) throw new Error("프로그램 데이터를 불러올 수 없습니다.");
        const programData = await response.json();

        // ✅ 필드별로 섹션 생성
        const groupedPrograms = {};
        programData.forEach(program => {
            if (!groupedPrograms[program.field]) {
                groupedPrograms[program.field] = [];
            }
            groupedPrograms[program.field].push(program);
        });

        Object.keys(groupedPrograms).forEach(field => {
            // ✅ 필드 제목 추가
            const fieldSection = document.createElement('section');
            fieldSection.classList.add('program-section');
            fieldSection.innerHTML = `<h2>${field}</h2>`;

            // ✅ 스크롤 가능한 컨테이너 생성
            const scrollContainer = document.createElement('div');
            scrollContainer.classList.add('program-scroll-container');

            // ✅ 프로그램 트랙 생성
            const programTrack = document.createElement('div');
            programTrack.classList.add('program-track');

            groupedPrograms[field].forEach(program => {
                const card = document.createElement('div');
                card.classList.add('program-card');

                card.innerHTML = `
                    <div class="program-image" style="background-image: url('${program.square_image}');"></div>
                    <div class="program-info">
                        <h3 class="program-title">${program.title}</h3>
                        <div class="program-category">${program.category.join(', ')}</div>
                        <p class="program-summary">${program.summary}</p>
                        <p class="program-date">📅 ${program.date} | ⏰ ${program.time}</p>
                        <p class="program-cost">💰 ${program.cost}</p>
                    </div>
                `;

                programTrack.appendChild(card);
            });

            scrollContainer.appendChild(programTrack);
            fieldSection.appendChild(scrollContainer);
            programContainer.appendChild(fieldSection);

            // ✅ 마우스 휠로 가로 스크롤
            scrollContainer.addEventListener('wheel', (event) => {
                event.preventDefault();
                scrollContainer.scrollLeft += event.deltaY;
            });
        });

    } catch (error) {
        console.error("📌 프로그램 JSON 로드 오류:", error);
    }
});
