import { renderOrderSummary } from './checkout/orderSummary.js';

import { renderPaymentSummary } from './checkout/paymentSummary.js';

import { loadProducts } from '../data/products.js';

loadProducts(() => {
	renderOrderSummary();
	renderPaymentSummary();
}); //loadProducts(fun); After the products is loaded--> It will gonna use renderOrder and renderPayment

// import '../data/cart-class.js';

// import '../data/backend-practice.js';

