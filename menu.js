document.addEventListener("DOMContentLoaded", () => {
  const menuItemsContainer = document.getElementById("menu-items-container")
  const menuTabs = document.getElementById("menu-tabs")
  const searchInput = document.getElementById("menu-search")

  let currentCategory = "all"
  let searchQuery = ""

  // Declare menuItems and cartItems (replace with actual data or import)
  const menuItems = [
    {
      id: "1",
      name: "Burger",
      description: "Delicious burger",
      price: 10,
      category: "main",
      image: "burger.jpg",
      vegetarian: false,
    },
    {
      id: "2",
      name: "Pizza",
      description: "Delicious pizza",
      price: 12,
      category: "main",
      image: "pizza.jpg",
      vegetarian: true,
    },
    {
      id: "3",
      name: "Salad",
      description: "Healthy salad",
      price: 8,
      category: "side",
      image: "salad.jpg",
      vegetarian: true,
    },
  ]
  const cartItems = JSON.parse(localStorage.getItem("cart")) || []

  // Initialize menu tabs
  if (menuTabs) {
    menuTabs.addEventListener("click", (e) => {
      if (e.target.classList.contains("tab-button")) {
        const category = e.target.getAttribute("data-category")
        currentCategory = category

        // Update active tab
        document.querySelectorAll(".tab-button").forEach((tab) => {
          tab.classList.remove("active")
        })
        e.target.classList.add("active")

        // Render menu items
        renderMenuItems()
      }
    })
  }

  // Initialize search
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.toLowerCase()
      renderMenuItems()
    })
  }

  // Render menu items based on category and search query
  function renderMenuItems() {
    if (!menuItemsContainer) return

    // Filter items based on category and search query
    let filteredItems = menuItems

    if (currentCategory !== "all") {
      filteredItems = filteredItems.filter((item) => item.category === currentCategory)
    }

    if (searchQuery) {
      filteredItems = filteredItems.filter(
        (item) => item.name.toLowerCase().includes(searchQuery) || item.description.toLowerCase().includes(searchQuery),
      )
    }

    // Group items by category if showing all
    if (currentCategory === "all") {
      // Get unique categories
      const categories = [...new Set(filteredItems.map((item) => item.category))]

      menuItemsContainer.innerHTML = categories
        .map(
          (category) => `
        <div class="menu-category">
          <h2 class="category-title">${category}</h2>
          <div class="menu-items">
            ${filteredItems
              .filter((item) => item.category === category)
              .map((item) => createMenuItemHTML(item))
              .join("")}
          </div>
        </div>
      `,
        )
        .join("")
    } else {
      menuItemsContainer.innerHTML = `
        <div class="menu-items">
          ${filteredItems.map((item) => createMenuItemHTML(item)).join("")}
        </div>
      `
    }

    // Add event listeners to Add buttons
    document.querySelectorAll(".add-button").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id")
        addToCart(itemId)

        // Animation effect
        this.innerHTML = "Added ✓"
        this.classList.add("pulse")

        setTimeout(() => {
          this.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
            Add
          `
          this.classList.remove("pulse")
        }, 2000)
      })
    })
  }

  // Create HTML for a menu item
  function createMenuItemHTML(item) {
    return `
      <div class="menu-item">
        <div class="menu-item-image">
          <img src="${item.image}" alt="${item.name}" loading="lazy">
        </div>
        <div class="menu-item-content">
          <div class="menu-item-header">
            <div>
              <h3 class="menu-item-title">${item.name}</h3>
              ${item.vegetarian ? '<span class="menu-item-badge">Veg</span>' : ""}
            </div>
            <span class="menu-item-price">₹${item.price}</span>
          </div>
          <p class="menu-item-description">${item.description}</p>
          <button class="add-button" data-id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
            Add
          </button>
        </div>
      </div>
    `
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

  // Initialize
  renderMenuItems()
  updateCartBadge()
})

