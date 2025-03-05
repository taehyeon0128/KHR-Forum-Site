document.addEventListener("DOMContentLoaded", async () => {
    const bookContainer = document.querySelector(".book-scroll-container");

    try {
        // ✅ JSON 데이터 불러오기
        const response = await fetch("data/05_books.json");
        if (!response.ok) throw new Error("책 데이터를 불러올 수 없습니다.");
        const bookData = await response.json();

        // ✅ 책 트랙 생성
        const bookTrack = document.createElement("div");
        bookTrack.classList.add("book-track");

        bookData.forEach((book) => {
            const card = document.createElement("div");
            card.classList.add("book-card");

            // ✅ 링크 기능 추가
            card.addEventListener("click", () => {
                window.open(book.link, "_blank");
            });

            // ✅ 이미지 섹션 (왼쪽)
            const imageDiv = document.createElement("div");
            imageDiv.classList.add("book-image");
            imageDiv.style.backgroundImage = `url('${book.image}')`;

            // ✅ 정보 섹션 (오른쪽)
            const infoDiv = document.createElement("div");
            infoDiv.classList.add("book-info");

            const title = document.createElement("h3");
            title.classList.add("book-title");
            title.textContent = book.title;

            // ✅ 카테고리 div 박스 생성
            const categoryDiv = document.createElement("div");
            categoryDiv.classList.add("book-category");
            book.category.forEach((cat) => {
                const catDiv = document.createElement("div");
                catDiv.textContent = cat;
                categoryDiv.appendChild(catDiv);
            });

            // ✅ 출간 날짜 표시
            const date = document.createElement("p");
            date.classList.add("book-date");
            date.textContent = `📅 출간일: ${book.date}`;

            // ✅ 책 설명 (줄 바꿈 허용)
            const description = document.createElement("p");
            description.classList.add("book-description");
            description.textContent = book.description;

            // ✅ 저자 및 소속 정보
            const writerDiv = document.createElement("div");
            writerDiv.classList.add("book-writers");
            book.writer.forEach((writer, index) => {
                const writerSpan = document.createElement("span");
                writerSpan.textContent = writer;
                writerDiv.appendChild(writerSpan);

                // ✅ 소속 추가 (같은 index의 affiliation과 매칭)
                if (book.affiliation[index]) {
                    const affSpan = document.createElement("span");
                    affSpan.textContent = ` (${book.affiliation[index]})`;
                    writerDiv.appendChild(affSpan);
                }
            });

            // ✅ 요소 추가
            infoDiv.appendChild(title);
            infoDiv.appendChild(categoryDiv);
            infoDiv.appendChild(date);  // 출간 날짜 추가
            infoDiv.appendChild(description);
            infoDiv.appendChild(writerDiv);
            card.appendChild(imageDiv);
            card.appendChild(infoDiv);
            bookTrack.appendChild(card);
        });

        bookContainer.appendChild(bookTrack);

    } catch (error) {
        console.error("📌 책 JSON 로드 오류:", error);
    }
});
