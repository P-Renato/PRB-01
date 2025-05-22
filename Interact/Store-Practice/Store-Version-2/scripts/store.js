import { fetchProducts } from './fetchProducts.js';
import {updateCartQuantity, addToCart } from './cart.js';


export async function render(container) {
  if (!container) {
    console.warn('No container found!');
    return;
  }
  const products = await fetchProducts();
    console.log(products)
    console.log(typeof products)


    const categories = {};
    Object.values(products).forEach(product => {
    if (!categories[product.category]) {
        categories[product.category] = [];
    }
    categories[product.category].push(product);
    });

    console.log(categories)
    console.log(typeof categories)


    for (const categoryName in categories) {
        const categoryBox = document.createElement('div');
        categoryBox.classList.add('category-box');

        const categoryHeading = document.createElement('h2');
        categoryHeading.textContent = categoryName;
        categoryBox.appendChild(categoryHeading);

        const categoryContent = document.createElement('div');
        categoryContent.classList.add('boxed-product-content');
        categoryBox.appendChild(categoryContent);

        categories[categoryName].forEach(product => {
            const productBox = document.createElement('div');
            productBox.classList.add('product-box');

            const img = document.createElement('img');
            img.src = product.image || "";
            img.classList.add('product-image');
            img.style.width = '5em';
            img.style.margin = '0.5em';
            productBox.appendChild(img);

            const title = document.createElement('h3');
            title.textContent = product.title;
            productBox.appendChild(title);

            const description = document.createElement('p');
            description.textContent = product.description || "";
            productBox.appendChild(description);
            
            const ratingCount = document.createElement('span');
            ratingCount.textContent = product.rating.count || "";

            const roundedToFive = Math.round(product.rating.rate * 10 / 5) * 5;  // This is to make it multiple to 5
            const ratingStars = document.createElement('img');
            ratingStars.src = `./ratings/rating-${roundedToFive}.png`;
            ratingStars.style.height = '1em';    
            ratingStars.style.width = '4em';      
            
            const ratingBox = document.createElement('aside');
            ratingBox.classList.add('rating-box');
            productBox.appendChild(ratingBox);
            ratingBox.appendChild(ratingStars);
            ratingBox.appendChild(ratingCount);


            const price = document.createElement('p');
            price.textContent = `$${(product.price).toFixed(2)}`;
            productBox.appendChild(price);

            const btn = document.createElement('button');
            btn.classList.add('add-to-basket-btn');
            btn.textContent = 'Add to basket';
            productBox.appendChild(btn);
            
            btn.addEventListener('click', ()=>{
              addToCart(product.id);
              updateCartQuantity();
            })

            img.addEventListener('click', () => {
                const productNewWindow = window.location.href = `product.html?id=${product.id}`;
                
              });

            categoryContent.appendChild(productBox);
        });

        container.appendChild(categoryBox);
    }

}


