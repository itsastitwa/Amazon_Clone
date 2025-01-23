import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOption.js";
import {formatCurrency} from '../utils/money.js';
import { addOrder } from "../../data/orders.js";

export function renderPaymentSummary() {
	let productPriceCents = 0;
	let shippingPriceCents = 0;

	cart.forEach((cartItem) => {
		const product = getProduct(cartItem.productId);
		productPriceCents += product.priceCents * cartItem.quantity;

		const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
		shippingPriceCents += deliveryOption.priceCents;
	});

	const totalBeforeTaxCents = productPriceCents + shippingPriceCents;
	const taxCents = totalBeforeTaxCents * 0.1; 	
	const totalCents = totalBeforeTaxCents + taxCents;	


	const paymentSummaryHTML = `
		<div class="payment-summary-title">
			Order Summary
		</div>

		<div class="payment-summary-row">
			<div>Items (3):</div>
			<div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
		</div>

		<div class="payment-summary-row">
			<div>Shipping &amp; handling:</div>
			<div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
		</div>

		<div class="payment-summary-row subtotal-row">
			<div>Total before tax:</div>
			<div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
		</div>

		<div class="payment-summary-row">
			<div>Estimated tax (10%):</div>
			<div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
		</div>

		<div class="payment-summary-row total-row">
			<div>Order total:</div>
			<div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
		</div>

		<button class="place-order-button button-primary
			js-place-order">
			Place your order
		</button>
	`;

	document.querySelector('.js-payment-summary')
		.innerHTML = paymentSummaryHTML;



	//We are gonna make "Place your Order" button interactive, so when we click the button it's gonna take our cart and turn it into a order.
	document.querySelector('.js-place-order')
		.addEventListener('click', async() => {
			try {
				const response = await fetch('https://supersimplebackend.dev/orders', {
					//However this time we need to send data to the backend[SEND CART TO THE BACKEND] in order to create an order.
					//To send data --> use different type of request[POST].
					//So, we're going to give fetch a second parameter which is an object, and inside this object we're going to give a property called method(and this is a type of REQUEST)
					method: 'POST',
	
					headers: {
						'Content-Type': 'application/json' //This tells the backend what type of data we're sending in our request. Here we sending json(which is basically a JavaScript Object)
					}, //header gives the backend more info about our request. And this is needed bcz, we're sending data to the backend.
	
					body: JSON.stringify({
						cart: cart //cart_array = cart, convert it into JSON string
					}) //actual data which we're going to send to the backend. According to the documentation we need to send an object with a property called 'cart' and this contains our cart array.
	
				});
	
				//To get the response--> we need to use response.json
				const order = await response.json(); //And response.json is also a promise--> so we can use await to wait for this promise to finish before going to next line.
				//This gives us the data that's attached to the response which should be the 'order' that was created by the backend.
	
				//Now after we create an order from the backend, we're going to add it to the array and save it in localStorage using function addOrder();
				addOrder(order);

			} catch (error) {
				console.log('Unexpected Error, Try again later.');
				
			}
			//After we create an order, we should go to the orders page.
			//window.location ==> is a special object provided by JS and it let's us contol the URL at the top of the browser. 'href' gives us the URL, and if change the href property it will change the URL at the top of the browser.
			window.location.href = 'orders.html';
			
		});
}


/*
	GET    - get something from the backend
	POST   - create something
	PUT    - update something
	DELETE - delete something
*/