import { setupQuantityChangeListener, setupDeleteItem } from './cart.js';
import './date.js';
import { calculateDeliveryDate, deliveryOptions} from './deliveryOptions.js';
import { setupLoginModal } from './loginModal.js';
import {renderOrderSummary} from './orderSummary.js'

document.addEventListener('DOMContentLoaded', () => {
    setupLoginModal(); 
    
});

console.log('deliveryOptions:', deliveryOptions);
export function renderCheckoutPage(cartItem) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const allProducts = JSON.parse(localStorage.getItem('allProducts')) || {};
  const checkoutContainer = document.querySelector('.checkout-products');
  if (!checkoutContainer) return; 

  // Clear old DOM
  checkoutContainer.innerHTML = '';

  // Optional: Show empty message
  if (cart.length === 0) {
    checkoutContainer.innerHTML = `<p>Your cart is empty.</p>`;
    return;
  }

  cart.forEach(cartItem => {
      const product = allProducts[cartItem.productId];
      if(!product) return;


     
      const dateString = calculateDeliveryDate(cartItem.deliveryOptionId || '1');

      const checkoutBox = document.createElement('nav');
      checkoutBox.classList.add(`checkout-box-id${cartItem.productId}`);
      checkoutBox.dataset.productId = cartItem.productId; 
      checkoutBox.dataset.deliveryOptionId = cartItem.deliveryOptionId;
      checkoutBox.classList.add('checkout-box');


      

      const headerDeliveryDate = document.createElement('h2');
      headerDeliveryDate.className = 'header-delivery-date'
      headerDeliveryDate.textContent = `Delivery Date: ${dateString}`
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
      setupDeleteItem();
      

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-button');
      deleteButton.dataset.productId = cartItem.productId;
      deleteButton.dataset.deliveryOptionId = cartItem.deliveryOptionId; // Add this line!
      deleteButton.textContent = 'Delete';
      quantityButtons.appendChild(quantity);
      quantityButtons.appendChild(selectQuantity);
      quantityButtons.appendChild(deleteButton);

      

       const selectedOptionId = cartItem.deliveryOptionId || '1';

       console.log(selectedOptionId)
      const deliveryOptionsNav = document.createElement('nav');
      deliveryOptionsNav.classList.add('delivery-options');

      const chooseDeliveryHeader = document.createElement('h3');
      chooseDeliveryHeader.className = 'chooseDeliveryText';
      chooseDeliveryHeader.textContent = 'Choose a delivery option:';

      const form = document.createElement('form');
      form.appendChild(chooseDeliveryHeader);

      const shippingOptions = [
        { id: 'freeShip', name: 'delivery-option', value: '1', deliveryDays: 7, text: 'FREE Shipping' },
        { id: '3dayShip', name: 'delivery-option', value: '2', deliveryDays: 3, text: '$4.99 Shipping' },
        { id: '1dayShip', name: 'delivery-option', value: '3', deliveryDays: 1, text: '$9.99 Shipping' }
      ];
      
      const enrichedShippingOptions = shippingOptions.map(option => {
        const match = deliveryOptions.find(delivery => delivery.id === option.value);
        return {
          ...option,
          priceCents: match ? match.priceCents : null
        };
      });
      console.log(enrichedShippingOptions)

      shippingOptions.forEach(option => {
        const optionId = `delivery-option-${option.id}-${cartItem.productId}`;

        console.log(optionId)
        const label = document.createElement('label');
        label.className = 'option';
        label.htmlFor = optionId;


        const inputRadio = document.createElement('input');
        inputRadio.type = 'radio';
        inputRadio.name = `delivery-${cartItem.productId}`;
        inputRadio.value = option.id; // Use the string ID ('freeShip', '3dayShip', etc.)
        inputRadio.id = optionId;
        // inputRadio.id = option.value;
        

        inputRadio.checked = (String(option.id) === String(selectedOptionId));

        // inputRadio.checked = (option.id === selectedOptionId); 

        inputRadio.addEventListener('change', (event) => {



        console.log('Selected:', {
          optionId: option.id,
          value: event.target.value,
          cartItemId: cartItem.productId,
          
        });
        

          console.log('[DEBUG] Selected option ID:', option.id); 
          console.log('Selected delivery option:', option.id);
          console.log('Radio changed!', event.target.value); 
          const newDate = calculateDeliveryDate(option.value);

          headerDeliveryDate.textContent = `Delivery Date: ${newDate}`;
          
          // cartItem.deliveryOptionId = option.id;

          cartItem.deliveryOptionId = event.target.value;
          const cart = JSON.parse(localStorage.getItem('cart')) || [];
          const itemIndex = cart.findIndex(item => 
            String(item.productId) === String(cartItem.productId) 
           && String(item.deliveryOptionId) === String(cartItem.deliveryOptionId)
          );
          if (itemIndex > -1) {
            cart[itemIndex].deliveryOptionId = option.id && cartItem.deliveryOptionId;
            localStorage.setItem('cart', JSON.stringify(cart));
            renderCheckoutPage(); 
            renderOrderSummary();
          }
          
        })


        const nav = document.createElement('nav');
        nav.className = 'delivery-date';

        const h5 = document.createElement('h5');
        h5.className = 'dynamicShippingDate';
        h5.textContent = calculateDeliveryDate(option.value);

        const p = document.createElement('p');
        p.textContent = option.text;


        
        nav.appendChild(h5);
        nav.appendChild(p);
        label.appendChild(inputRadio);
        label.appendChild(nav);

        
        form.appendChild(label);
      });

      deliveryOptionsNav.appendChild(form);
      checkoutBox.appendChild(headerDeliveryDate);
      checkoutBox.appendChild(title);
      checkoutBox.appendChild(img);
      checkoutBox.appendChild(price);
      checkoutBox.appendChild(quantityButtons);
      checkoutBox.appendChild(deliveryOptionsNav);
      checkoutContainer.appendChild(checkoutBox)   

  });
  setupDeleteItem();
  
}

