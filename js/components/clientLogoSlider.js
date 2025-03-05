document.addEventListener("DOMContentLoaded", async () => {
    const logoTrack = document.querySelector(".client-logo-track");

    try {
        // ✅ JSON 데이터 불러오기
        const response = await fetch('data/04_client_logos.json');
        if (!response.ok) throw new Error("로고 데이터를 불러올 수 없습니다.");
        const logoData = await response.json();

        // ✅ 초기 로고 추가
        logoData.forEach(logo => {
            const img = document.createElement("img");
            img.classList.add("client-logo");
            img.src = logo.image;
            img.alt = logo.name;
            logoTrack.appendChild(img);
        });

        // ✅ 일정 간격으로 첫 번째 로고를 삭제하고 끝으로 추가하는 함수
        setInterval(() => {
            logoTrack.style.transition = "transform 0.5s ease-in-out";
            logoTrack.style.transform = "translateX(-180px)"; // ✅ 왼쪽으로 부드럽게 이동

            setTimeout(() => {
                const firstLogo = logoTrack.children[0]; // ✅ 첫 번째 로고 가져오기
                logoTrack.appendChild(firstLogo.cloneNode(true)); // ✅ 복제하여 마지막에 추가
                logoTrack.removeChild(firstLogo); // ✅ 기존 첫 번째 로고 삭제

                logoTrack.style.transition = "none"; // ✅ 트랜지션 초기화
                logoTrack.style.transform = "translateX(0)"; // ✅ 원래 위치로 이동

            }, 500); // ✅ 애니메이션 지속 시간 (0.5초) 후 실행

        }, 2000); // ✅ 2초마다 슬라이드 이동

    } catch (error) {
        console.error("📌 로고 JSON 로드 오류:", error);
    }
});
