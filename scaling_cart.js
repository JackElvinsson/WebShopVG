document.addEventListener('DOMContentLoaded', function () {
    console.log(document.getElementById('electronics'));

    if (window.innerWidth < 550) {
        document.getElementById('cart').textContent = 'Cart';

    } else {
        document.getElementById('cart').textContent = 'Shopping Cart';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    console.log(document.getElementById('electronics'));
    window.addEventListener('resize', function () {

        if (window.innerWidth < 550) {
            document.getElementById('cart').textContent = 'Cart';

        } else {
            document.getElementById('cart').textContent = 'Shopping Cart';
        }
    });
});