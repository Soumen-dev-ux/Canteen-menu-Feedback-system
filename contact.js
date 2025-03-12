document.addEventListener("DOMContentLoaded", () => {
  // Contact form submission
  const contactForm = document.getElementById("contact-form")

  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const phone = document.getElementById("phone").value
      const subject = document.getElementById("subject").value
      const message = document.getElementById("message").value

      // Simulate form submission
      contactForm.innerHTML = `
        <div class="contact-success animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="success-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <h3>Message Sent Successfully!</h3>
          <p>Thank you for reaching out to us, ${name}.</p>
          <p>We'll get back to you as soon as possible.</p>
          <button class="button primary-button full-width" onclick="window.location.href='index.html'">Back to Home</button>
        </div>
      `

      // Log the contact data (in a real app, this would be sent to a server)
      console.log({
        name,
        email,
        phone,
        subject,
        message,
      })
    })
  }

  // Add animation to elements on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".animate-slide-up, .animate-slide-left, .animate-slide-right, .animate-fade-in",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (elementPosition < screenPosition) {
        element.style.opacity = "1"
        element.style.transform = "translateY(0)"
      }
    })
  }

  // Initial check for elements in view
  animateOnScroll()

  // Listen for scroll events
  window.addEventListener("scroll", animateOnScroll)
})

