window.onload = async function() {
    wines = localStorage.getItem("wines") ? JSON.parse(localStorage.getItem("wines")) : []

    update_wines(wines)

 
    setCartAmount()

    document.getElementById("wineForm").addEventListener("submit", function(event) {
        event.preventDefault();
        const wineName = document.getElementById("wineName").value;
        const wineType = document.querySelector('input[name="type"]:checked')?.value;
        const originCountry = document.getElementById("originCountry").value;
        const winePrice = document.getElementById("price").value;
        // const winePhoto = document.getElementById("winePhoto").files[0];
    
        new_wine = {
            name: wineName,
            type: wineType,
            price: winePrice,
            origin: originCountry
        }
        if (!localStorage.getItem("wines")) {
            localStorage.setItem("wines", "[]")
        }

        wines_parsed = JSON.parse(localStorage.getItem("wines"))
        wines_parsed.push(new_wine)

        console.log(wines_parsed)
        localStorage.setItem("wines", JSON.stringify(wines_parsed))
        
        update_wines(wines_parsed)

        }
    )
    
}

function update_wines (wines) {

    var products = "";
    wines.forEach(wine => {
        products += 
        `
        <div id="${wine.name}" class="product">
            <img src="images/wine/${wine.name}.jpg">
            <div class="description">
                <h2 class="name">${wine.name} - ${wine.price}$</h2>
                <div class="details" id="${wine.name}_details">
                    <button type="button" onclick="buttonClicked(event)">Remove Wine</button>
                </div>
            </div>
        </div>

        `
    });
   document.getElementById("products").innerHTML = products;
}

function setCartAmount() {
    items = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
    document.getElementById("cart_number").innerHTML = items.length
}

function buttonClicked(event) {
    wines = JSON.parse(localStorage.getItem("wines"))
    wine_name = event.currentTarget.parentElement.id.slice(0, -8)
    wines.splice(wines.findIndex(wine => wine.name === wine_name))
    localStorage.setItem("wines", wines)
    cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
    cart.splice(cart.indexOf(wine_name))
    update_wines(wines)
}

