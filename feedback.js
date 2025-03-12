document.addEventListener("DOMContentLoaded", () => {
  // Star rating functionality
  const starRating = document.querySelector(".star-rating")
  const ratingText = document.getElementById("rating-text")
  const ratingLabels = ["Poor", "Fair", "Good", "Very Good", "Excellent"]

  if (starRating) {
    const stars = starRating.querySelectorAll("input")

    stars.forEach((star, index) => {
      star.addEventListener("change", () => {
        const rating = star.value
        ratingText.textContent = ratingLabels[rating - 1]

        // Animate the stars
        stars.forEach((s, i) => {
          const label = s.nextElementSibling
          if (i < rating) {
            label.classList.add("selected")
            label.querySelector("svg").style.fill = "#FFD700"
          } else {
            label.classList.remove("selected")
            label.querySelector("svg").style.fill = "none"
          }
        })
      })
    })
  }

  // Form submission
  const feedbackForm = document.getElementById("feedback-form")

  if (feedbackForm) {
    feedbackForm.addEventListener("submit", (e) => {
      e.preventDefault()

      // Get form values
      const name = document.getElementById("name").value
      const email = document.getElementById("email").value
      const orderId = document.getElementById("order-id").value
      const rating = document.querySelector('input[name="rating"]:checked')?.value || 0
      const comments = document.getElementById("comments").value
      const suggestions = document.getElementById("suggestions").value

      // Get selected aspects
      const selectedAspects = []
      document.querySelectorAll('input[name="aspects"]:checked').forEach((checkbox) => {
        selectedAspects.push(checkbox.value)
      })

      // Contact permission
      const contactPermission = document.getElementById("contact-permission").checked

      // Simulate form submission
      feedbackForm.innerHTML = `
        <div class="feedback-success animate-fade-in">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="success-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <h3>Thank You for Your Feedback!</h3>
          <p>We appreciate you taking the time to share your experience with us.</p>
          <p>Your feedback helps us improve our service for everyone.</p>
          <button class="button primary-button full-width" onclick="window.location.href='index.html'">Back to Home</button>
        </div>
      `

      // Log the feedback data (in a real app, this would be sent to a server)
      console.log({
        name,
        email,
        orderId,
        rating,
        selectedAspects,
        comments,
        suggestions,
        contactPermission,
      })
    })
  }

  // Add animation to testimonial cards on scroll
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(".animate-slide-up, .animate-fade-in")

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

