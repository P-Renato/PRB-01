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

    const addToCartBtn = document.querySelectorAll('.js-add-to-cart');
    addToCartBtn.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            console.log(productId)

            addToCart(productId);
            updateCartQuantity();
            const checkmark = document.querySelector('.addedCheckmark');
            console.log(checkmark); 

            checkmark.classList.remove('removeCheckmark')
            setTimeout(()=>{
            checkmark.classList.add('removeCheckmark')
            }, 3000);

            console.log(cart)
        });
    });
    updateCartQuantity();
})

export  function addToCart(productId) {
    if (!productId) {
        console.warn('Invalid productId passed to addToCart:', productId);
        return; // Stop early
      }
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let matchingItem = cart.find(item => item.productId === productId);
  
    if (matchingItem) {
      matchingItem.quantity += 1;
    } else {
      cart.push({ productId, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartQuantity(); 
  }
  