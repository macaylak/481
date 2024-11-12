// Fetch menu section data from menu.html
fetch('viewMenu/index.html')
    .then(response => response.text())
    .then(menuHtml => {
    document.getElementById('menu').innerHTML = menuHtml;
});

