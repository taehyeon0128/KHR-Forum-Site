document.addEventListener("DOMContentLoaded", () => {
    emailjs.init("template_ooc5mu5"); // ✅ EmailJS 사용자 ID 입력

    document.getElementById("contactForm").addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        };

        emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", formData)
            .then(response => {
                alert("문의가 성공적으로 전송되었습니다!");
                document.getElementById("contactForm").reset(); // ✅ 폼 초기화
            }, error => {
                alert("문의 전송에 실패했습니다. 다시 시도해주세요.");
                console.error("EmailJS 오류:", error);
            });
    });
});
