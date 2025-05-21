import {render} from './store.js';
import { fetchProducts } from './fetchProducts.js';
import './date.js'; 
import './cart.js';
import './checkout.js';



await render(); 
fetchProducts();

const observeProductImages = () => {
    const images = document.querySelectorAll('.product-image');
  
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
  

  observeProductImages();



const image = document.querySelector('.slideImg');
console.log(image)

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      image.classList.add('slide-animation');
    } else {
      image.classList.remove('slide-animation'); // reset so it can animate again
    }
  });
}, {
  threshold: 0, // 50% of the image should be visible to trigger
  rootMargin: "0px 0px -50% 0px"
});

console.log(image)
observer.observe(image);