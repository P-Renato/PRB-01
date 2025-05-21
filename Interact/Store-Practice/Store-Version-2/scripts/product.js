import { fetchProducts } from "./fetchProducts.js";
import {render} from './store.js';
import './date.js';
import {updateCartQuantity, addToCart } from './cart.js';

const params = new URLSearchParams(window.location.search);
const productId = params.get('id');
console.log(productId)

const allProducts = JSON.parse(localStorage.getItem('allProducts'));
console.log(allProducts);

let product;

if (!allProducts || !allProducts[productId]) {
    console.error("Product not found.");
  } else {
    product = allProducts[productId];
    console.log(product)
}
console.log(product)

const container = document.getElementById('product-details');
container.innerHTML = `
<div class="product-details">
<h1>${allProducts[productId].title}</h1>
<img src="${product.image}" alt="${product.title}" />
<p class="descriptionText">${product.description}</p>
<div class="priceText addedToBasket"> 
<div class="priceGreenTag">
<p class="price"><strong>Price:</strong> $${product.price.toFixed(2)}</p></div>
<div class="addedCheckmark removeCheckmark">
<img class="checkmark" src="Icons/checkmark.png" alt="checkmark">
<p class="addedText"> Added to basket </p>
</div>
</div>
<button class="js-add-to-cart" data-product-id="${productId}">Add to basket</button>
</div>
`;

console.log(container)

await render(); 
fetchProducts();
updateCartQuantity();
addToCart();