import { iceCreams } from './products.js';

document.body.innerHTML += `
    <main id="main-container"></main>
    <div class="cart">
        <h2>Carrito de Compras</h2>
        <ul id="cart-list"></ul>
    </div>
`;

const container = document.getElementById('main-container');

window.addEventListener('DOMContentLoaded', renderIceCreams);

function renderIceCreams() {
    iceCreams.forEach(iceCream => createCardIceCream(iceCream));
}

function createCardIceCream(iceCream) {
    const divCard = document.createElement('div');
    divCard.classList.add('ice-cream');
    divCard.id = iceCream.id;

    const imgCard = document.createElement('img');
    imgCard.alt = iceCream.product;
    imgCard.src = iceCream.image;

    const titleCard = document.createElement('h2');
    titleCard.textContent = iceCream.product;

    const priceCard = document.createElement('p');
    priceCard.textContent = `$${iceCream.price.toFixed(2)}`;

    const btnCard = document.createElement('button');
    btnCard.textContent = 'Agregar al carrito';
    btnCard.onclick = () => addToCart(iceCream.id);

    divCard.appendChild(imgCard);
    divCard.appendChild(titleCard);
    divCard.appendChild(priceCard);
    divCard.appendChild(btnCard);

    container.appendChild(divCard);
}

let cart = [];

window.addToCart = function(productId) {
    const product = iceCreams.find(p => p.id === productId);
    cart.push(product);
    updateCart();
};

function updateCart() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    cart.forEach(product => {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${product.product} - $${product.price.toFixed(2)}`;
        cartList.appendChild(cartItem);
    });
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Cargar el carrito desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    const savedCart = JSON.parse(localStorage.getItem('cart'));
    if (savedCart) {
        cart = savedCart;
        updateCart();
    }
});
