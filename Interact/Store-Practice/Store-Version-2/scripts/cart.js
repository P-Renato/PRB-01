
export function updateCartQuantity() {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartQuantity = 0;
    storedCart.forEach(cartItem => {
      cartQuantity += cartItem.quantity;
      console.log(cartQuantity)
    });
  
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
      cartCount.textContent = cartQuantity;
    }
    console.log(storedCart)
  }
  
document.addEventListener('DOMContentLoaded', ()=>{
  updateCartQuantity(); 
    const addToCartBtn = document.querySelectorAll('.js-add-to-cart');

    if (addToCartBtn.length === 0) {
      return;
    }

    addToCartBtn.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            console.log(productId)

            if (!productId) {
              console.warn('Add to Cart button missing data-product-id!');
              return;
            }

            addToCart(productId);
            updateCartQuantity();
            const checkmark = document.querySelector('.addedCheckmark'); 

            checkmark.classList.remove('removeCheckmark')
            setTimeout(()=>{
            checkmark.classList.add('removeCheckmark')
            }, 3000);

            console.log(cart)
        });
    });
})

export  function addToCart(productId) {
    if (!productId) {
        console.warn('Invalid productId passed to addToCart:', productId);
        return; 
      }
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let matchingItem = cart.find(item => item.productId === productId);

    let selectedDeliveryOptionId = null;

    const deliveryInput = document.querySelector('input[name="delivery-option"]:checked');
    if (deliveryInput) {
      selectedDeliveryOptionId = deliveryInput.value;
    }
    
  
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
  