// script.js

document.addEventListener('DOMContentLoaded', () => {
    const orderItems = document.getElementById('order-items');
    const subtotalElement = document.getElementById('subtotal');
    const taxesElement = document.getElementById('taxes');
    const totalElement = document.getElementById('total');
    const applyDiscountBtn = document.getElementById('apply-discount');
    const discountCodeInput = document.getElementById('discount-code');
    const discountMessage = document.getElementById('discount-message');
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    const body = document.body;
  
    let discount = 0;
    let appliedDiscountCode = '';
  
    // Function to format number to currency
    function formatCurrency(num) {
      return '$' + num.toFixed(2);
    }
  
    // Function to calculate totals
    function calculateTotals() {
      let subtotal = 0;
  
      // Iterate through each order item
      const rows = orderItems.querySelectorAll('tr');
      rows.forEach(row => {
        const price = parseFloat(row.getAttribute('data-price'));
        const quantity = parseInt(row.querySelector('.quantity').value);
        const itemTotal = price * quantity;
        row.querySelector('.item-total').textContent = formatCurrency(itemTotal);
        subtotal += itemTotal;
      });
  
      // Apply discount if any
      const discountedSubtotal = subtotal - (subtotal * discount);
  
      // Calculate taxes (5%)
      const taxes = discountedSubtotal * 0.05;
  
      // Calculate total
      const total = discountedSubtotal + taxes;
  
      // Update DOM
      subtotalElement.textContent = formatCurrency(subtotal);
      taxesElement.textContent = formatCurrency(taxes);
      totalElement.textContent = formatCurrency(total);
    }
  
    // Event delegation for quantity changes and remove buttons
    orderItems.addEventListener('click', (e) => {
      const decrementBtn = e.target.closest('.decrement');
      const incrementBtn = e.target.closest('.increment');
      const removeBtn = e.target.closest('.remove-item');
  
      if (decrementBtn) {
        const row = decrementBtn.closest('tr');
        const quantityInput = row.querySelector('.quantity');
        let currentQuantity = parseInt(quantityInput.value);
        if (currentQuantity > 1) {
          quantityInput.value = currentQuantity - 1;
          calculateTotals();
        }
      }
  
      if (incrementBtn) {
        const row = incrementBtn.closest('tr');
        const quantityInput = row.querySelector('.quantity');
        let currentQuantity = parseInt(quantityInput.value);
        quantityInput.value = currentQuantity + 1;
        calculateTotals();
      }
  
      if (removeBtn) {
        const row = removeBtn.closest('tr');
        row.remove();
        calculateTotals();
      }
    });
  
    // Discount codes (example codes)
    const discountCodes = {
      'DISCOUNT10': 0.10, // 10% off
      'SAVE20': 0.20,     // 20% off
    };
  
    applyDiscountBtn.addEventListener('click', () => {
      const code = discountCodeInput.value.trim().toUpperCase();
      if (discountCodes.hasOwnProperty(code)) {
        if (appliedDiscountCode === code) {
          discountMessage.style.color = '#FF4D4D'; // Red color for error
          discountMessage.textContent = 'Discount code already applied';
        } else {
          discount = discountCodes[code];
          appliedDiscountCode = code;
          discountMessage.style.color = '#28a745'; // Green color for success
          discountMessage.textContent = `Discount applied: ${discount * 100}% off`;
          calculateTotals();
        }
      } else {
        discount = 0;
        appliedDiscountCode = '';
        discountMessage.style.color = '#FF4D4D'; // Red color for error
        discountMessage.textContent = 'Invalid discount code';
        calculateTotals();
      }
    });
  
    // Dark Mode Toggle
    // Load dark mode preference
    if (localStorage.getItem('darkMode') === 'enabled') {
      body.classList.add('dark-mode');
      darkModeToggle.textContent = '☀️';
    }
  
    darkModeToggle.addEventListener('click', () => {
      body.classList.toggle('dark-mode');
      if (body.classList.contains('dark-mode')) {
        darkModeToggle.textContent = '☀️'; // Sun emoji for dark mode
        localStorage.setItem('darkMode', 'enabled');
      } else {
        darkModeToggle.textContent = '🌙'; // Moon emoji for light mode
        localStorage.setItem('darkMode', 'disabled');
      }
    });
  
    // Prevent form submission and show alert
    const form = document.querySelector('.form');
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic validation
      const cardholderName = document.getElementById('cardholder-name').value.trim();
      const cardNumber = document.getElementById('card-number').value.trim();
      const expiryDate = document.getElementById('expiry-date').value.trim();
      const cvv = document.getElementById('cvv').value.trim();
  
      if (!cardholderName || !cardNumber || !expiryDate || !cvv) {
        alert('Please fill in all credit card fields.');
        return;
      }
  
      alert('Checkout successful!');
    });
  
    // Input Formatting for Card Number
    const cardNumberInput = document.getElementById('card-number');
    cardNumberInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      value = value.match(/.{1,4}/g)?.join(' ') || '';
      e.target.value = value;
    });
  
    // Input Formatting for Expiry Date
    const expiryDateInput = document.getElementById('expiry-date');
    expiryDateInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '').slice(0, 4);
      if (value.length >= 3) {
        value = value.slice(0, 2) + '/' + value.slice(2);
      }
      e.target.value = value;
    });
  
    // Input Formatting for CVV
    const cvvInput = document.getElementById('cvv');
    cvvInput.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '').slice(0, 4);
      e.target.value = value;
    });
  
    // Initial calculation
    calculateTotals();
  });
  