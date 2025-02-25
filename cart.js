let WINES = []
let MY_WINES = []
let AMOUNTS = {}

window.onload = async function() {
    WINES = JSON.parse(localStorage.getItem("wines"))

    raw_items = localStorage.getItem("cart");
    items = JSON.parse(raw_items)
    if (items.length){
        update_amounts(items)
        update_summary(items)
        items = [...new Set(items)]
        MY_WINES = await items.map(my_wine => WINES.find(wine => wine.name === my_wine));
    }
    load_purchased_wines()
}

function update_amounts(items) {
    if (items.length) {
        items.forEach(item => {
            if (AMOUNTS.hasOwnProperty(item)) {
                AMOUNTS[item]++;
            }
            else {
                AMOUNTS[item] = 1;
            }
        })
    }
}

function load_purchased_wines() {
    let items_table = document.getElementById("items")
    let rows_html = `<tr id="bar">
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Price</th>
                        <th>Total</th>
                    </tr>`

    MY_WINES.forEach((wine) => {
        rows_html += `
                    <tr id=${wine.name}_row>
                        <th>
                            <img src="images/wine/${wine.name}.jpg">
                            <a>${wine.name}<a>
                        </th>
                        <th>
                            <button type="button" onclick="remove_item_from_cart(event)">
                                -
                            </button>

                            <span id="${wine.name}_amount">${AMOUNTS[wine.name]}</span>

                            <button type="button" onclick="add_item_to_cart(event)">
                                +
                            </button>
                        </th>
                        <th><span id="${wine.name}_price">${wine.price}</span>$</th>
                        <th><span id="${wine.name}_total_price">${wine.price * AMOUNTS[wine.name]}</span>$</th>
                    </tr>
        `
    })
    items_table.innerHTML = rows_html
}

function update_summary(items) {
    document.getElementById("total_items").getElementsByTagName("strong")[0].innerHTML = items.length
    document.getElementById("total_price").getElementsByTagName("a")[0].innerHTML = calculate_total_price()
    document.getElementById("cart_number").innerHTML = items.length
}

function calculate_total_price(){
    total_price = 0
    WINES.forEach(wine => {
        total_price += AMOUNTS[wine.name] ? AMOUNTS[wine.name] * wine.price : 0
    })
    console.log(total_price)
    return total_price
}

function remove_item_from_cart(event) {
    raw_items = localStorage.getItem("cart");
    items = JSON.parse(raw_items)
    wine_name = event.currentTarget.parentElement.parentElement.id.slice(0, -4)
    items.splice(items.indexOf(wine_name), 1)
    if (AMOUNTS[wine_name] == 1) {
        delete AMOUNTS[wine_name]
        document.getElementById(wine_name + "_row").remove()
    }
    else {
        AMOUNTS[wine_name]--
        update_cart_item(wine_name)
    }
    localStorage.setItem("cart", JSON.stringify(items));
    update_summary(items)
}

function add_item_to_cart(event) {
    raw_items = localStorage.getItem("cart");
    items = JSON.parse(raw_items)
    wine_name = event.currentTarget.parentElement.parentElement.id.slice(0, -4)
    AMOUNTS[wine_name]++
    items.push(wine_name);
    update_cart_item(wine_name)
    update_summary(items)
    localStorage.setItem("cart", JSON.stringify(items));
}

function update_cart_item (wine_name) {
    console.log(wine_name)
    document.getElementById(wine_name + "_amount").innerHTML = AMOUNTS[wine_name];
    document.getElementById(wine_name + "_total_price").innerHTML = String(AMOUNTS[wine_name] * Number(document.getElementById(wine_name + "_price").textContent))
}