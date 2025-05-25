import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';

export const deliveryOptions = [
    { id: '1', deliveryDays: 7, priceCents: 0 },
    { id: '2', deliveryDays: 3, priceCents: 499 },
    { id: '3', deliveryDays: 1, priceCents: 999 }
];


export function getDeliveryOption(deliveryOptionId) {
    return (deliveryOptions.find(option => option.id === deliveryOptionId) || deliveryOptions[0]);
  }
  
export function calculateDeliveryDate(deliveryOptionId) {
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    console.log(deliveryOption)
    return dayjs().add(deliveryOption.deliveryDays, 'day').format('dddd, MMMM D');

}

const today = dayjs();
calculateDeliveryDate()


const deliveryDate = today.add(deliveryOptions[0].deliveryDays,'days');
const dateString = deliveryDate.format('dddd, MMMM D');
const headerDeliveryDate = document.querySelector('.header-delivery-date');
// headerDeliveryDate.textContent = `Delivery Date: ${dateString}`;

console.group(deliveryDate)
console.log(dateString)
console.log(headerDeliveryDate)

// JavaScript to update when selection changes
document.querySelectorAll('input[name="delivery-option"]').forEach(radio => {
    radio.addEventListener('change', (event) => {
        const selectedOptionId = event.target.value;
        updateDeliveryDate(selectedOptionId);
    });
});
























    
    // const today = dayjs();
    // const deliveryDate = today.add(deliveryOption.deliveryDays, 'days', 'days');
    // return deliveryDate.format('dddd, MMMM D');






//   export function getDeliveryOption (deliveryOptionId) {
//     let deliveryOption;

//     deliveryOption.forEach((option) => {
//         if (option.id === deliveryOptionId){
//             deliveryOption = option;
//         }
//     });
//     return deliveryOption || deliveryOption[0];
// }