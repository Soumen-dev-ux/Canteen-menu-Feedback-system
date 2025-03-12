// DOM Elements
const mobileMenuToggle = document.getElementById("mobile-menu-toggle")
const mobileNav = document.getElementById("mobile-nav")
const themeToggle = document.getElementById("theme-toggle")
const currentYearElements = document.querySelectorAll("#current-year")

// Initialize the theme
function initTheme() {
  // Check for saved theme preference or use system preference
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "dark" || (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.documentElement.classList.add("dark")
  } else {
    document.documentElement.classList.remove("dark")
  }
}

// Toggle mobile menu
function toggleMobileMenu() {
  mobileMenuToggle.classList.toggle("active")
  mobileNav.classList.toggle("active")
}

// Toggle theme
function toggleTheme() {
  if (document.documentElement.classList.contains("dark")) {
    document.documentElement.classList.remove("dark")
    localStorage.setItem("theme", "light")
  } else {
    document.documentElement.classList.add("dark")
    localStorage.setItem("theme", "dark")
  }
}

// Set current year in footer
function setCurrentYear() {
  const currentYear = new Date().getFullYear()
  currentYearElements.forEach((element) => {
    element.textContent = currentYear
  })
}

// Tab functionality
function initTabs() {
  const tabButtons = document.querySelectorAll(".tab-button")

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.getAttribute("data-tab")

      // Remove active class from all buttons and contents
      document.querySelectorAll(".tab-button").forEach((btn) => btn.classList.remove("active"))
      document.querySelectorAll(".tab-content").forEach((content) => content.classList.remove("active"))

      // Add active class to clicked button and corresponding content
      button.classList.add("active")
      document.getElementById(tabId)?.classList.add("active")
    })
  })
}

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initTheme()
  setCurrentYear()

  // Event listeners
  mobileMenuToggle?.addEventListener("click", toggleMobileMenu)
  themeToggle?.addEventListener("click", toggleTheme)

  // Initialize tabs if they exist
  initTabs()

  // Add animation classes to elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll(
      ".food-card, .step-card, .quick-link-card, .animate-fade-in, .animate-slide-up, .animate-slide-down, .animate-slide-left, .animate-slide-right",
    )

    elements.forEach((element) => {
      const elementPosition = element.getBoundingClientRect().top
      const screenPosition = window.innerHeight / 1.2

      if (elementPosition < screenPosition) {
        element.style.opacity = "1"
        if (
          element.classList.contains("animate-slide-up") ||
          element.classList.contains("food-card") ||
          element.classList.contains("step-card") ||
          element.classList.contains("quick-link-card")
        ) {
          element.style.transform = "translateY(0)"
        } else if (element.classList.contains("animate-slide-down")) {
          element.style.transform = "translateY(0)"
        } else if (element.classList.contains("animate-slide-left")) {
          element.style.transform = "translateX(0)"
        } else if (element.classList.contains("animate-slide-right")) {
          element.style.transform = "translateX(0)"
        } else if (element.classList.contains("animate-scale")) {
          element.style.transform = "scale(1)"
        }
      }
    })
  }

  // Initial check for elements in view
  animateOnScroll()

  // Listen for scroll events
  window.addEventListener("scroll", animateOnScroll)
})

