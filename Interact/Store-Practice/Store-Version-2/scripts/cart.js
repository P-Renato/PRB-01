
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
    console.log(typeof storedCart)
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
  
  export function setupDeleteItem() {
    const deleteBtn = document.querySelectorAll('.delete-button');

    if (deleteBtn.length === 0) {
      console.log('No delete buttons found');
      return;
    }
    
    deleteBtn.forEach((button) =>{
      button.addEventListener('click', ()=>{
        console.log('Delete button clicked', button);
        console.log(button)
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const productId = Number(button.dataset.productId);
  
        console.log('Current cart:', cart);
        console.log('Product ID to delete:', productId);

        cart = removeFromCart(cart, productId);
        const removeFromDOM = document.querySelector(`.checkout-box${productId}`)
        console.log('Remove from DOM is: ', removeFromDOM);
        
        removeFromDOM.remove();
        // console.log('Type of productId:', typeof productId);
        // console.log('Cart item productIds:', cart.map(item => `${item.productId} (${typeof item.productId})`));


        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartQuantity();
        console.log('Updated cart saved to localStorage:', cart);

      })
    })
    console.log('Delete button:', deleteBtn);

  }

  function removeFromCart(cart, productId) {
    return cart.filter(item => item.productId !== productId);
    
  }
