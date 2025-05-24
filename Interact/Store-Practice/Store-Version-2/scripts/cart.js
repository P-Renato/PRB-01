import { renderCheckoutPage } from './checkout.js';
import { setupAddToCartButtons } from './checkmark.js';

document.addEventListener('DOMContentLoaded', ()=>{
  updateCartQuantity(); 
  setupAddToCartButtons();
  renderCheckoutPage();
})

export function updateCartQuantity() {
  const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
  let cartQuantity = 0;
  storedCart.forEach(cartItem => {
    cartQuantity += cartItem.quantity;
    console.log('Cart quantity is', cartQuantity)
  });

  const cartCount = document.querySelector('.cart-count');
  if (cartCount) {
    cartCount.textContent = cartQuantity;
  }
  console.log(storedCart)
  console.log(typeof storedCart)


}

export  function addToCart(productId) {
    if (!productId) {
        console.warn('Invalid productId passed to addToCart:', productId);
        return; 
      }
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
 

    
    console.log('[DEBUG] addToCart called with:', productId); 

    
    let selectedDeliveryOptionId = null;

    const deliveryInput = document.querySelector('input[name="delivery-option"]:checked');
    if (deliveryInput) {
      selectedDeliveryOptionId = deliveryInput.value;
    }
    
    const matchingItem = cart.find(item =>
      item.productId === productId &&
      item.deliveryOptionId === (selectedDeliveryOptionId || 1)
    );
  

    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({ productId, quantity: 1, deliveryOptionId: selectedDeliveryOptionId || 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartQuantity(); 
  }
  

  /* “Hey! When the user changes the quantity on this dropdown (selectQuantity), 
  I want you to update this cart item (cartItem) in the cart.”*/
  export function setupQuantityChangeListener(selectElement, cartItem, quantityTextElement) {
    selectElement.addEventListener('change', () => {
      const newQuantity = Number(selectElement.value);
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
  
      const itemToUpdate = cart.find(item =>
        item.productId === cartItem.productId &&
        item.deliveryOptionId === cartItem.deliveryOptionId
      );

      if (itemToUpdate) {
        itemToUpdate.quantity = newQuantity;
      
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartQuantity();
      quantityTextElement.textContent = `Quantity: ${newQuantity}`;
      }
    });
  }
  
  export function setupDeleteItem() {
    const deleteBtn = document.querySelectorAll('.delete-button');

    if (deleteBtn.length === 0) {
      console.log('No delete buttons found');
      return;
    }
    
    deleteBtn.forEach((button) =>{
      button.addEventListener('click', ()=>{
        console.log('Delete button clicked', button);
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productId = button.dataset.productId;
        const productIdNumber = Number(button.dataset.productId);
        const deliveryOptionId = Number(button.dataset.deliveryOptionId);
  
        console.log('Current cart after deleting:', cart);

        cart = removeFromCart(cart, productIdNumber, deliveryOptionId);
        
        
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log('Updated cart from localStorage:', JSON.parse(localStorage.getItem('cart')));
        console.log('Updated cart saved to localStorage:', cart);

        const removeFromDOM = document.querySelector(`.checkout-box-id${productIdNumber}`)
        console.log('Remove from DOM is: ', removeFromDOM);

        if (removeFromDOM) {
          removeFromDOM.remove();
        } else {
          console.warn('No DOM element found to remove for product ID:', productId);
        }
        
        updateCartQuantity();
        setupDeleteItem(); 
      })
    })
  }


  function removeFromCart(cart, productId, deliveryOptionId) {
  if (!Array.isArray(cart)) return [];

 return cart.filter(item => {
    return !(
      Number(item.productId) === productId &&
      Number(item.deliveryOptionId) === deliveryOptionId
    );
  });
}
