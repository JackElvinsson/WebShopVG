document.addEventListener('DOMContentLoaded', function () {
    const cart = JSON.parse(localStorage.getItem('cart') || '{}');
    const tbody = document.querySelector('tbody');
    const confirmOrderButton = document.querySelector('button[type="submit"]');
    const emptyCartButton = document.createElement('button');
    emptyCartButton.textContent = 'Empty Cart';
    emptyCartButton.style.borderRadius = '5px';
    emptyCartButton.style.borderWidth = '1px';
    emptyCartButton.style.backgroundColor = '#F08080';
    emptyCartButton.addEventListener('click', function () {
        localStorage.removeItem('cart');
        location.reload();
    });
    const tableHeader = document.querySelector('thead');
    const emptyCartMessage = document.createElement('p'); // move declaration outside if statement


    function showTotalPrice() {
        let totalPrice = 0;
        for (const id in cart) {
            const item = cart[id];
            totalPrice += item.price * item.quantity;
        }
        const totalPriceElement = document.querySelector('#total');
        totalPriceElement.textContent = `$${totalPrice.toFixed(2)}`;
    }

    if (Object.keys(cart).length === 0) {
        emptyCartMessage.textContent = 'Your cart is empty.';
        tbody.appendChild(emptyCartMessage);
        emptyCartButton.style.display = 'none';
        confirmOrderButton.style.display = 'none';
        tableHeader.style.display = 'none';

    } else {
        document.querySelector('thead tr').style.display = 'table-row';
        Object.values(cart).forEach(item => {
            const tr = document.createElement('tr');

            const td1 = document.createElement('td');
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.title;
            img.style.maxHeight = '80px';
            img.style.borderRadius = '10px';
            img.style.marginRight = '10px';
            img.style.marginLeft = '60px';
            img.style.boxShadow = '0px 2px 6px rgba(73, 73, 73, 0.5)';
            td1.appendChild(img);
            tr.appendChild(td1);

            const td2 = document.createElement('td');
            td2.textContent = item.title;
            tr.appendChild(td2);

            const td3 = document.createElement('td');
            td3.textContent = `$${item.price}`;
            tr.appendChild(td3);

            const td4 = document.createElement('td');
            const qtyInput = document.createElement('input');
            qtyInput.style.borderRadius = '5px';
            qtyInput.style.borderStyle = 'none'
            qtyInput.style.maxWidth = '2rem';
            qtyInput.type = 'number';
            qtyInput.min = 1;
            qtyInput.value = item.quantity;
            qtyInput.addEventListener('change', function () {
                const qty = parseInt(this.value);
                const sum = (qty * item.price).toFixed(2);
                sumPerProduct.textContent = `$${sum}`;
                item.quantity = qty;
                localStorage.setItem('cart', JSON.stringify(cart));
                showTotalPrice();

            });
            td4.appendChild(qtyInput);

            const sumPerProduct = document.createElement('span');
            sumPerProduct.textContent = `$${(item.quantity * item.price).toFixed(2)}`;
            td4.appendChild(sumPerProduct);

            tr.appendChild(td4);

            const td5 = document.createElement('td');
            const removeButton = document.createElement('button');
            removeButton.textContent = 'Remove';
            removeButton.style.borderRadius = '5px';
            removeButton.style.borderWidth = '1px';
            removeButton.style.backgroundColor = '#F08080';
            removeButton.addEventListener('click', function () {
                delete cart[item.id];
                localStorage.setItem('cart', JSON.stringify(cart));
                tr.remove();
                if (Object.keys(cart).length === 0) {
                    emptyCartMessage.style.display = 'block';
                    document.querySelector('thead tr').style.display = 'none';
                    confirmOrderButton.style.display = 'none';
                    emptyCartButton.style.display = 'none'; // hide the empty cart button as well
                    showTotalPrice();
                }
                showSumPerProduct();
                showTotalPrice();
            });
            td5.appendChild(removeButton);
            tr.appendChild(td5);
            tbody.appendChild(tr);
            tbody.appendChild(emptyCartButton);

            const savedTotalPrice = localStorage.getItem('totalPrice');
            if (savedTotalPrice) {
                document.querySelector('#total').textContent = `$${savedTotalPrice}`;
            } else {
                showTotalPrice();
            }
        });
    }

    // check if the cart is empty and show the message
    if (Object.keys(cart).length === 0) {
        emptyCartMessage.textContent = 'Your cart is empty.';
        tbody.appendChild(emptyCartMessage);
        confirmOrderButton.style.display = 'none';
        tableHeader.style.display = 'none';
    }
});


