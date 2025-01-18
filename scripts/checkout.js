import { renderOrderSummary } from './checkout/orderSummary.js';

import { renderPaymentSummary } from './checkout/paymentSummary.js';

import { loadProducts } from '../data/products.js';

import { loadCart } from '../data/cart.js'; //For Promsie.all() loadCart()
//Actually in loadCart we have https://supersimplebackend.dev/cart --> which give response of 'load cart' string.

// import '../data/cart-class.js';

// import '../data/backend-practice.js';


//Array of Promises
Promise.all([
	new Promise((resolve) => {
		loadProducts(() => {
			resolve(); 
		});
	}),
	new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	})

]).then(() => {
	renderOrderSummary();
	renderPaymentSummary();
}); 

/*
new Promise((resolve) => {
	loadProducts(() => {
		resolve('value1'); //After asynchronous code runs completely--> resolve() will make the code to go to next-step.
	});

}).then((value) => {
	console.log(value); //resolve share value in-between resolve('value1') and 'then(value)'; //value == value1

	return new Promise((resolve) => {
		loadCart(() => {
			resolve();
		});
	});

}).then(() => {
	renderOrderSummary();
	renderPaymentSummary();
});

//Here we are seprating promises like first loadProducts() will load and then in new promise loadCart() will load. To make it efficient and run at the same time, we can use Promise.all()
*/



/*
loadProducts(() => {
	loadCart(() => {
		renderOrderSummary();
		renderPaymentSummary();
	});
	//Problem with callbacks:- Multiple callbacks cause a lot of nesting(code inside code inside code....). The problem is each layer of nesting(code) add some indent at the front(or spaces at the front). Means If we have lots of callbacks, our code will become more and more nested.

	//But in case of Promise:- it flatten the code.
	new Promise((resolve) => {
		loadProducts(() => {
			resolve();
		});
	}).then(() => {
		return new Promise((resolve) => {
			loadCart(() => {
				resolve();
			});
		});
	}).then(() => {
		renderOrderSummary();
		renderPaymentSummary();
	});
	and so on... [It flatten the code]
}); //loadProducts(fun); After the products is loaded--> It will gonna use renderOrder and renderPayment
*/


/* 
Promises(is a Class)
	-better way to handle asynchronous code.
	-similar to done() function of jasmine.
	-let us wait for some code to finish, before going to the next step.

	new Promise((resolve) => {
		Resolve function
			-similar to done() function
			-let us control when to go to next step
	})
*/