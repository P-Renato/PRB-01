import './date.js';
import {  getDeliveryOption } from './deliveryOptions.js';
import {updateCartQuantity, setupDeleteItem } from './cart.js';
import { renderCheckoutPage} from './checkout.js';


document.addEventListener('DOMContentLoaded', ()=>{
    updateCartQuantity(); 
    setupDeleteItem();
    getDeliveryOption();
    renderOrderSummary();
    renderCheckoutPage();
})

export function renderOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const allProducts = JSON.parse(localStorage.getItem('allProducts')) || {};

    let itemsTotal = 0;
    let shippingTotal = 0;

    cart.forEach(item => {
        const product = allProducts[item.productId];
        if (!product) return;
        const quantity = item.quantity;
        const price = product.price;
        itemsTotal += quantity * price;

        
        const shippingOption = getDeliveryOption(item.deliveryOptionId);
        if (shippingOption) {
            console.log(shippingOption)
            shippingTotal += (shippingOption.priceCents / 100);
        }

    });


    console.log('Cart items at render:', cart);

    const totalBeforeTax = itemsTotal + shippingTotal;
    const vatPercent = 15;
    const vatAmount = totalBeforeTax * (vatPercent / 100);
    const grandTotal = totalBeforeTax + vatAmount;

    let totalItems = 0;
    cart.forEach(item => {
        totalItems += item.quantity;
    });


    const checkoutCart = document.querySelector('#checkout-cart');
    if (checkoutCart) {
        checkoutCart.innerHTML = `
        <div class="order-summary-box">
            <h3>Order Summary</h3>
            <div class="itemsForPrices">
            <p>Items (${totalItems}): $${itemsTotal.toFixed(2)}</p>
            <p>Shipping cost: $${shippingTotal.toFixed(2)}</p>
            <p>Total before tax: $${totalBeforeTax.toFixed(2)}</p>
            <p>VAT (${vatPercent}%): $${vatAmount.toFixed(2)}</p>
            <p><strong>Total: $${grandTotal.toFixed(2)}</strong></p>
            </div>
        </div>
        `;
    }
    

}

