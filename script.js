// Typing animation
const textArray = ["Frontend Developer", "Excel User"];
let index = 0;
let charIndex = 0;
let typingElement = document.getElementById("typing");
let isDeleting = false;

function type() {
  let currentText = textArray[index];
  if (isDeleting) {
    typingElement.textContent = currentText.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      index = (index + 1) % textArray.length;
    }
  } else {
    typingElement.textContent = currentText.substring(0, charIndex++);
    if (charIndex > currentText.length) {
      isDeleting = true;
      setTimeout(type, 1000);
      return;
    }
  }
  setTimeout(type, isDeleting ? 50 : 100);
}
type();

// Scroll animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.3 });

document.querySelectorAll('.project-card').forEach(card => {
  observer.observe(card);
});

// Side navbar toggle
let sidenav = document.querySelector(".side-navbar");
let open = document.getElementById("menu-toggle");
let close = document.getElementById("close-toggle");

open.addEventListener('click', () => {
  sidenav.style.left = "0";
});
close.addEventListener('click', () => {
  sidenav.style.left = "-60%";
});

// ✅ Contact Form Submission (ONLY keep this block)
const form = document.getElementById("contactForm");
const statusMsg = document.getElementById("formStatus");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = {
    name: form.name.value,
    email: form.email.value,
    message: form.message.value
  };

  try {
    const res = await fetch("https://portfolio-backend-mzxm.onrender.com/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const result = await res.text();

    if (res.ok) {
      statusMsg.textContent = "✅ Message sent successfully!";
      statusMsg.style.color = "green";
      form.reset();
      setTimeout(() => {
        statusMsg.textContent = "";
      }, 3000);
    } else {
      throw new Error(result);
    }
  } catch (error) {
    statusMsg.textContent = "❌ Failed to send message. Try again.";
    statusMsg.style.color = "red";
    console.error("Error:", error);
  }
});
