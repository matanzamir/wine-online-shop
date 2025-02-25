let WINES = []

window.onload = async function() {
    WINES = JSON.parse(localStorage.getItem("wines"))

    var products = "";
    WINES.forEach(wine => {
        products += 
        `
        <div id="${wine.name}" class="product">
            <img src="images/wine/${wine.name}.jpg">
            <div class="description">
                <h2 class="name">${wine.name}</h2>
                <div class="details" id="${wine.name}_details">
                    <a>this is a ${wine.type} wine from ${wine.origin}</a>
                    <a class="price">Price is: <span>${wine.price}$</span></a>
                </div>
            </div>
        </div>

        `
    });

    document.getElementById("products").innerHTML = products;
    setCartAmount()
    attachEventListeners()
}

function setCartAmount() {
    items = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    document.getElementById("cart_number").innerHTML = items.length
}

function attachEventListeners() {
    const productElements = document.querySelectorAll('.product');
    productElements.forEach(product => {
        product.addEventListener('mouseenter', (event) => buttonShow(event), false);
        product.addEventListener('mouseleave', (event) => details(event), false);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const productElements = document.querySelectorAll('.product');

    productElements.forEach(product => {
        product.addEventListener('mouseenter', (event) => buttonShow(event), false);
        product.addEventListener('mouseleave', (event) => details(event), false);
    });
});

async function buttonShow(event) {
    const wine_name = event.currentTarget.id; 
    const wine_price = WINES.find(wine => wine.name === wine_name).price;
    const details_section = document.getElementById(`${wine_name}_details`);
    details_section.innerHTML = `<button type="button" onclick="buttonClicked(event)">Add To Cart - ${wine_price}$</button>`;
}

async function details(event) {
    const wine_name = event.currentTarget.id; 
    const wine = WINES.find(wine => wine.name === wine_name);
    const details_section = document.getElementById(`${wine_name}_details`);
    details_section.innerHTML = `
        <a>this is a ${wine.type} wine from ${wine.origin}</a>
        <a class="price">Price is: <span>${wine.price}$</span></a>
    `;
}

function buttonClicked(event) {
    let cart = localStorage.getItem("cart");
    cart = cart ? JSON.parse(cart) : [];
    cart.push(event.currentTarget.parentElement.parentElement.parentElement.id);
    localStorage.setItem("cart", JSON.stringify(cart));
    document.getElementById("cart_number").innerHTML = String(Number(document.getElementById("cart_number").innerText) + 1)
}