const menuItems = [
    { name: 'Pancakes', category: 'breakfast', price: 12, image: 'pancakes.jpeg' },
    { name: 'Omelette', category: 'breakfast', price: 10, image: 'omelette.jpeg' },
    { name: 'Cheeseburger', category: 'lunch', price: 15, image: 'burger.jpg' },
    { name: 'Grilled Chicken', category: 'dinner', price: 20, image: 'chicken.jpg' },
    { name: 'Chocolate Cake', category: 'dessert', price: 8, image: 'cake.jpg' },
];

let cart = [];

function displayMenu(items) {
    const container = document.getElementById('menu-list');
    container.innerHTML = '';

    items.forEach(item => {
        const div = document.createElement('div');
        div.className = 'menu-item';
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h3>${item.name}</h3>
                <p class="price">$${item.price}</p>
                <button class="add-to-cart" onclick="addToCart('${item.name}')">Add to Cart</button>
            </div>
        `;
        container.appendChild(div);
    });
}

function filterCategory(category) {
    const filteredItems = category === 'all'
        ? menuItems
        : menuItems.filter(item => item.category === category);
    displayMenu(filteredItems);
}

function addToCart(itemName) {
    const item = menuItems.find(i => i.name === itemName);
    cart.push(item);
    updateCartCount();
}

function updateCartCount() {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = cart.length;
}

function viewCart() {
    alert(`Cart: ${cart.map(item => item.name).join(', ')}`);
}

// Load all menu items on page load
window.onload = () => filterCategory('all');