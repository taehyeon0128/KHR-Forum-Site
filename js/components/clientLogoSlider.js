document.addEventListener("DOMContentLoaded", async () => {
    const logoTrack = document.querySelector(".client-logo-track");

    try {
        // ✅ JSON 데이터 불러오기
        const response = await fetch('data/04_client_logos.json');
        if (!response.ok) throw new Error("로고 데이터를 불러올 수 없습니다.");
        const logoData = await response.json();

        // ✅ 로고 추가
        logoData.forEach(logo => {
            const img = document.createElement("img");
            img.classList.add("client-logo");
            img.src = logo.image;
            img.alt = logo.name;
            logoTrack.appendChild(img);
        });

    } catch (error) {
        console.error("📌 로고 JSON 로드 오류:", error);
    }
});
