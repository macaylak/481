let orderCart = [];
let navVisible = false; // Flag to track the visibility of the navigation dropdown

function closeNav() {
    // go to preivous page
    window.history.back();
  }


// Display all items in a given category
function viewAll(category) {
    alert(`Displaying all items in the ${category} category.`);
}

// Add an item to the order cart
// function addToCart(itemName, price) {
//     const item = { name: itemName, price: price };
//     orderCart.push(item);
//     alert(`${itemName} added to your order!`);
//     updateOrderCount();
//     saveCartToLocalStorage();
// }

function addToCart(itemName, price) {
    const existingItem = orderCart.find(item => item.name === itemName);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        const newItem = { name: itemName, price: price, quantity: 1 };
        orderCart.push(newItem);
    }
    alert(`${itemName} added to your order!`);
    updateOrderCount();
    saveCartToLocalStorage();
}


// Update the order count displayed on the order button
function updateOrderCount() {
    const orderButton = document.querySelector('.order-button');
    orderButton.textContent = `View Order (${orderCart.length})`;
}

// Toggle the visibility of the order summary popup
function toggleOrderPopup() {
    
    let orderPopup = document.querySelector('.order-popup');
    if (orderPopup) {
        orderPopup.style.display = orderPopup.style.display === "block" ? "none" : "block";
    } else {
        createOrderPopup();
    }
}


// Create and display the order summary popup
function createOrderPopup() {
    const orderPopup = document.createElement('div');
    orderPopup.classList.add('order-popup');

    const closeButton = document.createElement('button');
    closeButton.textContent = "Close";
    closeButton.onclick = toggleOrderPopup;
    orderPopup.appendChild(closeButton);

    const orderSummary = document.createElement('h2');
    orderSummary.textContent = "Your Order";
    orderPopup.appendChild(orderSummary);

    const orderList = document.createElement('ul');
    orderCart.forEach((item, index) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `${item.name} - $${item.price.toFixed(2)} 
                              <button onclick="removeFromCart(${index})">Remove</button>`;
        orderList.appendChild(listItem);
    });
    orderPopup.appendChild(orderList);

    const totalAmount = document.createElement('p');
    const totalPrice = orderCart.reduce((sum, item) => sum + item.price, 0);
    totalAmount.textContent = `Total: $${totalPrice.toFixed(2)}`;
    orderPopup.appendChild(totalAmount);

    document.body.appendChild(orderPopup);
}

// Remove an item from the cart
function removeFromCart(index) {
    orderCart.splice(index, 1);
    updateOrderCount();
    saveCartToLocalStorage();
    document.querySelector('.order-popup').remove();
    createOrderPopup();
}

// Save cart data to local storage
function saveCartToLocalStorage() {
    localStorage.setItem('orderCart', JSON.stringify(orderCart));
}

// Load cart data from local storage
function loadCartFromLocalStorage() {
    const savedCart = localStorage.getItem('orderCart');
    if (savedCart) {
        orderCart = JSON.parse(savedCart);
        updateOrderCount();
    }
}

// Populate and display the overlay for a selected menu item

  
  function addItemToOrder(item) {
    // Check if the item already exists in the order
    const existingItemRow = document.querySelector(`[data-item-name="${item.name}"]`);
    if (existingItemRow) {
      // Increase quantity and update total if item already exists
      const quantityInput = existingItemRow.querySelector('.quantity');
      quantityInput.value = parseInt(quantityInput.value) + 1;
      updateItemTotal(existingItemRow);
    } else {
      // Create a new row for the item in the order summary
      const orderItems = document.getElementById('order-items');
      const row = document.createElement('tr');
      row.setAttribute('data-item-name', item.name);
      row.setAttribute('data-price', item.price);
  
      row.innerHTML = `
        <td>${item.name}</td>
        <td>
          <div class="quantity-controls">
            <div class="wrapper">
              <button type="button" class="custom-button decrement" onclick="decrementQuantity(this)" aria-label="Decrease quantity">-</button>
            </div>
            <input type="number" class="quantity" min="1" value="${item.quantity}" readonly>
            <div class="wrapper">
              <button type="button" class="custom-button increment" onclick="incrementQuantity(this)" aria-label="Increase quantity">+</button>
            </div>
          </div>
        </td>
        <td class="item-total">$${item.total.toFixed(2)}</td>
        <td>
          <button type="button" class="remove-item" onclick="removeItem(this)" aria-label="Remove item">✕</button>
        </td>
      `;
      orderItems.appendChild(row);
    }
  
    // Update subtotal, taxes, and total
    updateOrderSummary();
  }
  


// Load cart from local storage on page load
window.onload = loadCartFromLocalStorage;