document.addEventListener("DOMContentLoaded", async () => {
  const programSections = {
    khr: document.querySelector("#khr-programs .program-track"),
    open: document.querySelector("#open-programs .program-track"),
    coauthor: document.querySelector("#coauthor-programs .program-track"),
  };

  try {
    // ✅ JSON 데이터 불러오기
    const response = await fetch("data/03_programs.json");
    if (!response.ok) throw new Error("프로그램 데이터를 불러올 수 없습니다.");
    const programData = await response.json();

    // ✅ 카드 동적 추가
    programData.forEach((program) => {
      const card = document.createElement("div");
      card.classList.add("program-card");

      // ✅ 이미지 추가
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("program-image");
      imageDiv.style.backgroundImage = `url('${program.image}')`;

      // ✅ 프로그램 정보 추가
      const infoDiv = document.createElement("div");
      infoDiv.classList.add("program-info");

      // ✅ 제목
      const title = document.createElement("h3");
      title.classList.add("program-title");
      title.textContent = program.title;

      // ✅ 카테고리 (배열을 div로 변환)
      const categoryDiv = document.createElement("div");
      categoryDiv.classList.add("program-category");
      program.category.forEach((cat) => {
        const catDiv = document.createElement("div");
        catDiv.textContent = cat;
        categoryDiv.appendChild(catDiv);
      });

      // ✅ 요약설명
      const summary = document.createElement("p");
      summary.classList.add("program-summary");
      summary.textContent = program.summary;

      // ✅ 프로그램 메타 정보 (시간, 날짜, 가격)
      const metaDiv = document.createElement("div");
      metaDiv.classList.add("program-meta");

      if (program.date) {
        const date = document.createElement("span");
        date.textContent = `📅 ${program.date}`;
        metaDiv.appendChild(date);
      }

      const time = document.createElement("span");
      time.textContent = `⏰ ${program.time}`;
      metaDiv.appendChild(time);

      if (program.cost) {
        const hr = document.createElement("hr");
        const cost = document.createElement("span");
        cost.textContent = `💰 ${program.cost}`;
        metaDiv.appendChild(cost);
      }

      // ✅ 링크 추가
      card.addEventListener("click", () => {
        window.open(program.link, "_blank");
      });

      // ✅ 요소 조합
      infoDiv.appendChild(title);
      infoDiv.appendChild(categoryDiv);
      infoDiv.appendChild(summary);
      infoDiv.appendChild(metaDiv);
      card.appendChild(imageDiv);
      card.appendChild(infoDiv);

      // ✅ 해당 슬라이드에 추가
      if (programSections[program.type]) {
        programSections[program.type].appendChild(card);
      }
    });
  } catch (error) {
    console.error("📌 프로그램 JSON 로드 오류:", error);
  }
});
