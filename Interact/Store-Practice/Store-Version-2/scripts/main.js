import { render } from './store.js';
import './date.js'; 
import { updateCartQuantity } from './cart.js';
import { fetchProducts } from "./fetchProducts.js";

document.addEventListener('DOMContentLoaded', async () => {
  const container = document.querySelector('.products-container');

  if (!container) {
    console.warn('No container found on main page!');
    return;
  }
  await fetchProducts();
  await render(container);

  observeProductImages();

  const slideImage = document.querySelector('.slideImg');
  if (slideImage) {
    observeSlideImage(slideImage);
  } else {
    console.warn('No element found with class .slideImg to observe.');
  }
  updateCartQuantity();
});




function observeProductImages () {
    const images = document.querySelectorAll('.product-image');
  
    if (images.length === 0)  {
      console.warn('No images found with class .product-image to observe.');
      return;
    }

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        } else {
          entry.target.classList.remove('fade-in');
        }
      });
    }, {
      threshold: 0.1
    });
  
    images.forEach(img => observer.observe(img));
  };
  

  
function observeSlideImage(image) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        image.classList.add('slide-animation');
      } else {
        image.classList.remove('slide-animation');
      }
    });
  }, {
    threshold: 0,
    rootMargin: "0px 0px -50% 0px"
  });

  observer.observe(image);
}

