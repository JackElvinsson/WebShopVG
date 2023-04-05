function order(item){
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    
    // Check if the item already exists in the cart
    const existingItem = cart.find(cartItem => cartItem.id === item.id);
    
    if (existingItem) {
        // If the item already exists, increase the quantity by 1
        existingItem.quantity++;
    } else {
        // If the item doesn't exist, add it to the cart
        item.quantity = 1;
        cart.push(item);
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

function getItem(){
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const orderContainer = document.querySelector('.order-container');

    if (Object.keys(cart).length > 0) { // Check if cart is not empty
        Object.keys(cart).forEach(key => {
            const item = cart[key];

            let itemTitle = document.createElement('h2');
            itemTitle.textContent = item.title;
            orderContainer.appendChild(itemTitle);

            let itemImage = document.createElement('img');
            itemImage.src = item.image;
            orderContainer.appendChild(itemImage);

            let itemDescription = document.createElement('p');
            itemDescription.textContent = item.description;
            orderContainer.appendChild(itemDescription);

            let itemPrice = document.createElement('p');
            itemPrice.textContent = `$${item.price}`
            orderContainer.appendChild(itemPrice);
        });
    } else {
        console.log('Cart is empty');
    }
}