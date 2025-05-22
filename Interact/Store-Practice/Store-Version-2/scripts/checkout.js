import { setupQuantityChangeListener } from './cart.js';

const cart = JSON.parse(localStorage.getItem('cart')) || [];
const allProducts = JSON.parse(localStorage.getItem('allProducts')) || {};
const checkoutContainer = document.querySelector('.checkout-products');

console.log(cart)

cart.forEach(cartItem => {
    const product = allProducts[cartItem.productId];
    if(!product) return;

    const checkoutBox = document.createElement('nav');
    checkoutBox.classList.add('checkout-box');

    const headerDeliveryDate = document.createElement('h2');
    headerDeliveryDate.className = 'header-delivery-date'
    headerDeliveryDate.textContent = `Delivery Date: DATE`
    const title = document.createElement('h3');
    title.textContent = product.title;
    
    const img = document.createElement('img');
    img.src = product.image || "";
    img.classList.add('product-checkout-image');

    const price = document.createElement('p');
    price.textContent = `$${(product.price).toFixed(2)}`;
    price.classList.add('price')

    const quantityButtons = document.createElement('nav');
    quantityButtons.classList.add('quantity-buttons');
    const quantity = document.createElement('p');
    quantity.textContent = `Quantity: ${cartItem.quantity}`;
    quantity.classList.add('quantity');
    const selectQuantity = document.createElement('select');
    for (let i = 1; i <= 10; i++) {
        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === cartItem.quantity) {
            option.selected = true;
          }
        
          selectQuantity.appendChild(option);
    }

    setupQuantityChangeListener(selectQuantity, cartItem, quantity);
    

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'delete';
    quantityButtons.appendChild(quantity);
    quantityButtons.appendChild(selectQuantity);
    quantityButtons.appendChild(deleteButton);

    const deliveryOptions = document.createElement('nav');
    deliveryOptions.classList.add('delivery-options');

    const form = document.createElement('form');

    const shippingOptions = [
      { id: 'freeShip', name: 'delivery-option', value: '1', date: 'Date', text: 'FREE Shipping' },
      { id: '3dayShip', name: 'delivery-option', value: '2', date: 'Date', text: '$4.99 Shipping' },
      { id: '1dayShip', name: 'delivery-option', value: '3', date: 'Date', text: '$9.99 Shipping' }
    ];

    shippingOptions.forEach(option => {

      const label = document.createElement('label');
      label.className = 'option';
      label.setAttribute('for', option.id);


      const input = document.createElement('input');
      input.type = 'radio';
      input.name = option.name;
      input.value = option.value;

      const nav = document.createElement('nav');
      nav.className = 'delivery-date';

      const h5 = document.createElement('h5');
      h5.className = 'dynamicShippingDate';
      h5.textContent = option.date;

      const p = document.createElement('p');
      p.textContent = option.text;

      nav.appendChild(h5);
      nav.appendChild(p);
      label.appendChild(input);
      label.appendChild(nav);

      form.appendChild(label);
    });

    deliveryOptions.appendChild(form);


    checkoutBox.appendChild(headerDeliveryDate);
    checkoutBox.appendChild(title);
    checkoutBox.appendChild(img);
    checkoutBox.appendChild(price);
    checkoutBox.appendChild(quantityButtons);
    checkoutBox.appendChild(deliveryOptions);
    console.log(checkoutBox)
    checkoutContainer.appendChild(checkoutBox)
})

console.log(checkoutContainer)