const menuItems = [
  // Sample menu items data
  {
    id: 1,
    name: "Burger",
    image: "burger.jpg",
    price: 150,
    description: "A juicy beef burger with all the fixings.",
    category: "Lunch",
    featured: true,
    vegetarian: false,
  },
  {
    id: 2,
    name: "Pizza",
    image: "pizza.jpg",
    price: 200,
    description: "A delicious pepperoni pizza.",
    category: "Lunch",
    featured: true,
    vegetarian: false,
  },
  {
    id: 3,
    name: "Salad",
    image: "salad.jpg",
    price: 100,
    description: "A fresh and healthy salad.",
    category: "Lunch",
    featured: true,
    vegetarian: true,
  },
  {
    id: 4,
    name: "Pasta",
    image: "pasta.jpg",
    price: 180,
    description: "A creamy pasta dish.",
    category: "Dinner",
    featured: false,
    vegetarian: true,
  },
  // Add more menu items here...
  {
    id: 5,
    name: "Coffee",
    image: "coffee.jpg",
    price: 50,
    description: "A hot cup of coffee.",
    category: "Beverages",
    featured: false,
    vegetarian: true,
  },
  {
    id: 6,
    name: "Tea",
    image: "tea.jpg",
    price: 40,
    description: "A cup of tea.",
    category: "Beverages",
    featured: false,
    vegetarian: true,
  },
]

const cartItems = []

document.addEventListener("DOMContentLoaded", () => {
  // Populate featured items
  const featuredItemsContainer = document.getElementById("featured-items")
  if (featuredItemsContainer) {
    const featuredItems = menuItems.filter((item) => item.featured).slice(0, 4)

    featuredItemsContainer.innerHTML = featuredItems
      .map(
        (item) => `
      <div class="food-card" style="opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease;">
        <div class="food-card-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          ${item.vegetarian ? '<span class="food-badge">Veg</span>' : ""}
        </div>
        <div class="food-card-content">
          <div class="food-card-header">
            <h3 class="food-card-title">${item.name}</h3>
            <span class="food-card-price">₹${item.price}</span>
          </div>
          <p class="food-card-description">${item.description}</p>
          <button class="button primary-button full-width add-to-cart-btn" data-id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
            Add to Cart
          </button>
        </div>
      </div>
    `,
      )
      .join("")

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id")
        addToCart(itemId)

        // Animation effect
        this.innerHTML = "Added to Cart ✓"
        this.classList.add("pulse")

        setTimeout(() => {
          this.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
            Add to Cart
          `
          this.classList.remove("pulse")
        }, 2000)
      })
    })
  }

  // Populate recommended meals based on time of day
  const recommendedMealsContainer = document.getElementById("recommended-meals")
  if (recommendedMealsContainer) {
    // Get time-based recommendations
    const hour = new Date().getHours()
    let category = "Snacks" // Default

    if (hour >= 6 && hour < 11) {
      category = "Breakfast"
    } else if (hour >= 11 && hour < 16) {
      category = "Lunch"
    } else if (hour >= 16 && hour < 21) {
      category = "Snacks"
    } else {
      category = "Beverages"
    }

    // Get 3 random items from the category
    const filteredItems = menuItems.filter((item) => item.category === category)
    const shuffled = [...filteredItems].sort(() => 0.5 - Math.random())
    const recommendations = shuffled.slice(0, 3)

    recommendedMealsContainer.innerHTML = recommendations
      .map(
        (item) => `
      <div class="food-card" style="opacity: 0; transform: translateY(20px); transition: opacity 0.5s ease, transform 0.5s ease;">
        <div class="food-card-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
          ${item.vegetarian ? '<span class="food-badge">Veg</span>' : ""}
        </div>
        <div class="food-card-content">
          <div class="food-card-header">
            <h3 class="food-card-title">${item.name}</h3>
            <span class="food-card-price">₹${item.price}</span>
          </div>
          <p class="food-card-description">${item.description}</p>
          <button class="button primary-button full-width add-to-cart-btn" data-id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
            Add to Cart
          </button>
        </div>
      </div>
    `,
      )
      .join("")

    // Add event listeners to Add to Cart buttons
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id")
        addToCart(itemId)

        // Animation effect
        this.innerHTML = "Added to Cart ✓"
        this.classList.add("pulse")

        setTimeout(() => {
          this.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"></circle><circle cx="19" cy="21" r="1"></circle><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path></svg>
            Add to Cart
          `
          this.classList.remove("pulse")
        }, 2000)
      })
    })
  }

  // Function to add item to cart
  function addToCart(itemId) {
    const item = menuItems.find((item) => item.id === itemId)
    if (!item) return

    // Check if item is already in cart
    const existingItem = cartItems.find((cartItem) => cartItem.id === itemId)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.push({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: 1,
      })
    }

    // Update cart badge
    updateCartBadge()

    // Save cart to localStorage
    localStorage.setItem("cart", JSON.stringify(cartItems))
  }

  // Update cart badge
  function updateCartBadge() {
    const cartBadge = document.querySelector(".cart-badge")
    if (cartBadge) {
      const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
      cartBadge.textContent = totalItems
    }
  }

  // Initialize cart badge
  updateCartBadge()

  // Hero banner animation
  const heroTextContainer = document.querySelector(".hero-text-container")
  if (heroTextContainer) {
    setTimeout(() => {
      heroTextContainer.style.opacity = "1"
      heroTextContainer.style.transform = "translateY(0)"
    }, 300)
  }
})

