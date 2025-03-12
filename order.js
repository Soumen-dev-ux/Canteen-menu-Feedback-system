// Import cartItems from data.js
import { cartItems } from "./data.js"

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const cartItemsContainer = document.getElementById("cart-items")
  const cartTotalAmount = document.getElementById("cart-total-amount")
  const addMoreItemsBtn = document.getElementById("add-more-items")
  const orderForm = document.getElementById("order-form")
  const trackOrderBtn = document.getElementById("track-order-btn")
  const orderTrackingForm = document.getElementById("order-tracking-form")
  const orderStatus = document.getElementById("order-status")

  // Load cart from localStorage
  function loadCart() {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      return JSON.parse(savedCart)
    }
    return cartItems // Default from data.js
  }

  // Initialize cart
  const cart = loadCart()

  // Render cart items
  function renderCartItems() {
    if (!cartItemsContainer) return

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="empty-cart">
          <p>Your cart is empty. Add items from the menu.</p>
        </div>
      `
      return
    }

    cartItemsContainer.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <div class="cart-item-info">
          <p class="cart-item-name">${item.name}</p>
          <p class="cart-item-price">₹${item.price} each</p>
        </div>
        <div class="cart-item-actions">
          <button class="quantity-button decrease-quantity" data-id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"></path></svg>
          </button>
          <span class="cart-item-quantity">${item.quantity}</span>
          <button class="quantity-button increase-quantity" data-id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg>
          </button>
          <button class="remove-button" data-id="${item.id}">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>
          </button>
        </div>
      </div>
    `,
      )
      .join("")

    // Update total amount
    updateCartTotal()

    // Add event listeners
    document.querySelectorAll(".increase-quantity").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id")
        increaseQuantity(itemId)
      })
    })

    document.querySelectorAll(".decrease-quantity").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id")
        decreaseQuantity(itemId)
      })
    })

    document.querySelectorAll(".remove-button").forEach((button) => {
      button.addEventListener("click", function () {
        const itemId = this.getAttribute("data-id")
        removeItem(itemId)
      })
    })
  }

  // Update cart total
  function updateCartTotal() {
    if (!cartTotalAmount) return

    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)
    cartTotalAmount.textContent = `₹${total}`
  }

  // Increase item quantity
  function increaseQuantity(itemId) {
    const item = cart.find((item) => item.id === itemId)
    if (item) {
      item.quantity += 1
      saveCart()
      renderCartItems()
      updateCartBadge()
    }
  }

  // Decrease item quantity
  function decreaseQuantity(itemId) {
    const item = cart.find((item) => item.id === itemId)
    if (item && item.quantity > 1) {
      item.quantity -= 1
      saveCart()
      renderCartItems()
      updateCartBadge()
    }
  }

  // Remove item from cart
  function removeItem(itemId) {
    const index = cart.findIndex((item) => item.id === itemId)
    if (index !== -1) {
      cart.splice(index, 1)
      saveCart()
      renderCartItems()
      updateCartBadge()
    }
  }

  // Save cart to localStorage
  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart))
  }

  // Update cart badge
  function updateCartBadge() {
    const cartBadge = document.querySelector(".cart-badge")
    if (cartBadge) {
      const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
      cartBadge.textContent = totalItems
    }
  }

  // Add more items button
  if (addMoreItemsBtn) {
    addMoreItemsBtn.addEventListener("click", () => {
      window.location.href = "menu.html"
    })
  }

  // Order form submission
  if (orderForm) {
    orderForm.addEventListener("submit", (e) => {
      e.preventDefault()

      if (cart.length === 0) {
        alert("Your cart is empty. Please add items before placing an order.")
        return
      }

      // Simulate order placement
      const orderId = "ORD" + Math.floor(Math.random() * 10000)

      // Show success message
      orderForm.innerHTML = `
        <div class="order-success">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="success-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
          <h3>Order Placed Successfully!</h3>
          <p>Your order ID is: <strong>${orderId}</strong></p>
          <p>We'll notify you when your order is ready for pickup.</p>
          <button class="button primary-button full-width" onclick="window.location.href='index.html'">Back to Home</button>
        </div>
      `

      // Clear cart
      cart.length = 0
      saveCart()
      updateCartBadge()
    })
  }

  // Track order button
  if (trackOrderBtn) {
    trackOrderBtn.addEventListener("click", () => {
      const orderId = document.getElementById("order-id").value.trim()

      if (!orderId) {
        alert("Please enter your order ID")
        return
      }

      // Hide tracking form and show order status
      orderTrackingForm.classList.add("hidden")
      orderStatus.classList.remove("hidden")

      // Simulate order tracking
      orderStatus.innerHTML = `
        <div class="order-info">
          <div>
            <h3 class="order-number">Order #${orderId}</h3>
            <p class="order-time">Placed at ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
          </div>
          <button class="button outline-button" id="track-another-btn">Track Another</button>
        </div>
        
        <div class="tracking-timeline">
          <div class="timeline-line"></div>
          <div class="timeline-steps">
            <div class="timeline-step">
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
              </div>
              <div class="step-content">
                <h4 class="step-title">Order Received</h4>
                <p class="step-time">${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</p>
              </div>
            </div>
            
            <div class="timeline-step">
              <div class="step-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="22"></line></svg>
              </div>
              <div class="step-content">
                <h4 class="step-title">Preparing</h4>
                <p class="step-time">In progress...</p>
              </div>
            </div>
            
            <div class="timeline-step">
              <div class="step-icon inactive">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14"></path><path d="M16.5 9.4 7.55 4.24"></path><polyline points="3.29 7 12 12 20.71 7"></polyline><line x1="12" y1="22" x2="12" y2="12"></line><circle cx="18.5" cy="15.5" r="2.5"></circle><path d="M20.27 17.27 22 19"></path></svg>
              </div>
              <div class="step-content">
                <h4 class="step-title">Ready for Pickup</h4>
                <p class="step-time">Upcoming</p>
              </div>
            </div>
            
            <div class="timeline-step">
              <div class="step-icon inactive">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
              </div>
              <div class="step-content">
                <h4 class="step-title">Completed</h4>
                <p class="step-time">Upcoming</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="pickup-time">
          <h4 class="pickup-time-title">Estimated Pickup Time</h4>
          <p class="pickup-time-value">10:50 AM</p>
          <p class="pickup-time-note">Your order will be ready in approximately 15 minutes</p>
        </div>
      `

      // Add event listener to "Track Another" button
      document.getElementById("track-another-btn").addEventListener("click", () => {
        orderTrackingForm.classList.remove("hidden")
        orderStatus.classList.add("hidden")
        document.getElementById("order-id").value = ""
      })
    })
  }

  // Initialize
  renderCartItems()
  updateCartBadge()
})

