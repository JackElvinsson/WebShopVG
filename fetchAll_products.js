function fetchAllProducts() {
    const gridContainer = document.querySelector('.grid-container');
    const url = 'https://fakestoreapi.com/products/';

    // Clear the grid container to prevent duplicate products
    gridContainer.innerHTML = '';

    fetch(url)
        .then(res => res.json())
        .then(products => {
            console.log(products); 
            products.forEach(product => {
                const productDiv = document.createElement('div');
                productDiv.classList.add('product');

                const productImage = document.createElement('img');
                productImage.src = product.image;
                productDiv.appendChild(productImage);

                const productName = document.createElement('h2');
                productName.textContent = product.title;
                productDiv.appendChild(productName);

                const productPrice = document.createElement('p');
                productPrice.textContent = `$${product.price}`;
                productDiv.appendChild(productPrice);

                const addToCartButton = document.createElement('button');
                addToCartButton.textContent = 'Add to cart';
                addToCartButton.classList.add('buy-button');
                addToCartButton.addEventListener('click', () => {
                    // Get the current cart or create a new empty cart if it doesn't exist
                    let cart = JSON.parse(localStorage.getItem('cart')) || {};

                    // Check if the product is already in the cart
                    if (cart[product.id]) {
                        // If the product is already in the cart, increment the quantity
                        cart[product.id].quantity += 1;
                    } else {
                        // If the product is not in the cart, add it with a quantity of 1
                        cart[product.id] = {
                            id: product.id,
                            title: product.title,
                            price: product.price,
                            quantity: 1,
                            image: product.image
                        };
                    }

                    // Save the updated cart to local storage
                    localStorage.setItem('cart', JSON.stringify(cart));
                    alert(`${product.title} has been added to your cart!`);
                });
                productDiv.appendChild(addToCartButton);

                gridContainer.appendChild(productDiv);
            });
        })
        .catch(error => {
            console.error(`Error fetching products: ${error}`);
        });
}