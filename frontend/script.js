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
        setTimeout(type, 1000); // Pause before deleting
        return;
      }
    }
    setTimeout(type, isDeleting ? 50 : 100); // Typing/deleting speed
  }

  type();


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

// Toogle shown
let sidenav = document.querySelector(".side-navbar")
let open = document.getElementById("menu-toggle")
let close = document.getElementById("close-toggle")

open.addEventListener('click' , () =>{
   sidenav.style.left = "0"
})

close.addEventListener('click' , () =>{
   sidenav.style.left = "-60%"
})
// Contact Form

const form = document.getElementById("contactForm");
  const status = document.getElementById("form-status");

  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // stop page reload

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value,
    };

    try {
      const res = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.text(); // expecting plain text
      status.style.color = "green";
      status.textContent = result;
      form.reset(); // clear form fields

    } catch (err) {
      status.style.color = "red";
      status.textContent = "❌ Failed to send message.";
      console.error("Error:", err);
    }
  });



  // Status Msg & Clear Field

  const forms = document.getElementById("contactForm");
  const statusMsg = document.getElementById("formStatus");

  forms.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = {
      name: form.name.value,
      email: form.email.value,
      message: form.message.value
    };

    try {
      const res = await fetch("http://localhost:3000/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await res.text();

      if (res.ok) {
        // Show success message
        statusMsg.textContent = "✅ Message sent successfully!";
        statusMsg.style.color = "green";

        // Clear form
        form.reset();

        // Hide message after 3 seconds (optional)
        setTimeout(() => {
          statusMsg.textContent = "";
        }, 3000);
      } else {
        throw new Error(result);
      }
    } catch (error) {
      statusMsg.textContent = "❌ Failed to send message. Try again.";
      statusMsg.style.color = "red";
    }
  });